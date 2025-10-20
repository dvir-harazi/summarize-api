import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

export const config = {
  port: parseInt(process.env.PORT || '3000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  huggingfaceApiToken: process.env.HUGGINGFACE_API_TOKEN || '',
  maxRequestSize: process.env.MAX_REQUEST_SIZE || '10mb'
};

// Validate required environment variables
if (!config.huggingfaceApiToken) {
  console.error('ERROR: HUGGINGFACE_API_TOKEN is not set in environment variables');
  process.exit(1);
}
