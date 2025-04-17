import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginForm from './components/LoginForm';
import Dashboard from './pages/Dashboard';
import BookIssueReturn from './components/BookIssueReturn';
import Home from './pages/Home';
import Register from './pages/Register';

function App() {
    return (
        <div>
              <div className="container">
      <h1 className="main-heading">Library Management System</h1>
    </div>
            <Navbar />
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/issue-return" element={<BookIssueReturn />} />
                <Route path="/home" element={<Home />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </div>
    );
}

export default App;
