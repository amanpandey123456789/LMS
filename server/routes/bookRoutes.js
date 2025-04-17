const express = require('express');
const { addBook, issueBook, returnBook } = require('../controllers/bookController');

const router = express.Router();

router.post('/add', addBook);

module.exports = router;