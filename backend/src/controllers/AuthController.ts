import { Request, Response, NextFunction } from "express";
import { AuthService } from "../services/AuthService";

const authService = new AuthService();

export class AuthController {
  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await authService.login(email, password);
      
      res.status(200).json({
        success: true,
        message: "Login successful",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  }

  async getMe(req: Request, res: Response, next: NextFunction) {
    try {
      if (!(req as any).user) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
      }
      
      res.status(200).json({
        success: true,
        data: {
          user: (req as any).user,
        }
      });
    } catch (error) {
      next(error);
    }
  }
}
