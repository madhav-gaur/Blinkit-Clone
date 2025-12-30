import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  createAddress,
  disableAddress,
  getAddress,
  getAllAddress,
} from "../controllers/addressController.js";
import { admin } from "../middleware/admin.js";

export const addressRouter = Router();

addressRouter.post("/create", auth, createAddress);
addressRouter.get("/get", auth, getAddress);
addressRouter.delete("/disable", auth, disableAddress);
addressRouter.get("/get", auth, admin, getAllAddress);
