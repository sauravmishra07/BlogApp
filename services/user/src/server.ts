import express from "express";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoutes from "./routes/user.js";

dotenv.config();

const app = express();
connectDB();

app.use("/api/users", userRoutes);
const port = process.env.PORT;

app.listen(port, () => { 
  console.log(`Server is running on port http://localhost:${port}`);
});
