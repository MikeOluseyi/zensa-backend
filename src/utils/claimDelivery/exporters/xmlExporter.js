import { create } from "xmlbuilder2";

export async function exportXML(dto) {

  const xml = create({

    version: "1.0",

    encoding: "UTF-8"

  })

  .ele("Claim")

    .ele("ClaimNumber")

      .txt(dto.claim.claimNumber)

    .up()

    .ele("ClaimStatus")

      .txt(dto.claim.status)

    .up()

    .ele("Hospital")

      .ele("Id")

        .txt(dto.hospital.id)

      .up()

      .ele("Name")

        .txt(dto.hospital.name)

      .up()

    .up()

    .ele("Patient")

      .ele("Id")

        .txt(dto.patient.id)

      .up()

      .ele("PatientNumber")

        .txt(dto.patient.patientNumber)

      .up()

      .ele("FirstName")

        .txt(dto.patient.firstName)

      .up()

      .ele("LastName")

        .txt(dto.patient.lastName)

      .up()

      .ele("DOB")

        .txt(
          dto.patient.dateOfBirth instanceof Date
            ? dto.patient.dateOfBirth.toISOString().slice(0, 10)
            : String(dto.patient.dateOfBirth)
        )

      .up()

      .ele("Gender")

        .txt(dto.patient.gender)

      .up()

    .up()
    .ele("Insurance")

      .ele("Provider")

        .txt(dto.insurance.providerName)

      .up()

      .ele("PolicyNumber")

        .txt(dto.insurance.policyNumber)

      .up()

    .up()

    .ele("Invoice")

      .ele("InvoiceNumber")

        .txt(dto.invoice.invoiceNumber)

      .up()

      .ele("Subtotal")
        .txt(String(dto.invoice.subtotal))
      .up()
      .ele("Discount")
        .txt(String(dto.invoice.discount))
      .up()
      .ele("InsuranceAmount")
        .txt(String(dto.invoice.insuranceAmount))
      .up()
      .ele("PatientAmount")
        .txt(String(dto.invoice.patientAmount))
      .up()

      .ele("Charges");

  dto.invoice.charges.forEach(charge => {

    xml

      .ele("Charge")

        .ele("Code")

          .txt(charge.code ?? "")

        .up()

        .ele("Description")

          .txt(charge.description)

        .up()

        .ele("Quantity")
          .txt(String(charge.quantity))
        .up()
        .ele("UnitPrice")
          .txt(String(charge.unitPrice))
        .up()
        .ele("Total")
          .txt(String(charge.total))
        .up()

      .up();

  });

  const buffer = Buffer.from(

    xml.end({

      prettyPrint: true

    })

  );

  return {

    fileName: `${dto.claim.claimNumber}.xml`,

    mimeType: "application/xml",

    buffer

  };

}