import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { getOrderItems, placeCODOrder } from "../controllers/orderController.js";

export const orderRouter = Router();

orderRouter.post("/cash-on-delivery", auth, placeCODOrder);
orderRouter.get("/order-list", auth, getOrderItems);
