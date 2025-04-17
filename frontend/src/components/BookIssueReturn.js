import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookIssueReturn = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('/api/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching books:', error);
      }
    };
    fetchBooks();
  }, []);

  const handleIssue = async () => {
    try {
      await axios.post('/api/issue', { bookId: selectedBook });
      alert('Book issued successfully!');
    } catch (error) {
      console.error('Error issuing book:', error);
    }
  };

  const handleReturn = async () => {
    try {
      await axios.post('/api/return', { bookId: selectedBook });
      alert('Book returned successfully!');
    } catch (error) {
      console.error('Error returning book:', error);
    }
  };

  return (
    <div>
      <h2>Issue or Return a Book</h2>
      <select onChange={(e) => setSelectedBook(e.target.value)} value={selectedBook}>
        <option value="">Select a book</option>
        {books.map((book) => (
          <option key={book._id} value={book._id}>
            {book.title}
          </option>
        ))}
      </select>
      <button onClick={handleIssue}>Issue Book</button>
      <button onClick={handleReturn}>Return Book</button>
    </div>
  );
};

export default BookIssueReturn;
