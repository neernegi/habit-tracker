import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import habitRoutes from "./routes/habit.route.js";
import { errorHandler } from "./middlewares/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/habits", habitRoutes);

// Error Handler
app.use(errorHandler);

export default app;
