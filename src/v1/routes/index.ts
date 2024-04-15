import Router from 'express'
import { handleIncommingRequest } from '../controller';
export const router = Router();

/**
 * route only handle POST method
 */

router.post('/generate', handleIncommingRequest)