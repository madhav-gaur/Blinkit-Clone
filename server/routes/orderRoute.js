import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { placeCODOrder } from "../controllers/orderController.js";

export const orderRouter = Router();

orderRouter.post("/cash-on-delivery", auth, placeCODOrder);
