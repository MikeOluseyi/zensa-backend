import express from "express";

import prisma from "../utils/prisma.js";

import {

reviewClaim,

approveClaim,

rejectClaim,

markPaid

}

from "../utils/claimsEngine.js";

import { buildClaimDTO } from "../utils/claimDelivery/buildClaimDTO.js";

import { validateClaimRules } from "../utils/claimRulesEngine.js";

import {

protectInsurance

}

from "../middleware/insuranceAuthMiddleware.js";

import {

authorizeInsurancePermission

}

from "../middleware/permissionMiddleware.js";

const router=express.Router();



/*
==========================================
ALL CLAIMS
==========================================
*/

router.get(

"/",

protectInsurance,

authorizeInsurancePermission(

"VIEW_CLAIMS"

),

async(req,res)=>{

  try {

    const claims=

    await prisma.claim.findMany({

    where:{

    insurance:{

    providerId:

    req.insuranceProvider.id

    },

    status: {
    not: "DRAFT"
  }

    },

    include:{

    patient:true,

    invoice:{

    include:{

    charges:true,

    hospital: {
        select: { name: true }
      }

    }

    },

    attachments:true,

    messages:true

    },

    orderBy:{

    submittedAt:"desc"

    }

    });

    res.json(claims);

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Failed to fetch claims" });

  }

}

);



/*
==========================================
SINGLE CLAIM
==========================================
*/

router.get(

"/:id",

protectInsurance,

authorizeInsurancePermission(

"VIEW_CLAIMS"

),

async(req,res)=>{

  try {

    const claim=

    await prisma.claim.findFirst({

    where:{

      id: req.params.id,

      insurance: {
        providerId: req.insuranceProvider.id
      },

      status: {
    not: "DRAFT"
  }

    },

    include:{

    patient:true,

    invoice:{

    include:{

    charges:true, 

     hospital: {
        select: { name: true }
      }

    }

    },

    attachments:true,

    messages:true,

    payments:true

    }

    });

    if (!claim) {
      return res.status(404).json({ error: "Claim not found" });
    }

    res.json(claim);

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: "Failed to fetch claim" });

  }

}

);



/*
==========================================
START REVIEW
==========================================
*/

router.patch(

"/:id/review",

protectInsurance,

authorizeInsurancePermission(

"REVIEW_CLAIMS"

),

async(req,res)=>{

  try {

    const claim=

    await reviewClaim({

    claimId:req.params.id,

    reviewerId:req.user.id

    });

    res.json(claim);

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: err.message });

  }

}

);



/*
==========================================
APPROVE
==========================================
*/

router.patch(

"/:id/approve",

protectInsurance,

authorizeInsurancePermission(

"APPROVE_CLAIMS"

),

async(req,res)=>{

  try {

    const{

    approvedAmount

    }=req.body;

    const claim=

    await approveClaim({

    claimId:req.params.id,

    approvedAmount,

    processedByInsuranceStaffId:

    req.user.id

    });

    res.json(claim);

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: err.message });

  }

}

);



/*
==========================================
REJECT
==========================================
*/

router.patch(

"/:id/reject",

protectInsurance,

authorizeInsurancePermission(

"REJECT_CLAIMS"

),

async(req,res)=>{

  try {

    const{

    rejectionReason

    }=req.body;

    const claim=

    await rejectClaim({

    claimId:req.params.id,

    rejectionReason,

    processedByInsuranceStaffId:

    req.user.id

    });

    res.json(claim);

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: err.message });

  }

}

);



/*
==========================================
PAY
==========================================
*/

router.patch(

"/:id/pay",

protectInsurance,

authorizeInsurancePermission(

"MARK_CLAIM_PAID"

),

async(req,res)=>{

  try {

    const claim=

    await markPaid({

    claimId:req.params.id

    });

    res.json(claim);

  } catch (err) {

    console.log(err);

    res.status(500).json({ error: err.message });

  }

}

);

/*
==========================================
CLAIM ATTACHMENTS (insurer can view/add)
==========================================
*/

router.get(
  "/:id/attachments",
  protectInsurance,
  authorizeInsurancePermission("VIEW_CLAIMS"),
  async (req, res) => {

    try {

      const claim = await prisma.claim.findFirst({
        where: {
          id: req.params.id,
          insurance: { providerId: req.insuranceProvider.id }
        }
      });

      if (!claim) {
        return res.status(404).json({ error: "Claim not found" });
      }

      const attachments = await prisma.claimAttachment.findMany({
        where: { claimId: req.params.id },
        orderBy: { attachedAt: "asc" }
      });

      res.json(attachments);

    } catch (err) {

      console.log(err);

      res.status(500).json({ error: "Failed to fetch attachments" });

    }

  }
);

