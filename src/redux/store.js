import { configureStore } from '@reduxjs/toolkit';
import contactsReducer from './Contacts/contactsSlice';
import filterReducer from './Filter/filterSlice';
import userReducer from './User/userSlice';

export const store = configureStore({
  reducer: {
    auth: userReducer,
    contacts: contactsReducer,
    filter: filterReducer,
  },
});
