import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { createAddress } from "../controllers/addressController.js";

export const addressRouter = Router();

addressRouter.post("/create", auth, createAddress);
