import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { addCategory, deleteCategory, getCategory, updateCategory } from "../controllers/categoryController.js";
import {admin} from "../middleware/admin.js";

export const categoryRouter = Router();

categoryRouter.post("/add-category", auth, admin, addCategory);
categoryRouter.get("/get", getCategory);
categoryRouter.put("/update", auth, admin, updateCategory);
categoryRouter.delete("/delete", auth, admin, deleteCategory);
