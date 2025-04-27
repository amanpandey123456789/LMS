import Issue from '../models/Issue.js';
import Book from '../models/Book.js';

const FINE_RATE = 5;

const calculateFine = (issueDate, returnDate) => {
  const dayInMs = 24 * 60 * 60 * 1000;
  const overdueDays = Math.floor((returnDate - issueDate) / dayInMs);
  return overdueDays > 0 ? overdueDays * FINE_RATE : 0;
};

export const issueBook = async (req, res) => {
  const { memberId, bookId } = req.body;

  try {
    const book = await Book.findById(bookId);
    if (book.available < 1) {
      return res.status(400).json({ message: 'No copies available' });
    }

    const newIssue = new Issue({ memberId, bookId });
    await newIssue.save();

    book.available -= 1;
    await book.save();

    res.json({ message: 'Book issued successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error issuing book' });
  }
};

export const returnBook = async (req, res) => {
  const { issueId } = req.params;
  const { returnDate } = req.body;

  try {
    const issue = await Issue.findById(issueId).populate('bookId');
    if (!issue) {
      return res.status(404).json({ message: 'Issue record not found' });
    }

    const fine = calculateFine(issue.issueDate, new Date(returnDate));
    issue.returnDate = returnDate;
    issue.returned = true;
    issue.fine = fine;

    const book = await Book.findById(issue.bookId);
    book.available += 1;
    await book.save();

    await issue.save();

    res.json({ message: 'Book returned successfully', fine });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error returning book' });
  }
};