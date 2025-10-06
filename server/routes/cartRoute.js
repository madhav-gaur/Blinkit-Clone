import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  addTocart,
  deleteCartItem,
  getCartItem,
  updateCartItemQty,
} from "../controllers/cartController.js";

export const cartRouter = Router();

cartRouter.post("/create", auth, addTocart);
cartRouter.get("/get", auth, getCartItem);
cartRouter.put("/update-qty", auth, updateCartItemQty);
cartRouter.delete("/delete-cart-item", auth, deleteCartItem);
