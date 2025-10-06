import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { uploadImgController } from "../controllers/uploadImgController.js";
import { upload } from "../config/multer.js";

export const uploadRouter = Router();

uploadRouter.post("/upload", auth, upload.single("image"), uploadImgController);
