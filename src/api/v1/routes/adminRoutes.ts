import { Router } from "express";
import { setCustomClaims } from "../controllers/adminController";
import { authenticate } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorizeRoles";

const router = Router();

/**
 * POST /api/v1/admin
 */
router.post(
  "/",
  authenticate,
  setCustomClaims
);

export default router;