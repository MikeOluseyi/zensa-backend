import prisma from "../prisma.js";

import { buildClaimDTO } from "./buildClaimDTO.js";

import { deliverInternally } from "./internalDelivery.js";

import { exportClaim } from "./exportEngine.js";

export async function deliverClaim({

  claimId,

  format = null,

  performedById

}) {

  // Build canonical claim object once, reuse for either path

  const dto = await buildClaimDTO(claimId);

  const integrationMode =
    dto.insurance.integrationMode;

  // ----------------------------
  // Zensa insurer
  // ----------------------------

  if (integrationMode === "ZENSA") {

    const result =
      await deliverInternally({

        claimId,

        dto,

        performedById

      });

    return {

      type: "SUBMIT",

      result

    };

  }

  // ----------------------------
  // External insurer
  // ----------------------------

  if (!format) {
    throw new Error("An export format is required for external insurers.");
  }

  const result =
    await exportClaim({

      claimId,

      dto,

      format,

      performedById

    });

  return {

    type: "EXPORT",

    result

  };

}