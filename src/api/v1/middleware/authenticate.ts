import { Request, Response, NextFunction } from "express";
import { auth } from "../configs/firebaseConfig";
import { Role } from "../types/roles";

/**
 * Authentication Middleware
 *
 * Purpose:
 * - Verify Firebase ID Token
 * - Extract uid and role
 * - Store user data in res.locals
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    /**
     * Step 1: Get Authorization header
     */
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Authentication token missing",
      });
    }

    /**
     * Step 2: Extract token
     */
    const idToken = authHeader.split("Bearer ")[1];

    /**
     * Step 3: Verify token
     */
    const decodedToken = await auth.verifyIdToken(idToken);

    /**
     * Step 4: Extract uid and role
     */
    const uid = decodedToken.uid;

    // Cast role to our enum type
    const role: Role = (decodedToken.role as Role) || Role.Brother;

    /**
     * Step 5: Store in res.locals
     */
    res.locals.uid = uid;
    res.locals.role = role;

    /**
     * Step 6: Continue
     */
    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};