export async function exportEDI(dto) {

  const lines = [];

  //----------------------------------
  // HEADER
  //----------------------------------

  lines.push(

    `HDR|1|${dto.claim.claimNumber}|${dto.claim.status}`

  );

  //----------------------------------
  // HOSPITAL
  //----------------------------------

  lines.push(

    [

      "HSP",

      dto.hospital.id,

      dto.hospital.name,

      dto.hospital.facilityCode ?? ""

    ].join("|")

  );

  //----------------------------------
  // PATIENT
  //----------------------------------

 lines.push(

    [

      "PAT",

      dto.patient.patientNumber,

      dto.patient.firstName,

      dto.patient.lastName,

      dto.patient.gender,

      dto.patient.dateOfBirth instanceof Date
        ? dto.patient.dateOfBirth.toISOString().slice(0, 10)
        : dto.patient.dateOfBirth

    ].join("|")

  );

  //----------------------------------
  // INSURANCE
  //----------------------------------

  lines.push(

    [

      "INS",

      dto.insurance.providerName,

      dto.insurance.policyNumber,

      dto.insurance.memberId,

      dto.insurance.authorizationNumber ?? ""

    ].join("|")

  );

  //----------------------------------
  // INVOICE
  //----------------------------------

  lines.push(

    [

      "INV",

      dto.invoice.invoiceNumber,

      dto.invoice.subtotal,

      dto.invoice.discount,

      dto.invoice.tax,

      dto.invoice.insuranceAmount,

      dto.invoice.patientAmount,

      dto.invoice.total

    ].join("|")

  );

  //----------------------------------
  // CHARGES
  //----------------------------------

  dto.invoice.charges.forEach(charge => {

    lines.push(

      [

        "CHG",

        charge.code ?? "",

        charge.department ?? "",

        charge.description,

        charge.quantity,

        charge.unitPrice,

        charge.total

      ].join("|")

    );

  });

  //----------------------------------
  // ATTACHMENTS
  //----------------------------------

  dto.attachments.forEach(file => {

    lines.push(

      [

        "ATT",

        file.type,

        file.fileName,

        file.fileUrl

      ].join("|")

    );

  });

  //----------------------------------
  // TRAILER
  //----------------------------------

  lines.push(

    `TRL|${dto.invoice.charges.length}`

  );

  const edi = lines.join("\n");

  return {

    fileName: `${dto.claim.claimNumber}.edi`,

    mimeType: "text/plain",

    buffer: Buffer.from(edi)

  };

}