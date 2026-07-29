import { Router } from "express";
import { DashboardController } from "../controllers/DashboardController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();
const dashboardController = new DashboardController();

router.use(authenticate);
router.get("/metrics", dashboardController.getMetrics);

export default router;
