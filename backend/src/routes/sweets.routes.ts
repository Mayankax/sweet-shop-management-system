import { Router } from "express";
import { addSweet, listSweets, remove, search, update } from "../controllers/sweets.controller";
import { authenticate } from "../middlewares/auth.middleware";
import { requireAdmin } from "../middlewares/admin.middleware";

const router = Router();

router.post("/", authenticate, requireAdmin, addSweet);
router.get("/", authenticate, listSweets);
router.get("/search", authenticate, search);
router.put("/:id", authenticate, requireAdmin, update);
router.delete("/:id", authenticate, requireAdmin, remove);

export default router;
