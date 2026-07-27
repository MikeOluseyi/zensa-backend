import express from "express";
import prisma from "../utils/prisma.js";

import { protect } from "../middleware/authMiddleware.js";
import { authorize } from "../middleware/roleMiddleware.js";
import { createNotification } from "../utils/notificationService.js";
import { postCharge } from "../utils/billing/index.js";

import {
  authorizePermission
} from "../middleware/permissionMiddleware.js";

const router = express.Router();


// CREATE INVENTORY ITEM
router.post(
  "/",
  protect,
  authorizePermission("MANAGE_INVENTORY"),
  async (req, res) => {
    try {

      const {
        name,
        type,
        category,
        sku,
        quantity,

        saleUnit,
        baseUnit,
        supplier,
        unitsPerSaleUnit,

        reorderLevel,
        costPrice,
        sellingPrice,
        lowStockThreshold,
        expiryDate
        } = req.body;

     const item = await prisma.inventoryItem.create({
  data: {
    hospitalId: req.user.hospitalId,

    name,
    type,
    category: category || null,
    sku: sku || null,

    quantity: Number(quantity) || 0,

    saleUnit,
    baseUnit,
    supplier: supplier || null,

    unitsPerSaleUnit: Number(unitsPerSaleUnit) || 1,

    reorderLevel: Number(reorderLevel) || 0,

    costPrice:
      costPrice !== undefined && costPrice !== ""
        ? Number(costPrice)
        : null,

    sellingPrice:
      sellingPrice !== undefined && sellingPrice !== ""
        ? Number(sellingPrice)
        : null,

    lowStockThreshold: Number(lowStockThreshold) || 10,

    expiryDate:
      expiryDate
        ? new Date(expiryDate)
        : null,
  },
});

      res.json(item);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to create inventory item"
      });
    }
  }
);


// GET INVENTORY
router.get(
  "/",
  protect,
  async (req, res) => {
    try {
      const items =
        await prisma.inventoryItem.findMany({
          where: {
    hospitalId: req.user.hospitalId,
    isActive: true
},

          orderBy: {
            name: "asc"
          }
        });

      res.json(items);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch inventory"
      });

    }
  }
);


// ADD STOCK
router.patch(
  "/:id/add-stock",
  protect,
  authorizePermission("MANAGE_INVENTORY"),
  async (req, res) => {
    try {

      const {
        quantity,
        notes,
        costPrice,
        sellingPrice
      } = req.body;

      const item =
        await prisma.inventoryItem.update({

          where: {
            id: req.params.id
          },

          data: {

            quantity: {
              increment: Number(quantity)
            },

            ...(costPrice !== undefined && {
              costPrice: Number(costPrice)
            }),

            ...(sellingPrice !== undefined && {
              sellingPrice: Number(sellingPrice)
            })

          }

        });

      await prisma.stockMovement.create({

        data: {

          inventoryItemId: item.id,

          type: "IN",

          quantity: Number(quantity),

          notes,

          createdById: req.user.id

        }

      });

      const newQuantity = item.quantity;

if (newQuantity <= item.lowStockThreshold) {

  await createNotification({

    hospitalId: req.user.hospitalId,

    type: "LOW_STOCK",

    title: "Low Stock Alert",

    message: `${item.name} stock is low`

  });

}

      res.json(item);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to add stock"
      });

    }

  }
);


// LOW STOCK
router.get(
  "/low-stock",
  protect,
  async (req, res) => {

    try {

      const items =
        await prisma.inventoryItem.findMany({

          where: {
            hospitalId: req.user.hospitalId
          }
        });

      const lowStock =
        items.filter(
          item => item.quantity <= item.reorderLevel
        );

      res.json(lowStock);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Failed to fetch low stock items"
      });

    }
  }
);

router.get(
  "/search",
  protect,
  async (req, res) => {

    try {

      const q = req.query.q || "";

      const items =
        await prisma.inventoryItem.findMany({

          where: {

            hospitalId:
              req.user.hospitalId,

            quantity: {
              gt: 0
            },

            OR: [

              {
                name: {
                  contains: q,
                  mode: "insensitive"
                }
              },

              {
                sku: {
                  contains: q,
                  mode: "insensitive"
                }
              }
            ]
          },

          take: 20,

          orderBy: {
            name: "asc"
          }
        });

      res.json(items);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: "Search failed"
      });

    }
  }
);

