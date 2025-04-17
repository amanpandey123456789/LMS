const Transaction = require('../models/Transaction');
const Book = require('../models/Book');

// 🟢 Define issueBook
const issueBook = async (req, res) => {
  const { userId, bookId } = req.body;
  try {
    const book = await Book.findById(bookId);
    if (!book || !book.available) {
      return res.status(400).json({ msg: 'Book not available' });
    }

    const issueDate = new Date();
    const returnDate = new Date(issueDate);
    returnDate.setDate(returnDate.getDate() + 15); // 15-day return window

    const transaction = new Transaction({
      userId,
      bookId,
      issueDate,
      returnDate,
      fine: 0,
    });

    await transaction.save();

    // Mark book as unavailable
    book.available = false;
    await book.save();

    res.status(201).json(transaction);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
};

// ✅ Make sure returnBook is also defined
const returnBook = async (req, res) => {
  const { transactionId, returnDate: actualReturnDate } = req.body;

  try {
    const transaction = await Transaction.findById(transactionId).populate('bookId');
    if (!transaction) return res.status(404).json({ msg: 'Transaction not found' });

    const dueDate = new Date(transaction.returnDate);
    const returnDateObj = new Date(actualReturnDate);

    let fine = 0;
    if (returnDateObj > dueDate) {
      const daysLate = Math.ceil((returnDateObj - dueDate) / (1000 * 60 * 60 * 24));
      fine = daysLate * 5;
    }

    transaction.returnDate = returnDateObj;
    transaction.fine = fine;
    await transaction.save();

    // Set book as available again
    const book = await Book.findById(transaction.bookId._id);
    book.available = true;
    await book.save();

    res.json({ msg: 'Book returned successfully', fine });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
};

// ✅ Export both
module.exports = { issueBook, returnBook };
