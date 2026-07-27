import { stringify } from "csv-stringify/sync";

export async function exportCSV(dto) {

  const rows = dto.invoice.charges.map(charge => ({

    ClaimNumber: dto.claim.claimNumber,

    InvoiceNumber: dto.invoice.invoiceNumber,

    Patient: `${dto.patient.firstName} ${dto.patient.lastName}`,

    Hospital: dto.hospital.name,

    Provider: dto.insurance.providerName,

    PolicyNumber: dto.insurance.policyNumber,

    ChargeCode: charge.code,

    Description: charge.description,

    Department: charge.department,

    Quantity: charge.quantity,

    UnitPrice: charge.unitPrice,

    Total: charge.total

  }));

  const csv = stringify(rows, {

    header: true

  });

  return {

    fileName: `${dto.claim.claimNumber}.csv`,

    mimeType: "text/csv",

    buffer: Buffer.from(csv)

  };

}