import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors/AppError";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  if (err.isOperational) {
    res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  } else {
    // Programming or other unknown error: don't leak error details
    console.error("ERROR ", err);
    res.status(500).json({
      success: false,
      message: "Something went very wrong!",
      errors: err.message,
    });
  }
};
