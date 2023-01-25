import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './ContactForm.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { addContact } from 'redux/Contacts/thunk';

const contacts = useSelector(state => state.contact.ContactForm);
const dispatch = useDispatch();

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = event => {
    const { name, value } = event.target;
    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formData = {
      name,
      email,
      password,
    };
    if (contacts.some(contact => contact.name === formData.name)) {
      return alert(`${formData.name} is already in contacts.`);
    }
    dispatch(addContact(formData));
    reset();
  };

  const reset = () => {
    setName('');
    setEmail('');
    setPassword('');
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
          />
        </label>
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
        <button type="submit">Зареєструватися</button>
      </form>
    </div>
  );
};

ContactForm.propTypes = {
  handleAddContact: PropTypes.func,
};
