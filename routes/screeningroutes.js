import express from 'express';
import {
  createVisit,
  // getAllScreenings,
  // getScreeningById,
  // updateScreening,
  // deleteScreening
} from '../controllers/screeningController.js';

const router = express.Router();

router.post('/', createVisit);
// router.get('/', getAllScreenings);
// router.get('/:id', getScreeningById);
// router.put('/:id', updateScreening);
// router.delete('/:id', deleteScreening);

export default router;
