import { Router } from "express";
import { MenuItemController } from "../controllers/MenuItemController";
import { authenticate } from "../middlewares/authMiddleware";

const router = Router();
const menuItemController = new MenuItemController();

router.use(authenticate);
router.get("/", menuItemController.getAll);

export default router;
