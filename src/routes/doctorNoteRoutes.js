import express from "express";

import prisma from "../utils/prisma.js";

import {

createDoctorNote,

updateDoctorNote,

deleteDoctorNote

} from "../utils/doctorNoteEngine.js";

import { protect } from "../middleware/authMiddleware.js";

import { authorize } from "../middleware/roleMiddleware.js";

const router = express.Router();

/*
========================================
CREATE
========================================
*/

router.post(

"/",

protect,

authorize("DOCTOR","ADMIN"),

async(req,res)=>{

const doctorNote =
await createDoctorNote({

visitId:req.body.visitId,

doctorId:req.user.id,

note:req.body.note,

type:req.body.type

});

res.json(doctorNote);

}

);

/*
========================================
VISIT NOTES
========================================
*/

router.get(

"/visit/:visitId",

protect,

async(req,res)=>{

const notes =
await prisma.doctorNote.findMany({

where:{

visitId:req.params.visitId

},

include:{

doctor:{

select:{

firstName:true,

lastName:true

}

}

},

orderBy:{

createdAt:"asc"

}

});

res.json(notes);

}

);

/*
========================================
UPDATE
========================================
*/

router.patch(

"/:id",

protect,

authorize("DOCTOR","ADMIN"),

async(req,res)=>{

const note =
await updateDoctorNote({

noteId:req.params.id,

doctorId:req.user.id,

note:req.body.note

});

res.json(note);

}

);

/*
========================================
DELETE
========================================
*/

router.delete(

"/:id",

protect,

authorize("DOCTOR","ADMIN"),

async(req,res)=>{

await deleteDoctorNote({

noteId:req.params.id,

doctorId:req.user.id

});

res.json({

success:true

});

}

);

export default router;