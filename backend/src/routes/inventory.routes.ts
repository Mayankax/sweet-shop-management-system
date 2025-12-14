import { Router } from "express";
import { purchase, restock } from "../controllers/inventory.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/admin.middleware";

const router = Router();

router.post("/:id/purchase", authenticate, purchase);
router.post("/:id/restock", authenticate, requireAdmin, restock);

export default router;
