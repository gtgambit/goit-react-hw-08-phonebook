import React, { lazy, Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Layout from 'Layout/Layout';

import RegisterPage from 'pages/RegisterPage';
import LoginPage from 'pages/LoginPage';
import Loader from 'components/Loader/Loader';
import { authUserRequest } from 'redux/User/thunk';

const PageNotFound404 = lazy(() => import('pages/NotFound404'));
const ContactsPage = lazy(() => import('pages/ContactsPage'));

export const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    dispatch(authUserRequest());
  }, [dispatch]);

  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="*" element={<PageNotFound404 />} />
        </Routes>
      </Suspense>
    </Layout>
  );
};
