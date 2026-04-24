import { Request, Response, NextFunction } from "express";
import { Role } from "../types/roles";

/**
 * Authorization Middleware (RBAC)
 *
 * Checks if user role is allowed to access the route
 */
export const authorizeRoles = (...allowedRoles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    /**
     * Step 1: Get role from res.locals
     */
    const userRole: Role = res.locals.role;

    /**
     * Step 2: Validate role exists
     */
    if (!userRole) {
      return res.status(403).json({
        message: "Forbidden: no role assigned",
      });
    }

    /**
     * Step 3: Check permission
     */
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Forbidden: insufficient permissions",
      });
    }

    /**
     * Step 4: Allow access
     */
    next();
  };
};