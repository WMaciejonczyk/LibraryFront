import React from 'react';
import logo from './logo.svg';
import './App.css';
import LoginForm from './login-form/LoginForm';
import BookList from './book-list/BookList';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './home-page/HomePage';
import RentalList from './rental-list/RentalList';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/homepage" element={<HomePage />}>
        <Route path="booklist" element={<BookList />} />
        <Route path="rentallist" element={<RentalList />} />
      </Route>
      <Route path="*" element={<h1>404</h1>} />
    </Routes>
  );
}

export default App;