router.post(
  "/:id/attachments",
  protectInsurance,
  authorizeInsurancePermission("VIEW_CLAIMS"),
  async (req, res) => {

    try {

      const claim = await prisma.claim.findFirst({
        where: {
          id: req.params.id,
          insurance: { providerId: req.insuranceProvider.id }
        }
      });

      if (!claim) {
        return res.status(404).json({ error: "Claim not found" });
      }

      const { fileName, fileUrl, type } = req.body;

      const attachment = await prisma.claimAttachment.create({

        data: {

          claimId: req.params.id,

          fileName,

          fileUrl,

          type: type ?? "OTHER",

          attachedByInsuranceStaffId: req.user.id

        }

      });

      res.json(attachment);

    } catch (err) {

      console.log(err);

      res.status(500).json({ error: "Failed to add attachment" });

    }

  }
);

/*
==========================================
CLAIM MESSAGES (insurer can send/view)
==========================================
*/

router.get(
  "/:id/messages",
  protectInsurance,
  authorizeInsurancePermission("VIEW_CLAIMS"),
  async (req, res) => {

    try {

      const claim = await prisma.claim.findFirst({
        where: {
          id: req.params.id,
          insurance: { providerId: req.insuranceProvider.id }
        }
      });

      if (!claim) {
        return res.status(404).json({ error: "Claim not found" });
      }

      const messages = await prisma.claimMessage.findMany({

        where: { claimId: req.params.id },

        include: {
          staff: { select: { firstName: true, lastName: true } },
          insuranceStaff: { select: { firstName: true, lastName: true } }
        },

        orderBy: { createdAt: "asc" }

      });

      res.json(messages);

    } catch (err) {

      console.log(err);

      res.status(500).json({ error: "Failed to fetch messages" });

    }

  }
);

router.post(
  "/:id/messages",
  protectInsurance,
  authorizeInsurancePermission("VIEW_CLAIMS"),
  async (req, res) => {

    try {

      const claim = await prisma.claim.findFirst({
        where: {
          id: req.params.id,
          insurance: { providerId: req.insuranceProvider.id }
        }
      });

      if (!claim) {
        return res.status(404).json({ error: "Claim not found" });
      }

      const message = await prisma.claimMessage.create({

        data: {

          claimId: req.params.id,

          message: req.body.message,

          senderType: "INSURER",

          insuranceStaffId: req.user.id

        }

      });

      res.json(message);

    } catch (err) {

      console.log(err);

      res.status(500).json({ error: "Failed to send message" });

    }

  }
);

router.get(
  "/:id/timeline",
  protectInsurance,
  authorizeInsurancePermission("VIEW_CLAIMS"),
  async (req, res) => {

    try {

      const claim = await prisma.claim.findFirst({
        where: {
          id: req.params.id,
          insurance: { providerId: req.insuranceProvider.id }
        }
      });

      if (!claim) {
        return res.status(404).json({ error: "Claim not found" });
      }

      const dto = await buildClaimDTO(claim.id);

      res.json({
        encounter: dto.encounter,
        timeline: dto.timeline
      });

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message || "Failed to fetch claim timeline"
      });

    }

  }
);

// insuranceClaimRoutes.js — add near the existing /:id/timeline route
router.get(
  "/:id/full",
  protectInsurance,
  authorizeInsurancePermission("VIEW_CLAIMS"),
  async (req, res) => {

    try {

      const claim = await prisma.claim.findFirst({
        where: {
          id: req.params.id,
          insurance: { providerId: req.insuranceProvider.id }
        }
      });

      if (!claim) {
        return res.status(404).json({ error: "Claim not found" });
      }

      const dto = await buildClaimDTO(claim.id);

      res.json(dto);

    } catch (err) {

      console.log(err);

      res.status(500).json({
        error: err.message || "Failed to fetch claim details"
      });

    }

  }
);

// insuranceClaimRoutes.js — add near /:id/timeline and /:id/full
router.get(
  "/:id/rules",
  protectInsurance,
  authorizeInsurancePermission("VIEW_CLAIMS"),
  async (req, res) => {

    try {

      const claim = await prisma.claim.findFirst({
        where: {
          id: req.params.id,
          insurance: { providerId: req.insuranceProvider.id }
        }
      });

      if (!claim) {
        return res.status(404).json({ error: "Claim not found" });
      }

      const validation = await validateClaimRules(claim.id);

      res.json(validation);

    } catch (err) {

      console.log(err);

      res.status(500).json({ error: err.message || "Failed to validate claim rules" });

    }

  }
);

export default router;