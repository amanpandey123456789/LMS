import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await axios.get(`/api/books?search=${search}`);
      setBooks(response.data);
    };
    fetchBooks();
  }, [search]);

  return (
    <div>
      <input
        type="text"
        placeholder="Search books"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div>
        {books.map((book) => (
          <div key={book._id}>
            <h3>{book.title}</h3>
            <p>{book.author}</p>
            <button>Issue</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BookList;
