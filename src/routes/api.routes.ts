import { Router } from 'express';
import { summarizeController } from '../controllers/summarize.controller';

const router = Router();

/**
 * POST /api/summarize
 * Accepts text and returns a structured summary
 */
router.post('/summarize', summarizeController);

export default router;
