import express from 'express';
import {
  createStudy,
  getStudies
} from '../controllers/studycontroller.js';
import { authenticate } from '../middleware/Authenticate.js';

const router = express.Router();

router.post('/', authenticate,createStudy);
router.get('/getstudy', authenticate, getStudies);

export default router;
