import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/auth";
import { AppError } from "../errors/AppError";
import { AppDataSource } from "../config/data-source";
import { User, UserRole } from "../entities/User";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("You are not logged in! Please log in to get access.", 401));
    }

    const decoded = verifyToken(token) as { id: string; role: string };

    const userRepository = AppDataSource.getRepository(User);
    const currentUser = await userRepository.findOne({ where: { id: decoded.id } });

    if (!currentUser) {
      return next(new AppError("The user belonging to this token does no longer exist.", 401));
    }

    req.user = currentUser;
    next();
  } catch (err) {
    next(new AppError("Invalid or expired token.", 401));
  }
};

export const restrictTo = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return next(new AppError("You do not have permission to perform this action", 403));
    }
    next();
  };
};
