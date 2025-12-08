import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  createAddress,
  disableAddress,
  getAddress,
} from "../controllers/addressController.js";

export const addressRouter = Router();

addressRouter.post("/create", auth, createAddress);
addressRouter.get("/get", auth, getAddress);
addressRouter.delete("/disable", auth, disableAddress);
