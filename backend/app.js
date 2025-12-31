import express from "express";
import bodyParser from "body-parser";
import path from "node:path";
import logger from "morgan";
import cors from "cors";
const app = express();
const __dirname = path.resolve();
import auth from "./middleware/auth.js";
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/user.js";
import productRoutes from "./routes/product.js";
import couponRoutes from "./routes/coupon.js";
import reviewRoutes from "./routes/review.js";

app.use(express.json());
app.use(express.static("./backend/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(logger("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/users", auth, userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/coupons", auth, couponRoutes);
app.use("/api/reviews", auth, reviewRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend", "dist")));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });
}
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).json({ success: false, message: "Internal Server error" });
});

export default app;
