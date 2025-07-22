import express from 'express';
import {
  createSubject,
  getAllSubjects,
  // getSubjectById,
  // updateSubject,
  // deleteSubject
} from '../controllers/subjectcontroller.js';

const router = express.Router();

router.post('/', createSubject);
router.get('/:siteId', getAllSubjects);
// router.put('/:id', updateSubject);
// router.delete('/:id', deleteSubject);

export default router;
