import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

// Register User
export const registerUser = (data) => {
  return axios.post(`${API_URL}/auth/register`, data);
};

// Login User
export const loginUser = (data) => {
  return axios.post(`${API_URL}/auth/login`, data);
};

// Issue Book
export const issueBook = (data) => {
  const token = localStorage.getItem('token');
  return axios.post(`${API_URL}/issues/issue`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Return Book
export const returnBook = (issueId, data) => {
  const token = localStorage.getItem('token');
  return axios.put(`${API_URL}/issues/return/${issueId}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
