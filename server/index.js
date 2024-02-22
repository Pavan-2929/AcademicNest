import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import semesterRoutes from "./routes/semester.routes.js";
import subjectRoutes from "./routes/subject.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use(cors());

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});

app.use("/api/semester", semesterRoutes);
app.use("/api/subject", subjectRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Mongoose connected");
  })
  .catch((error) => console.log(error));

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const message = err.message || "Internal Server error"

  res.status(200).json({
    success: false,
    message,
    statusCode,
  })
})