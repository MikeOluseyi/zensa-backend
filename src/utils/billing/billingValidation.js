export function validateCharge(data){

    if(!data.patientId)
        throw new Error("Patient required");

    if(!data.visitId)
        throw new Error("Visit required");

    if(data.quantity<=0)
        throw new Error("Invalid quantity");

    if(data.unitPrice<0)
        throw new Error("Invalid price");

}