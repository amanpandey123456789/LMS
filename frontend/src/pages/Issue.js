import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Issue = () => {
  const [books, setBooks] = useState([]);
  const [members, setMembers] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const booksRes = await axios.get('/api/books');
      const membersRes = await axios.get('/api/members');
      setBooks(booksRes.data);
      setMembers(membersRes.data);
    };
    fetchData();
  }, []);

  const handleIssue = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/issue/issue', {
        bookId: selectedBook,
        memberId: selectedMember,
      });
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Error issuing book');
    }
  };

  return (
    <div className="container">
      <h2>Issue Book</h2>
      {message && <p>{message}</p>}
      <form onSubmit={handleIssue}>
        <div>
          <label>Select Book:</label>
          <select
            value={selectedBook}
            onChange={(e) => setSelectedBook(e.target.value)}
            required
          >
            <option value="">-- Select a Book --</option>
            {books.map((book) => (
              <option key={book._id} value={book._id}>
                {book.title} ({book.availableCopies} available)
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Select Member:</label>
          <select
            value={selectedMember}
            onChange={(e) => setSelectedMember(e.target.value)}
            required
          >
            <option value="">-- Select a Member --</option>
            {members.map((member) => (
              <option key={member._id} value={member._id}>
                {member.name}
              </option>
            ))}
          </select>
        </div>

        <button type="submit">Issue Book</button>
      </form>
    </div>
  );
};

export default Issue;