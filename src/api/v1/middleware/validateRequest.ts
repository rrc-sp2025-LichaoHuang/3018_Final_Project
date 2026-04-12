/**
 * Validation middleware using Joi
 * This checks request body before it reaches controller
 */

import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

/**
 * Generic validation middleware
 * @param schema - Joi schema to validate request body
 */
export const validateRequest = (schema: ObjectSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const { error, value } = schema.validate(req.body, {
      abortEarly: false,   // show all errors at once
      stripUnknown: true,  // remove extra fields not in schema
    });

    // If validation fails
    if (error) {
      return res.status(400).json({
        message: "Validation error",
        details: error.details.map(err => err.message),
      });
    }

    // Replace body with validated/sanitized value
    req.body = value;

    next();
  };
};