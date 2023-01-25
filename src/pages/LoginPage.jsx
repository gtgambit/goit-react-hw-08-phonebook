import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Loader from 'components/Loader/Loader';
import ErrorIndicator from 'components/ErrorIndicator/ErrorIndicator';

import { loginUserRequest } from 'redux/User/thunk';
import {
  selectError,
  selectIsLoading,
  selectUserData,
} from 'redux/Contacts/selectors';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoading = useSelector(selectIsLoading);
  const userData = useSelector(selectUserData);
  const error = useSelector(selectError);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userData !== null) navigate('/contacts');
  }, [userData, navigate]);

  const handleSubmit = event => {
    event.preventDefault();

    const formData = {
      email,
      password,
    };

    dispatch(loginUserRequest(formData));
  };

  return (
    <div>
      <h1>Логін</h1>
      {isLoading && <Loader />}
      {error && <ErrorIndicator error={error} />}
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            required
          />
        </label>
        <label>
          Password:
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            required
          />
        </label>
        <button disabled={isLoading} type="submit">
          Увійти
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
