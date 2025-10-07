import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import { connectDB } from "./config/connectDB.js";

import { userRouter } from "./routes/userRoute.js";
import { categoryRouter } from "./routes/categoryRoute.js";
import { uploadRouter } from "./routes/uploadRoute.js";
import { subCategoryRouter } from "./routes/subCategoryRoute.js";
import { productRouter } from "./routes/productRoute.js";
import { cartRouter } from "./routes/cartRoute.js";

dotenv.config();

const app = express();
app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL,
  })
);

app.use(cookieParser());
app.use(morgan("combined"));
app.use(
  helmet({
    crossOriginResourcePolicy: false,
  })
);
app.get("/", (req, res) => {
  res.send("SERVER RUNNIG");
});


app.use('/api/user', userRouter)
app.use('/api/category', categoryRouter)
app.use('/api/file', uploadRouter)
app.use('/api/subCategory', subCategoryRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)

const PORT = 4000 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port", PORT);
  });
});
