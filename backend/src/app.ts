import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import { globalErrorHandler } from "./middlewares/errorHandler";
import authRoutes from "./routes/authRoutes";
import changeRequestRoutes from "./routes/changeRequestRoutes";
import menuItemRoutes from "./routes/menuItemRoutes";
import dashboardRoutes from "./routes/dashboardRoutes";
import { AppError } from "./errors/AppError";

const app = express();

// Middlewares
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/change-requests", changeRequestRoutes);
app.use("/api/menu-items", menuItemRoutes);
app.use("/api/dashboard", dashboardRoutes);

// 404 Handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(globalErrorHandler);

export default app;
