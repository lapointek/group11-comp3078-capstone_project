import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import connectDB from "./db/db.js";
import authRouter from "./routes/auth.js";
import departmentRouter from "./routes/department.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRouter);
app.use("/api/department", departmentRouter);

const PORT = process.env.PORT || 3000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server successfully connected at port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect to database: ", err);
  });
