import { HfInference } from '@huggingface/inference';
import { config } from '../config/env.config';
import { SummarizeResponse } from '../types/api.types';
import { ApiError, ErrorCodes } from '../middleware/errorHandler';

// Initialize Hugging Face client
const hf = new HfInference(config.huggingfaceApiToken);

// Token limit constant (10k tokens ≈ 40k characters for most models)
const MAX_TOKENS = 10000;
const APPROX_CHARS_PER_TOKEN = 4;

/**
 * Estimate token count from text
 * This is a rough approximation. For more accurate counting, 
 * you would need model-specific tokenizers
 */
export function estimateTokenCount(text: string): number {
  return Math.ceil(text.length / APPROX_CHARS_PER_TOKEN);
}

/**
 * Validate input text token count
 */
export function validateTokenCount(text: string): void {
  const estimatedTokens = estimateTokenCount(text);
  
  if (estimatedTokens > MAX_TOKENS) {
    throw new ApiError(
      ErrorCodes.TOKEN_LIMIT_EXCEEDED.status,
      ErrorCodes.TOKEN_LIMIT_EXCEEDED.code,
      ErrorCodes.TOKEN_LIMIT_EXCEEDED.message,
      `Current input: ~${estimatedTokens} tokens (max: ${MAX_TOKENS})`
    );
  }
}

/**
 * Build the prompt for text summarization
 * Designed to extract title, summary, keywords, and sentiment
 */
function buildSummarizationPrompt(text: string): string {
  return `Analyze the following text and provide a structured summary.

TEXT TO ANALYZE:
${text}

INSTRUCTIONS:
1. Create a concise, descriptive title (5-10 words)
2. Write a summary that captures the main ideas (50-150 words)
3. Extract 3-8 relevant keywords or key phrases from the text
4. Determine the overall sentiment: positive, negative, neutral, or mixed

IMPORTANT RULES:
- Base your analysis ONLY on information present in the text
- Do not add information that isn't in the original text
- Be factual and objective
- Use clear, simple language

Respond in the following JSON format:
{
  "title": "Your title here",
  "summary": "Your summary here",
  "keywords": ["keyword1", "keyword2", "keyword3"],
  "sentiment": "positive/negative/neutral/mixed"
}`;
}

/**
 * Parse and validate LLM response
 */
function parseLLMResponse(response: string): SummarizeResponse {
  try {
    // Extract JSON from response (handle markdown code blocks if present)
    let jsonString = response.trim();
    
    // Remove markdown code blocks if present
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (jsonString.startsWith('```')) {
      jsonString = jsonString.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    const parsed = JSON.parse(jsonString);
    
    // Validate required fields
    if (!parsed.title || !parsed.summary || !parsed.keywords || !parsed.sentiment) {
      throw new Error('Missing required fields in LLM response');
    }
    
    // Validate sentiment value
    const validSentiments = ['positive', 'negative', 'neutral', 'mixed'];
    if (!validSentiments.includes(parsed.sentiment)) {
      parsed.sentiment = 'neutral'; // Default to neutral if invalid
    }
    
    // Ensure keywords is an array
    if (!Array.isArray(parsed.keywords)) {
      parsed.keywords = [];
    }
    
    return {
      title: String(parsed.title),
      summary: String(parsed.summary),
      keywords: parsed.keywords.map((k: any) => String(k)),
      sentiment: parsed.sentiment as 'positive' | 'negative' | 'neutral' | 'mixed'
    };
    
  } catch (error) {
    console.error('Failed to parse LLM response:', error);
    throw new ApiError(
      ErrorCodes.LLM_SERVICE_ERROR.status,
      ErrorCodes.LLM_SERVICE_ERROR.code,
      'Failed to parse LLM response into required format',
      error instanceof Error ? error.message : 'Unknown parsing error'
    );
  }
}

/**
 * Main summarization function
 * Sends text to Hugging Face LLM and returns structured summary
 */
export async function summarizeText(text: string): Promise<SummarizeResponse> {
  try {
    // Validate token count
    validateTokenCount(text);
    
    // Build prompt
    const prompt = buildSummarizationPrompt(text);
    
    // Call Hugging Face API
    // Using a capable model for text generation
    const response = await hf.textGeneration({
      model: 'mistralai/Mistral-7B-Instruct-v0.2',
      inputs: prompt,
      parameters: {
        max_new_tokens: 500,
        temperature: 0.7,
        top_p: 0.95,
        return_full_text: false
      }
    });
    
    // Extract generated text
    const generatedText = response.generated_text;
    
    // Parse and validate response
    const result = parseLLMResponse(generatedText);
    
    return result;
    
  } catch (error) {
    // If it's already an ApiError, rethrow it
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Handle Hugging Face API errors
    console.error('Hugging Face API error:', error);
    
    if (error instanceof Error) {
      if (error.message.includes('rate limit') || error.message.includes('429')) {
        throw new ApiError(
          ErrorCodes.LLM_SERVICE_UNAVAILABLE.status,
          ErrorCodes.LLM_SERVICE_UNAVAILABLE.code,
          ErrorCodes.LLM_SERVICE_UNAVAILABLE.message,
          'Rate limit exceeded. Please try again later.'
        );
      }
      
      if (error.message.includes('model') || error.message.includes('loading')) {
        throw new ApiError(
          ErrorCodes.LLM_SERVICE_UNAVAILABLE.status,
          ErrorCodes.LLM_SERVICE_UNAVAILABLE.code,
          ErrorCodes.LLM_SERVICE_UNAVAILABLE.message,
          'Model is loading. Please retry in a few moments.'
        );
      }
    }
    
    // Generic LLM service error
    throw new ApiError(
      ErrorCodes.LLM_SERVICE_ERROR.status,
      ErrorCodes.LLM_SERVICE_ERROR.code,
      ErrorCodes.LLM_SERVICE_ERROR.message,
      error instanceof Error ? error.message : 'Unknown error'
    );
  }
}
