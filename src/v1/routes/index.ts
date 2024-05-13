import Router from 'express'
import { handleIncommingRequest } from '@/v1/controller';
import { validateRequest } from '@/v1/middleware/requestValidation';

export const router = Router();

/**
 * route only handle POST method
 */

router.post('/generate', validateRequest, handleIncommingRequest);
router.get('/download/:filename', handleIncommingRequest)