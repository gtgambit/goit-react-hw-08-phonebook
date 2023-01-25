import ErrorIndicator from 'components/ErrorIndicator/ErrorIndicator';
import Loader from 'components/Loader/Loader';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  selectContacts,
  selectError,
  selectIsLoading,
  selectUserData,
} from 'redux/Contacts/selectors';

import { registerUserRequest } from 'redux/User/thunk';

function RegisterPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const userData = useSelector(selectUserData);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (userData !== null) navigate('/contacts');
  }, [userData, navigate]);

  const handleSubmit = event => {
    event.preventDefault();

    const formData = {
      name,
      email,
      password,
    };
    if (
      contacts.some(
        contact =>
          contact.name === formData.name || contact.email === formData.email
      )
    ) {
      return alert(`${formData.name} is already in contacts.`);
    }
    dispatch(registerUserRequest(formData));
  };

  return (
    <div>
      <h1>Реєстрація</h1>
      {isLoading && <Loader />}
      {error && <ErrorIndicator error={error} />}
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            onChange={e => setName(e.target.value)}
            value={name}
            type="text"
            required
            placeholder="ім`я користувача"
          />
        </label>
        <label>
          Email:
          <input
            onChange={e => setEmail(e.target.value)}
            value={email}
            type="email"
            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            required
            placeholder="поле для ввода пошти"
          />
        </label>
        <label>
          Password:
          <input
            onChange={e => setPassword(e.target.value)}
            value={password}
            type="password"
            pattern=".{7,10}"
            required
            placeholder="min 7 cимволов"
            autoComplete="current-password"
          />
        </label>
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
}

export default RegisterPage;
