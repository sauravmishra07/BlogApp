import express from "express";
import dotenv from "dotenv";
import blogRoutes from "./routes/blog.js";
import cors from "cors";

dotenv.config();
const app = express();

const port = process.env.PORT;
app.use(express.json());

app.use("/api/blog", blogRoutes);

app.listen(port, () => {
  console.log(`✅ Server is running on port http://localhost:${port}`);
});
