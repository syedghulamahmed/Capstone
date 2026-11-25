import { Router } from "express";
import multer from "multer";
import crypto from "crypto";
import fs from "fs";
import path from "path";
import { UserRole } from "@prisma/client";
import { requireAuth, AuthedRequest } from "../middleware/auth";
import { prisma } from "../prisma";
import { config } from "../config";
import { hasValidResumeFileSignature } from "../resumeFileValidation";

export const uploadRouter = Router();

const allowedMimeTypes = new Set(["application/pdf", "image/png", "image/jpeg"]);
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, callback) => callback(null, allowedMimeTypes.has(file.mimetype)),
});

uploadRouter.post(
  "/resume",
  requireAuth,
  upload.single("file"),
  async (req: AuthedRequest, res, next) => {
    try {
      if (req.user!.role !== UserRole.STUDENT) {
        return res.status(403).json({
          error: { code: "FORBIDDEN", message: "Student role required" },
        });
      }

      if (!req.file) {
        return res.status(400).json({
          error: { code: "INVALID_FILE", message: "PDF, PNG or JPEG file required" },
        });
      }

      if (!hasValidResumeFileSignature(req.file.buffer, req.file.mimetype)) {
        return res.status(400).json({
          error: { code: "INVALID_FILE_CONTENT", message: "The file content does not match its declared type" },
        });
      }

      const directory = path.resolve(config.UPLOAD_DIR);
      fs.mkdirSync(directory, { recursive: true, mode: 0o700 });

      const filename = crypto.randomUUID();
      const extension = req.file.mimetype === "application/pdf"
        ? ".pdf"
        : req.file.mimetype === "image/png"
          ? ".png"
          : ".jpg";
      const target = path.join(directory, filename + extension);

      fs.writeFileSync(target, req.file.buffer, { mode: 0o600 });
      await prisma.student.update({
        where: { userId: req.user!.id },
        data: { resumePath: filename + extension },
      });

      return res.status(201).json({ data: { uploaded: true } });
    } catch (error) {
      return next(error);
    }
  },
);
