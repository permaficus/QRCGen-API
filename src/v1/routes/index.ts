import Router from 'express'
import { handleIncommingRequest } from '../controller';
import { validateRequest } from '../middleware/requestValidation';
export const router = Router();

/**
 * route only handle POST method
 */

router.post('/generate', validateRequest, handleIncommingRequest)