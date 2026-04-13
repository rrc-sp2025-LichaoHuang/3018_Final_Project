
import { Request, Response } from "express";
import { auth } from "../configs/firebaseConfig";

/**
 * Set custom claims (role) for a user
 */
export const setCustomClaims = async (req: Request, res: Response) => {
  try {
    const { email, role } = req.body;

    // Validate input
    if (!email || !role) {
      return res.status(400).json({
        message: "Email and role are required",
      });
    }

    // Get user by email
    const user = await auth.getUserByEmail(email);

    // Set role in Firebase custom claims
    await auth.setCustomUserClaims(user.uid, { role });

    return res.status(200).json({
      message: `Role '${role}' assigned to ${email}`,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Failed to set role",
    });
  }
};