const express = require('express');
const { issueBook, returnBook } = require('../controllers/transactionController');
const authMiddleware = require('../middleware/auth');
const { adminCheck } = require('../middleware/roleCheck');

const router = express.Router();

router.post('/issue', authMiddleware, issueBook);
router.post('/return', authMiddleware, returnBook);

module.exports = router;
