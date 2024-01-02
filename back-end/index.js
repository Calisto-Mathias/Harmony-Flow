import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

import authRouter from "./routes/auth.js";

// Server Configurations
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: "true" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: "true" }));
app.use(morgan("common"));

app.use("/assets", express.static(path.join(__dirname, "public/assets")));
// Server Configuration Ends Here

// Routing Starts Here
app.use("/auth", authRouter);
// Routing Ends Here

// Mongoose Setup
const port = process.env.PORT || 3000;
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Running On ${port}`);
    });
  })
  .catch((err) => {
    console.log(`${err} did not connect!`);
  });
