import express, { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { ProductModel } from "../models/ProdoctModel";
import { simpleProducts } from "../data";
const seedRouter = express.Router();

seedRouter.get(
  "/",
  asyncHandler(async (req: Request, res: Response) => {
    await ProductModel.deleteMany({});
    const createProducts = await ProductModel.insertMany(simpleProducts);
    res.json({createProducts});
  })
);

export default seedRouter