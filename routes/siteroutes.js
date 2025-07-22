import express from 'express';
import {
  createSite,
  getSitesByStudyId,
  // getSiteById,
  // updateSite,
  // deleteSite
} from '../controllers/sitecontroller.js';

const router = express.Router();

router.post('/', createSite);
router.get('/:studyid', getSitesByStudyId);
// router.get('/:id', getSiteById);
// router.put('/:id', updateSite);
// router.delete('/:id', deleteSite);

export default router;