router.patch(
"/:id/archive",
protect,
authorizePermission("MANAGE_INVENTORY"),
async(req,res)=>{

try{

const item=
await prisma.inventoryItem.update({

where:{
id:req.params.id
},
data:{
isActive:false
}
});
res.json(item);
}catch(err){
console.log(err);
res.status(500).json({
error:"Failed to archive inventory item"
});
}
});

router.post(
  "/bulk-import",
  protect,
  authorizePermission("MANAGE_INVENTORY"),
  async (req, res) => {

    try {

      const {

        items,

        replaceDuplicates = false

      } = req.body;

      if (!Array.isArray(items) || items.length === 0) {

        return res.status(400).json({
          error: "No inventory items supplied."
        });

      }

      const created = [];

      const updated = [];

      const failed = [];

      for (const row of items) {

        try {

          // ----------------------------
          // REQUIRED FIELDS
          // ----------------------------

          if (
            !row.name ||
            !row.saleUnit ||
            !row.baseUnit
          ) {

            failed.push({

              row,

              reason:
                "Missing required fields"

            });

            continue;

          }

          const quantity =
            Number(row.quantity) || 0;

          const reorderLevel =
            Number(row.reorderLevel) || 0;

          const unitsPerSaleUnit =
            Number(row.unitsPerSaleUnit) || 1;

          const costPrice =
            row.costPrice !== undefined &&
            row.costPrice !== null &&
            row.costPrice !== ""
              ? Number(row.costPrice)
              : null;

          const sellingPrice =
            row.sellingPrice !== undefined &&
            row.sellingPrice !== null &&
            row.sellingPrice !== ""
              ? Number(row.sellingPrice)
              : null;

              const validTypes = [
  "MEDICATION",
  "SUPPLY",
  "CONSUMABLE",
  "EQUIPMENT"
];

const type = validTypes.includes(row.type?.toUpperCase())
  ? row.type.toUpperCase()
  : "MEDICATION";

          // ----------------------------
          // CHECK DUPLICATE
          // ----------------------------

          let existing = null;

          if (row.sku) {

            existing =
              await prisma.inventoryItem.findUnique({

                where: {

                  sku: row.sku

                }

              });

          }

          if (existing) {

            if (!replaceDuplicates) {

              failed.push({

                row,

                reason:
                  "SKU already exists"

              });

              continue;

            }

            const item =
              await prisma.inventoryItem.update({

                where: {

                  id: existing.id

                },

                data: {

                  name: row.name,

                  type,

                  category:
                    row.category || null,

                  quantity,

                  saleUnit:
                    row.saleUnit,

                  baseUnit:
                    row.baseUnit,

                  unitsPerSaleUnit,

                  reorderLevel,

                  costPrice,

                  sellingPrice,

                  supplier:
                    row.supplier || null,

                    lowStockThreshold:
  Number(row.lowStockThreshold) || 10,

                  expiryDate:
                    row.expiryDate
                      ? new Date(
                          row.expiryDate
                        )
                      : null

                }

              });

            updated.push(item);

            if (quantity > 0) {

  await prisma.stockMovement.create({

    data: {

      inventoryItemId: item.id,

      type: "IN",

      quantity,

      notes: "Bulk import stock adjustment",

      createdById: req.user.id

    }

  });

}

            continue;

          }

          // ----------------------------
          // CREATE
          // ----------------------------

          const item =
            await prisma.inventoryItem.create({

              data: {

                hospitalId:
                  req.user.hospitalId,

                name: row.name,

                type,

                category:
                  row.category || null,

                sku:
                  row.sku || null,

                quantity,

                saleUnit:
                  row.saleUnit,

                baseUnit:
                  row.baseUnit,

                unitsPerSaleUnit,

                reorderLevel,

                costPrice,

                sellingPrice,

                supplier:
                  row.supplier || null,

                expiryDate:
                  row.expiryDate
                    ? new Date(
                        row.expiryDate
                      )
                    : null

              }

            });

          created.push(item);

          if (quantity > 0) {

  await prisma.stockMovement.create({

    data: {

      inventoryItemId: item.id,

      type: "IN",

      quantity,

      notes: "Initial stock imported",

      createdById: req.user.id

    }

  });

}

        } catch (err) {

          failed.push({

            row,

            reason:
              err.message

          });

        }

      }

      res.json({

        createdCount:
          created.length,

        updatedCount:
          updated.length,

        failedCount:
          failed.length,

        created,

        updated,

        failed

      });

    } catch (err) {

      console.log(err);

      res.status(500).json({

        error:
          "Bulk import failed"

      });

    }

  }
);

export default router;