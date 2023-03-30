import express from "express";
import KPI from "../models/kpi.js";

const router = express.Router();

router.get("/", async (rreq, res) => {
  try {
    const kpis = await KPI.find();
    res.status(200).json(kpis);
  } catch (error) {
    res.status(404).json({
      message: error.message,
    });
  }
});

export default router;
