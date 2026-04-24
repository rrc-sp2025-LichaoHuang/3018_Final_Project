/**
 * Joi validation schemas for File API
 * This file defines rules for incoming request data
 */

import Joi from "joi";

/**
 * Schema for creating a file
 * - title: required string
 * - content: required string
 */
export const createFileSchema = Joi.object({
  title: Joi.string()
    .trim() // remove extra spaces
    .required() // add limit of input
    .messages({
      "string.empty": "Title is required",
      "any.required": "Title is required",
    }),

  content: Joi.string()
    .trim()
    .required() // add limit of input
    .messages({
      "string.empty": "Content is required",
      "any.required": "Content is required",
    }),
});

/**
 * Schema for updating a file
 * All fields are optional
 */
export const updateFileSchema = Joi.object({
  title: Joi.string().trim().optional(),

  content: Joi.string().trim().optional(),
});