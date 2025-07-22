import express from 'express';
import {
  createStudy,
  getAllStudies
} from '../controllers/studycontroller.js';

const router = express.Router();

router.post('/', createStudy);
router.get('/getstudy', getAllStudies);
// router.get('/:id', getStudyById);
// router.put('/:id', updateStudy);
// router.delete('/:id', deleteStudy);

export default router;
