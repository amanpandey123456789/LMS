const Book = require('../models/Book');

const addBook = async (req, res) => {
  const { title, author, genre } = req.body;
  try {
    const newBook = new Book({ title, author, genre });
    await newBook.save();
    res.status(201).json(newBook);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

module.exports = { addBook };
