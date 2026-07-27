import { exportCSV } from "./exporters/csvExporter.js";
import { exportEDI } from "./exporters/ediExporter.js";
import { exportJSON } from "./exporters/jsonExporter.js";
import { exportPDF } from "./exporters/pdfExporter.js";
import { exportXML } from "./exporters/xmlExporter.js";

import { buildClaimDTO } from "./buildClaimDTO.js";
import { createAuditLog } from "../auditService.js";

const EXPORTERS = {
  csv: exportCSV,
  edi: exportEDI,
  json: exportJSON,
  pdf: exportPDF,
  xml: exportXML
};

export async function exportClaim({

  claimId,

  format,

  performedById,

  dto = null

}) {

  const exporter = EXPORTERS[format];

  if (!exporter) {
    throw new Error(`Unsupported export format: ${format}`);
  }

  const claimDTO =
    dto ?? await buildClaimDTO(claimId);

  const file = await exporter(claimDTO);

  await createAuditLog({

    hospitalId: claimDTO.hospital.id,

    staffId: performedById,

    action: "EXPORT_CLAIM",

    entity: "CLAIM",

    entityId: claimId,

    details:
      `Exported claim ${claimDTO.claim.claimNumber} as ${format.toUpperCase()}`

  });

  return file;

}