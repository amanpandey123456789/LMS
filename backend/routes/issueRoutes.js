import express from 'express';
import { issueBook, returnBook } from '../controllers/issueController.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/issue', authMiddleware, issueBook);
router.put('/return/:issueId', authMiddleware, returnBook);

export default router;
