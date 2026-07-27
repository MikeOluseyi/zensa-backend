import PDFDocument from "pdfkit";

export async function exportPDF(dto) {

  return new Promise((resolve, reject) => {

    const doc = new PDFDocument({

      size: "A4",

      margin: 40

    });

    const buffers = [];

    doc.on("data", chunk => buffers.push(chunk));

    doc.on("end", () => {

      resolve({

        fileName: `${dto.claim.claimNumber}.pdf`,

        mimeType: "application/pdf",

        buffer: Buffer.concat(buffers)

      });

    });

    doc.on("error", reject);

    //--------------------------------------------------
    // HEADER
    //--------------------------------------------------

    doc

      .fontSize(20)

      .text("Insurance Claim", {

        align: "center"

      });

    doc.moveDown();

    //--------------------------------------------------
    // CLAIM
    //--------------------------------------------------

    doc

      .fontSize(12)

      .text(`Claim Number: ${dto.claim.claimNumber}`)

      .text(`Status: ${dto.claim.status}`)

      .text(`Submitted: ${dto.claim.submittedAt ?? "-"}`)

      .text(`Currency: ${dto.claim.currency}`);

    doc.moveDown();

    //--------------------------------------------------
    // HOSPITAL
    //--------------------------------------------------

    doc

      .fontSize(14)

      .text("Hospital");

    doc

      .fontSize(11)

      .text(dto.hospital.name)

      .text(dto.hospital.address ?? "")

      .text(dto.hospital.phone ?? "")

      .text(dto.hospital.email ?? "");

    doc.moveDown();

    //--------------------------------------------------
    // PATIENT
    //--------------------------------------------------

    doc

      .fontSize(14)

      .text("Patient");

    doc

      .fontSize(11)

      .text(

        `${dto.patient.firstName} ${dto.patient.lastName}`

      )

      .text(`Patient Number: ${dto.patient.patientNumber}`)

      .text(`Gender: ${dto.patient.gender}`)

      .text(
        `DOB: ${
          dto.patient.dateOfBirth instanceof Date
            ? dto.patient.dateOfBirth.toISOString().slice(0, 10)
            : dto.patient.dateOfBirth
        }`
      );

    doc.moveDown();

    //--------------------------------------------------
    // INSURANCE
    //--------------------------------------------------

    doc.moveDown();

    //--------------------------------------------------
    // ENCOUNTER METADATA
    //--------------------------------------------------

    doc
      .fontSize(14)
      .text("Encounter");

    doc
      .fontSize(11)
      .text(`Check-In: ${dto.encounter.checkIn ? new Date(dto.encounter.checkIn).toLocaleString() : "-"}`)
      .text(`Check-Out: ${dto.encounter.checkOut ? new Date(dto.encounter.checkOut).toLocaleString() : "-"}`);

    doc.moveDown();

    //--------------------------------------------------
    // CLINICAL TIMELINE
    //--------------------------------------------------

    if (dto.timeline.length > 0) {

      doc
        .fontSize(14)
        .text("Clinical Timeline");

      doc.moveDown(0.5);

      dto.timeline.forEach(event => {

        const time = new Date(event.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

        doc
          .fontSize(10)
          .text(
            `${time}  |  ${event.description}${event.actor ? `  (${event.actorRole ?? ""}: ${event.actor})` : ""}`
          );

      });

      doc.moveDown();

    }

    //--------------------------------------------------
    // INVOICE
    //--------------------------------------------------

    doc

      .fontSize(14)

      .text("Invoice Summary");

    doc

      .fontSize(11)

      .text(`Invoice: ${dto.invoice.invoiceNumber}`)

      .text(`Subtotal: ${dto.invoice.subtotal}`)

      .text(`Discount: ${dto.invoice.discount}`)

      .text(`Tax: ${dto.invoice.tax}`)

      .text(`Insurance Amount: ${dto.invoice.insuranceAmount}`)

      .text(`Patient Amount: ${dto.invoice.patientAmount}`)

      .text(`Total: ${dto.invoice.total}`);

    doc.moveDown();

    //--------------------------------------------------
    // CHARGES
    //--------------------------------------------------

    doc

      .fontSize(14)

      .text("Charges");

    doc.moveDown(0.5);

    dto.invoice.charges.forEach(charge => {

      doc

        .fontSize(10)

        .text(

          `${charge.description}`,

          {

            continued: true

          }

        )

        .text(

          `   Qty: ${charge.quantity}`,

          {

            continued: true

          }

        )

        .text(

          `   Unit: ${charge.unitPrice}`,

          {

            continued: true

          }

        )

        .text(

          `   Total: ${charge.total}`

        );

    });

    doc.moveDown();

    //--------------------------------------------------
    // ATTACHMENTS
    //--------------------------------------------------

    if (dto.attachments.length > 0) {

      doc

        .fontSize(14)

        .text("Attachments");

      dto.attachments.forEach(file => {

        doc

          .fontSize(10)

          .text(

            `${file.type} - ${file.fileName}`

          );

      });

    }

    //--------------------------------------------------

    doc.end();

  });

}