import prisma from "../../utils/prisma.js";

import { createNotification }
from "../../utils/notificationService.js";

export async function dispenseMedication({

    prescriptionId,

    hospitalId,

    dispensedById

}){

    const { updatedPrescription, updatedInventory } =
        await prisma.$transaction(async (tx) => {

            const prescription =
                await tx.prescription.findFirst({

                    where:{

                        id: prescriptionId,

                        medicalRecord: {

                            patient: {
                                hospitalId
                            }

                        }

                    },

                    include:{
                        inventoryItem:true,
                        visit:true,
                        medicalRecord: {
                            include: {
                                patient: true
                            }
                        }
                    }

                });

            if(!prescription)
                throw new Error("Prescription not found.");

            if (prescription.status === "DISPENSED") {
                throw new Error("Medication already dispensed.");
            }

            const item = prescription.inventoryItem;

            if(!item)
                throw new Error("Inventory item missing.");

            const claimed =
                await tx.inventoryItem.updateMany({

                    where:{
                        id: item.id,
                        quantity: { gte: prescription.quantity }
                    },

                    data:{
                        quantity: { decrement: prescription.quantity }
                    }

                });

            if (claimed.count === 0) {
                throw new Error("Insufficient stock.");
            }

            await tx.stockMovement.create({

                data:{

                    inventoryItemId:item.id,

                    type:"OUT",

                    quantity:prescription.quantity,

                    notes:`Dispensed for prescription ${prescription.id}`,

                    createdById:dispensedById

                }

            });

            const inventoryAfter =
                await tx.inventoryItem.findUnique({

                    where:{
                        id:item.id
                    }

                });

            const dispensedPrescription =
                await tx.prescription.update({

                    where:{

                        id:prescription.id

                    },

                    data:{

                        status:"DISPENSED",

                        dispensedAt:new Date(),

                        dispensedById

                    },

                    include:{

                        inventoryItem:true,

                        medicalRecord:{

                            include:{

                                patient:true

                            }

                        }

                    }

                });

            return {
                updatedPrescription: dispensedPrescription,
                updatedInventory: inventoryAfter
            };

        });

    if (updatedInventory.quantity <= updatedInventory.lowStockThreshold) {

        try {

            await createNotification({

                hospitalId,

                type:"LOW_STOCK",

                title:"Low Stock",

                message:
                `${updatedInventory.name} stock is running low.`

            });

        } catch (err) {

            console.log("Failed to send low stock notification:", err);

        }

    }

    return updatedPrescription;

}