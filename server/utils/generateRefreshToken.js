import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const generatedRefreshToken = async (userId) => {
  if (!process.env.JWT_SECRET_REFRESH_TOKEN) {
    console.error("Missing JWT_SECRET_REFRESH_TOKEN environment variable. Please set JWT_SECRET_REFRESH_TOKEN in your environment to generate refresh tokens.");
    return null;
  }
  const token = await jwt.sign(
    { id: userId },
    process.env.JWT_SECRET_REFRESH_TOKEN,
    { expiresIn: "30d" }
  );
  const updateRefreshToken = await userModel.updateOne(
    { _id: userId },
    { refresh_token: token }
  );
  return token;
};
