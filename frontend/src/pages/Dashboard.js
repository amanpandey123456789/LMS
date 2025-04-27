import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { issueBook, returnBook } from '../api';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState('');
  const [selectedMember, setSelectedMember] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
    // Fetch books from backend (for simplicity, let's use a static array for now)
    setBooks([
      { _id: '1', title: 'Book 1', author: 'Author 1', available: 5 },
      { _id: '2', title: 'Book 2', author: 'Author 2', available: 3 },
      // Add more books here
    ]);
  }, [token]);

  const handleIssueBook = async () => {
    try {
      await issueBook({ bookId: selectedBook, memberId: selectedMember });
      alert('Book issued successfully');
    } catch (error) {
      alert('Error issuing book');
    }
  };

  const handleReturnBook = async (issueId) => {
    try {
      await returnBook(issueId, { returnDate });
      alert('Book returned successfully');
    } catch (error) {
      alert('Error returning book');
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <div>
          <h2 className="text-xl font-semibold mb-2">Issue Book</h2>
          <div className="mb-4">
            <select
              onChange={(e) => setSelectedBook(e.target.value)}
              className="p-2 border rounded"
            >
              <option value="">Select Book</option>
              {books.map((book) => (
                <option key={book._id} value={book._id}>
                  {book.title} - {book.author}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={selectedMember}
              onChange={(e) => setSelectedMember(e.target.value)}
              placeholder="Enter Member ID"
              className="p-2 border rounded"
            />
          </div>
          <button
            onClick={handleIssueBook}
            className="bg-blue-500 text-white p-2 rounded"
          >
            Issue Book
          </button>
        </div>

        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Return Book</h2>
          <div className="mb-4">
            <input
              type="text"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              placeholder="Return Date (YYYY-MM-DD)"
              className="p-2 border rounded"
            />
          </div>
          <button
            onClick={() => handleReturnBook('1')} // Pass actual issue ID here
            className="bg-blue-500 text-white p-2 rounded"
          >
            Return Book
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;