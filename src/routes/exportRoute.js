router.get(
"/export",
protect,
authorizePermission("APPROVE_CLAIMS"),
async (req,res)=>{

const claims =
await prisma.claim.findMany({

where:{

status:{
in:[
"APPROVED",
"PARTIALLY_APPROVED"
]
},

invoice:{
hospitalId:req.user.hospitalId
}

},

include:{

patient:true,

insurance:{
include:{
provider:true
}
},

invoice:{
include:{
charges:true
}
}

}

});

const exportRows =
claims.map(claim=>({

claimId:claim.id,

patientId:claim.patient.id,

patientName:
`${claim.patient.firstName} ${claim.patient.lastName}`,

insurance:
claim.insurance.provider.name,

invoiceId:
claim.invoice.id,

subtotal:
claim.invoice.subtotal,

approvedAmount:
claim.approvedAmount ??
claim.totalAmount,

balance:
claim.invoice.balance,

createdAt:
claim.createdAt

}));

res.json(exportRows);

}
);