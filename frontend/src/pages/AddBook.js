import React, { useState } from 'react';

const AddBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !author) {
      setError('Both fields are required');
      return;
    }
    // Logic to add the book (e.g., API call)
    console.log('Book added:', { title, author });
    // Reset form
    setTitle('');
    setAuthor('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} aria-label="Add Book Form">
      <h2>Add New Book</h2>
      {error && <p className="error">{error}</p>}
      <input
        type="text"
        placeholder="Book Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
        required
        aria-label="Book Title"
      />
      <input
        type="text"
        placeholder="Author"
        value={author}
        onChange={e => setAuthor(e.target.value)}
        required
        aria-label="Author"
      />
      <button type="submit">Add Book</button>
    </form>
  );
};

export default AddBook;
