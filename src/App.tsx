import React from 'react';
import './App.css';
import LoginForm from './login-form/LoginForm';
import BookList from './book-list/BookList';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './home-page/HomePage';
import RentalList from './rental-list/RentalList';
import ApiProvider from './api/ApiProvider';
import RentalAdd from './rental-add/RentalAdd';
import BookAdd from './book-add/BookAdd';
import UserAdd from './user-add/UserAdd';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import BookDelete from './book-delete/BookDelete';
import RentalEnd from './rental-end/RentalEnd';
import UserDelete from './user-delete/UserDelete';
import ReviewList from './review-list/ReviewList';
import ReviewAdd from './review-add/ReviewAdd';
import BookDetailsAdd from './book-details-add/BookDetailsAdd';
import BookDetailsList from './book-details-list/BookDetailsList';
import 'bootstrap/dist/css/bootstrap.min.css';
import BookUpdate from './book-update/BookUpdate';
import UserUpdate from './user-update/UserUpdate';

function App() {
  return (
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <ApiProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/homepage" element={<HomePage />}>
              <Route path="booklist" element={<BookList />} />
              <Route path="bookadd" element={<BookAdd />} />
              <Route path="bookdetailslist" element={<BookDetailsList />} />
              <Route path="bookdetailsadd" element={<BookDetailsAdd />} />
              <Route path="bookupdate" element={<BookUpdate />} />
              <Route path="bookdelete" element={<BookDelete />} />
              <Route path="rentallist" element={<RentalList />} />
              <Route path="rentaladd" element={<RentalAdd />} />
              <Route path="rentalend" element={<RentalEnd />} />
              <Route path="useradd" element={<UserAdd />} />
              <Route path="userupdate" element={<UserUpdate />} />
              <Route path="userdelete" element={<UserDelete />} />
              <Route path="reviewlist" element={<ReviewList />} />
              <Route path="reviewadd" element={<ReviewAdd />} />
            </Route>
            <Route path="*" element={<h1>404</h1>} />
          </Routes>
        </ApiProvider>
      </I18nextProvider>
    </BrowserRouter>
  );
}

export default App;
