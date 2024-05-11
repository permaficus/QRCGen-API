import Router from 'express'
import { handleIncommingRequest } from '@/v1/controller';
import { validateRequest } from '@/v1/middleware/requestValidation';
import { errHandler, pathNotFound } from '@/v1/middleware/errHandler';
export const router = Router();

/**
 * route only handle POST method
 */

router.post('/generate', validateRequest, handleIncommingRequest);
router.use(pathNotFound)
router.use(errHandler)