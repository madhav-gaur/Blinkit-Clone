import jwt from "jsonwebtoken";
// ? userAuth

export const auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.accessToken ||
      (req.headers.authorization ? req.headers.authorization.split(" ")[1] : undefined);
    if (!token) {
      res.json({
        success: false,
        message: "Provide token",
      });
    }
    const decode = await jwt.verify(token, process.env.JWT_SECRET_ACCESS_TOKEN);
    if (!decode) {
      res.status(401).json({
        success: false,
        message: "Unauthorized Access",
      });
    }
    req.userId = decode.id;
    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message || error });
  }
};
