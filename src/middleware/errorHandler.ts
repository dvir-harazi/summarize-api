import { Request, Response, NextFunction } from 'express';
import { ErrorResponse, ErrorCodes } from '../types/api.types';

/**
 * Global error handler middleware
 * Catches all errors and returns standardized error responses
 */
export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
): void => {
  console.error('Error:', err);

  // Check if error has a custom status and code
  if (err.status && err.code) {
    const errorResponse: ErrorResponse = {
      error: {
        code: err.code,
        message: err.message,
        details: err.details
      }
    };
    res.status(err.status).json(errorResponse);
    return;
  }

  // Default to internal server error
  const errorResponse: ErrorResponse = {
    error: {
      code: ErrorCodes.INTERNAL_SERVER_ERROR.code,
      message: ErrorCodes.INTERNAL_SERVER_ERROR.message,
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    }
  };

  res.status(500).json(errorResponse);
};

/**
 * Custom error class for API errors
 */
export class ApiError extends Error {
  status: number;
  code: string;
  details?: string;

  constructor(status: number, code: string, message: string, details?: string) {
    super(message);
    this.status = status;
    this.code = code;
    this.details = details;
    this.name = 'ApiError';
  }
}
