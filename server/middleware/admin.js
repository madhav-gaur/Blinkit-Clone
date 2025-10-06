import {userModel} from "../models/userModel.js";

export const admin = async (req, res, next) => {
  try {
    const userId = req.userId;
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "ADMIN") {
      return next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Access denied. Admins only.",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: error.message,
    });
  }
};

