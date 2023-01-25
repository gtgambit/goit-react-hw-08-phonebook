import css from './ContactList.module.css';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { removeContact, requestContacts } from 'redux/Contacts/thunk';

const ContactList = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(state => state.contacts.items);
  const filter = useSelector(state => state.filter);

  const handleDelete = contactId => {
    dispatch(removeContact(contactId));
  };

  useEffect(() => {
    dispatch(requestContacts());
  }, [dispatch]);

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().trim().includes(filter.toLowerCase().trim())
  );

  return (
    <>
      {filteredContacts.length ? (
        <div className={css.contactList}>
          <ul className={css.ul}>
            {filteredContacts.map(({ name, id, number }) => (
              <li key={id}>
                {name}:{number}
                <button onClick={() => handleDelete(id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>No results...</p>
      )}
    </>
  );
};
export default ContactList;

ContactList.propTypes = {
  contactToRender: PropTypes.arrayOf(PropTypes.object),
  deleteContact: PropTypes.func,
};
