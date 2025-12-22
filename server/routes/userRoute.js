import { Router } from "express";
import {
  getAllUser,
  logoutUser,
  refreshToken,
  registerUser,
  updateUserDetails,
  uploadAvatar,
  userDetails,
  userLogin,
  verifyEmailControler,
} from "../controllers/userController.js";
import { auth } from "../middleware/auth.js";
import { upload } from "../config/multer.js";
import { admin } from "../middleware/admin.js";

export const userRouter = Router();

userRouter.post("/register", registerUser);
userRouter.post("/verify-email", verifyEmailControler);
userRouter.post("/login", userLogin);
userRouter.get("/logout", auth, logoutUser);
userRouter.put("/upload-avatar", auth, upload.single("avatar"), uploadAvatar);
userRouter.put("/update-user", auth, updateUserDetails);
userRouter.post("/refresh-token", refreshToken);
userRouter.get("/user-details", auth, userDetails);
userRouter.get("/all-user-details", auth, admin, getAllUser);
