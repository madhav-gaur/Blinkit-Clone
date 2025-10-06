import jwt from "jsonwebtoken";

export const generatedAccessToken = async (userId) => {
//   if (!process.env.JWT_SECRET_ACCESS_TOKEN) {
//     console.log("Provide JWT SECRET");
//   }
  const token = await jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_SECRET_ACCESS_TOKEN,
    { expiresIn: "2d" }
  );

  return token;
};
