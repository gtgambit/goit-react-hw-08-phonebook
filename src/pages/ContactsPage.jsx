import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Filter from 'components/Filter/Filter';
import WithAuthRedirect from 'components/hoc/WithAuthRedirect';
import ErrorIndicator from 'components/ErrorIndicator/ErrorIndicator';
import Loader from 'components/Loader/Loader';

import {
  addContact,
  removeContact,
  requestContacts,
} from '../redux/Contacts/thunk';

import css from '../App.module.css';
import {
  filteredContacts,
  selectContacts,
  selectIsLoading,
  selectError,
  selectUserData,
} from 'redux/Contacts/selectors';
import { filterContact } from 'redux/Filter/filterSlice';

// UI - User Interface(React)
const ContactsPage = () => {
  const dispatch = useDispatch();

  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const userData = useSelector(selectUserData);
  const filteredContacts = useSelector(filterContact);

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  useEffect(() => {
    if (userData == null) return;
    dispatch(requestContacts());
  }, [userData, dispatch]); // componentDidMount

  const handleSubmit = event => {
    event.preventDefault();

    const formData = {
      name,
      number,
    };
    if (contacts.some(contact => contact.name === formData.name)) {
      return alert(`${formData.name} is already in contacts.`);
    }
    dispatch(addContact(formData));
    setName('');
    setNumber('');
  };

  const handleDeleteContact = contactId => {
    dispatch(removeContact(contactId));
  };

  const hasError = error?.length > 0;
  return (
    <>
      {hasError && <ErrorIndicator error={error} />}
      <div className={css.mainWrapper}>
        <div className={css.list}>
          {isLoading && <Loader />}
          <form onSubmit={handleSubmit}>
            <h3>Додати новий контакт</h3>
            <label>
              Name:
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                type="text"
              />
            </label>
            <label>
              Number:
              <input
                type="tel"
                value={number}
                pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
                title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
                onChange={e => setNumber(e.target.value)}
              />
            </label>
            <br />
            <br />
            <button disabled={isLoading} type="submit">
              Додати контакт
            </button>
          </form>
          <br />
          <h3>Шукати контакт</h3>
          <Filter />
          <h3>Список контактів</h3>
          {Array.isArray(contacts) && contacts.length === 0 && (
            <p>
              У вас відсутні контакти, додайте хочаб один для того, щоб їх
              побачити!
            </p>
          )}
          {Array.isArray(filteredContacts) &&
            filteredContacts.map(contact => {
              return (
                <div key={contact.id} className={css.postItem}>
                  <h3>{contact.name}</h3>
                  <p>{contact.number}</p>
                  <button
                    disabled={isLoading}
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    видалити контакт
                  </button>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
};

const ProtectedContactsPage = WithAuthRedirect(ContactsPage, '/login');

export default ProtectedContactsPage;
