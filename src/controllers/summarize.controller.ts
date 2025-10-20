import { Request, Response, NextFunction } from 'express';
import { SummarizeRequestSchema, SummarizeResponse } from '../types/api.types';
import { summarizeText } from '../services/summarization.service';
import { ApiError, ErrorCodes } from '../middleware/errorHandler';
import { ZodError } from 'zod';

/**
 * Controller for POST /api/summarize endpoint
 * Handles text summarization requests
 */
export const summarizeController = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    // Validate request body using Zod schema
    const validatedData = SummarizeRequestSchema.parse(req.body);
    
    // Call summarization service
    const result: SummarizeResponse = await summarizeText(validatedData.text);
    
    // Return structured JSON response
    res.status(200).json(result);
    
  } catch (error) {
    // Handle Zod validation errors
    if (error instanceof ZodError) {
      const errorMessage = error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ');
      next(new ApiError(
        ErrorCodes.INVALID_REQUEST.status,
        ErrorCodes.INVALID_REQUEST.code,
        ErrorCodes.INVALID_REQUEST.message,
        errorMessage
      ));
      return;
    }
    
    // Pass other errors to error handler middleware
    next(error);
  }
};
