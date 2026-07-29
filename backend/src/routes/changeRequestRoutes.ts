import { Router } from "express";
import { ChangeRequestController } from "../controllers/ChangeRequestController";
import { authenticate, restrictTo } from "../middlewares/authMiddleware";
import { validateRequest } from "../middlewares/validateRequest";
import { createChangeRequestSchema, updateChangeRequestStatusSchema } from "../validators";
import { UserRole } from "../entities/User";

const router = Router();
const changeRequestController = new ChangeRequestController();

// All routes here require authentication
router.use(authenticate);

// Manager routes
router.post(
  "/", 
  restrictTo(UserRole.MANAGER), 
  validateRequest(createChangeRequestSchema), 
  changeRequestController.create
);
router.get("/my-requests", restrictTo(UserRole.MANAGER), changeRequestController.getMyRequests);

// Supervisor routes
router.get("/pending", restrictTo(UserRole.SUPERVISOR), changeRequestController.getPendingRequests);
router.get("/approved", changeRequestController.getApprovedQueue); // Allow both to see approved queue
router.patch(
  "/:id/status", 
  restrictTo(UserRole.SUPERVISOR), 
  validateRequest(updateChangeRequestStatusSchema), 
  changeRequestController.updateStatus
);

// Shared route
router.get("/:id", changeRequestController.getDetails);

export default router;
