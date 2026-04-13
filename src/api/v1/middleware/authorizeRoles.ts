/**
 * Role-based Authorization Middleware
 */

import { Request, Response, NextFunction } from "express";

/**
 * Accept multiple roles (array)
 */
export const authorizeRoles = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const userRole = res.locals.role;

    // Check if user role is in allowed roles
    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({
        message: "Forbidden: You do not have permission",
      });
    }

    next();
  };
};