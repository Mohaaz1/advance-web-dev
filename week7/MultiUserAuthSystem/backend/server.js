import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/authRoutes.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send(
    "Multi User Authentication System"
  );
});

app.use("/api/auth", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");

    app.listen(
      process.env.PORT,
      () => {
        console.log(
          `Server running on port ${process.env.PORT}`
        );
      }
    );
  })
  .catch(console.error);
