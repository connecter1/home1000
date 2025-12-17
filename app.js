import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/authRoutes.js";
import taskRoutes from "./routes/taskRoutes.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import "./migrate.js"

dotenv.config();
const app = express();

app.use(bodyParser.json());
app.use("/auth", authRoutes);
app.use("/tasks", taskRoutes);

// Global error handler
app.use(errorHandler);

export default app;