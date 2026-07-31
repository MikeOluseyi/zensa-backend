import multer from "multer";
import path from "path";
import fs from "fs";

const UPLOAD_DIR = path.join(process.cwd(), "uploads", "claims");

if (!fs.existsSync(UPLOAD_DIR)) {
  fs.mkdirSync(UPLOAD_DIR, { recursive: true });
}

const ALLOWED_MIME_TYPES = [
  "application/pdf",
  "image/jpeg",
  "image/png",
  "image/webp",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
];

const storage = multer.diskStorage({

  destination: (req, file, cb) => {
    cb(null, UPLOAD_DIR);
  },

  filename: (req, file, cb) => {

    const ext = path.extname(file.originalname);

    const safeName =
      `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;

    cb(null, safeName);

  }

});

function fileFilter(req, file, cb) {

  if (!ALLOWED_MIME_TYPES.includes(file.mimetype)) {

    return cb(
      new Error("Unsupported file type. Allowed: PDF, JPG, PNG, WEBP, DOC(X), XLS(X)."),
      false
    );

  }

  cb(null, true);

}

export const uploadClaimAttachment = multer({

  storage,

  fileFilter,

  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB
  }

}).single("file");