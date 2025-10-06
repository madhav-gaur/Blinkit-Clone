import { Router } from "express";
import { auth } from "../middleware/auth.js";
import { addSubCategory, deleteSubCategory, getSubCategory, updateSubCategory } from "../controllers/subCategoryController.js";
import {admin} from "../middleware/admin.js";

export const subCategoryRouter = Router();

subCategoryRouter.post("/create", auth, admin, addSubCategory);
subCategoryRouter.get("/get", auth, getSubCategory);
subCategoryRouter.put("/update", auth, admin, updateSubCategory);
subCategoryRouter.delete("/delete", auth, admin, deleteSubCategory);
