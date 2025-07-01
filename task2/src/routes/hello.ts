import { Router } from 'express';
import { helloWorld, helloName } from '../controllers/hello.js';
import { authenticateToken } from '../middleware/auth.js';

const router = Router();

router.get('/', helloWorld);
router.get('/:name', authenticateToken, helloName);

export { router as helloRouter };