import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { validateRequest } from "../middlewares/validateRequest";
import { authenticate } from "../middlewares/authMiddleware";
import { loginSchema } from "../validators";

const router = Router();
const authController = new AuthController();

router.post("/login", validateRequest(loginSchema), authController.login);
router.get("/me", authenticate, authController.getMe);

export default router;
