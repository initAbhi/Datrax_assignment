import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateRequest } from "../middlewares/validateRequest";
import { authenticate } from "../middlewares/authMiddleware";
import { loginSchema } from "../validators";
import rateLimit from "express-rate-limit";

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per `window` (here, per 15 minutes)
  message: { success: false, message: "Too many login attempts from this IP, please try again after 15 minutes" },
});

const router = Router();
const authController = new AuthController();

router.post("/login", loginLimiter, validateRequest(loginSchema), authController.login);
router.get("/me", authenticate, authController.getMe);

export default router;
