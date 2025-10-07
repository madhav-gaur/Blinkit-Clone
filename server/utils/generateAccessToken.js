import jwt from "jsonwebtoken";

export const generatedAccessToken = async (userId) => {
if (!process.env.JWT_SECRET_ACCESS_TOKEN) {
  throw new Error("JWT_SECRET_ACCESS_TOKEN environment variable is not set.");
}
const token = await jwt.sign(
  {
    id: userId,
  },
  process.env.JWT_SECRET_ACCESS_TOKEN,
  { expiresIn: "2d" }
);

  return token;
};
