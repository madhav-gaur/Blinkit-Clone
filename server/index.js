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

const allowedOrigins = [
  "https://blinkit-clone-wi73.vercel.app",
  "https://blinkit-clone-wi73-bm2x0xlbp-madhav-gaurs-projects-9013d5a2.vercel.app", // current deployment
  "http://localhost:5173", // for local dev
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("CORS not allowed for this origin: " + origin));
      }
    },
    credentials: true,
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

app.use("/api/user", userRouter);
app.use("/api/category", categoryRouter);
app.use("/api/file", uploadRouter);
app.use("/api/subCategory", subCategoryRouter);
app.use("/api/product", productRouter);
app.use("/api/cart", cartRouter);

const PORT = 4000 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on port", PORT);
  });
});
