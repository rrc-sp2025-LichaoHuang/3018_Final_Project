import { Router } from "express";
import { setCustomClaims } from "../controllers/adminController";
import { authenticate } from "../middleware/authenticate";
import { authorizeRoles } from "../middleware/authorizeRoles";
import { Role } from "../types/roles";

const router = Router();

/**
 * POST /api/v1/admin
 */
router.post(
  "/",
  authenticate,
  authorizeRoles(Role.Primarch),
  setCustomClaims
);

export default router;