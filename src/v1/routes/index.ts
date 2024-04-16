import Router from 'express'
import { handleIncommingRequest } from '../controller';
import { validateRequest } from '../middleware/requestValidation';
import { errHandler, pathNotFound } from '../middleware/errHandler';
export const router = Router();

/**
 * route only handle POST method
 */

router.post('/generate', validateRequest, handleIncommingRequest);
router.use(pathNotFound)
router.use(errHandler)