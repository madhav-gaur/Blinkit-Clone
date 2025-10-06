import jwt from "jsonwebtoken";
import { userModel } from "../models/userModel.js";

export const generatedRefreshToken = async (userId) => {
  if (!process.env.JWT_SECRET_REFRESH_TOKEN) {
    console.log("Provide JWT SECRET");
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
