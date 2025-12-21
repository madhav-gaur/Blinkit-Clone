import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  adminOrders,
  getOrderItems,
  placeCODOrder,
} from "../controllers/orderController.js";
import { admin } from "../middleware/admin.js";

export const orderRouter = Router();

orderRouter.post("/cash-on-delivery", auth, placeCODOrder);
orderRouter.get("/order-list", auth, getOrderItems);
orderRouter.get("/admin-orders", auth, admin, adminOrders);
