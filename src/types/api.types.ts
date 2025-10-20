import { z } from 'zod';

/**
 * Request Schema
 * Validates incoming text summarization requests
 */
export const SummarizeRequestSchema = z.object({
  text: z.string()
    .min(1, 'Text cannot be empty')
    .max(50000, 'Text exceeds maximum length of 50,000 characters')
});

export type SummarizeRequest = z.infer<typeof SummarizeRequestSchema>;

/**
 * Response Schema
 * Defines the structure of successful summarization responses
 */
export const SummarizeResponseSchema = z.object({
  title: z.string(),
  summary: z.string(),
  keywords: z.array(z.string()),
  sentiment: z.enum(['positive', 'negative', 'neutral', 'mixed'])
});

export type SummarizeResponse = z.infer<typeof SummarizeResponseSchema>;

/**
 * Error Response Schema
 * Standardized error response structure
 */
export const ErrorResponseSchema = z.object({
  error: z.object({
    code: z.string(),
    message: z.string(),
    details: z.string().optional()
  })
});

export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;

/**
 * HTTP Error Codes and Messages
 */
export const ErrorCodes = {
  INVALID_REQUEST: {
    code: 'INVALID_REQUEST',
    status: 400,
    message: 'Invalid request parameters'
  },
  TEXT_EMPTY: {
    code: 'TEXT_EMPTY',
    status: 400,
    message: 'Text field is required and cannot be empty'
  },
  TEXT_TOO_LONG: {
    code: 'TEXT_TOO_LONG',
    status: 413,
    message: 'Text exceeds maximum allowed length'
  },
  TOKEN_LIMIT_EXCEEDED: {
    code: 'TOKEN_LIMIT_EXCEEDED',
    status: 413,
    message: 'Input exceeds maximum token limit of 10,000 tokens'
  },
  LLM_SERVICE_ERROR: {
    code: 'LLM_SERVICE_ERROR',
    status: 502,
    message: 'External LLM service error'
  },
  LLM_SERVICE_UNAVAILABLE: {
    code: 'LLM_SERVICE_UNAVAILABLE',
    status: 503,
    message: 'LLM service temporarily unavailable'
  },
  INTERNAL_SERVER_ERROR: {
    code: 'INTERNAL_SERVER_ERROR',
    status: 500,
    message: 'An unexpected error occurred'
  }
} as const;
