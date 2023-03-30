import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
// import { MongoClient, ServerApiVersion } from "mongodb";
// // const { MongoClient, ServerApiVersion } = require('mongodb');
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import kpiRoutes from "./routes/kpi.js";
import productRoutes from "./routes/product.js";
import transactionRoutes from "./routes/transaction.js";
import KPI from "./models/kpi.js";
import Product from "./models/product.js";
import Transaction from "./models/transaction.js";
import { kpis, products, transactions } from "./data/data.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

app.use("/kpi", kpiRoutes);
app.use("/product", productRoutes);
app.use("/transaction", transactionRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my Finance API",
  });
});

// mongose setup
const PORT = process.env.PORT || 9000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(async () => {
    app.listen(PORT, () => {
      console.log(`Server port: ${PORT}`);
    });

    // seeding Databases
    // await mongoose.connection.db.dropDatabase();
    // KPI.insertMany(kpis);
    // Product.insertMany(products);
    // Transaction.insertMany(transactions);
  })
  .catch((error) => console.log(`${error} did not connect`));
