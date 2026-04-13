import { Request, Response, NextFunction } from "express";
import { auth } from "../configs/firebaseConfig";

/**
 * Authentication Middleware
 * 
 * Purpose:
 * - Verify Firebase ID Token from request header
 * - Extract user information (uid, role)
 * - Attach user data to res.locals for next middleware/controller
 * 
 * Expected Header:
 * Authorization: Bearer <Firebase ID Token>
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

    // If no token provided
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
     * Step 3: Verify token with Firebase
     */
    const decodedToken = await auth.verifyIdToken(idToken);

    /**
     * Step 4: Extract user info
     * uid: Firebase user ID
     * role: Custom claim (we will use for RBAC)
     */
    const uid = decodedToken.uid;
    const role = decodedToken.role || "Brother"; // default role

    /**
     * Step 5: Store in res.locals
     * So next middleware/controller can access it
     */
    res.locals.uid = uid;
    res.locals.role = role;

    /**
     * Step 6: Continue request
     */
    next();
  } catch (error) {
    /**
     * Token invalid / expired
     */
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};