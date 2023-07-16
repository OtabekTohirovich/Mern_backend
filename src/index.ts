import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import productRouter from "./routers/ProductRouter";
import seedRouter from "./routers/SeedRouter";
import { userRouter } from "./routers/UserRouter";
dotenv.config();

const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost/tsamazona";
mongoose.set("strictQuery", true);

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    console.log("connect");
  })
  .catch((err) => {
    console.log("disconnect", err );
  });

const app = express();
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
