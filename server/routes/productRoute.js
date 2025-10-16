import { Router } from "express";
import { auth } from "../middleware/auth.js";
import {
  createProduct,
  deleteProduct,
  getAllProduct,
  getProduct,
  updateProductDetails,
} from "../controllers/productController.js";
import { admin } from "../middleware/admin.js";

export const productRouter = Router();

productRouter.post("/create", auth, admin, createProduct);
productRouter.post("/get", getProduct);
productRouter.get("/get-all", getAllProduct);
productRouter.put("/update-product-details", auth, admin, updateProductDetails);
productRouter.delete("/delete-product", auth, deleteProduct);
