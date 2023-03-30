import express from "express";
import Product from "../models/product.js";

const router = express.Router();

router.get("/", async (rreq, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

export default router;
