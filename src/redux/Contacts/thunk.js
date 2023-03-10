import { createAsyncThunk } from '@reduxjs/toolkit';
import { contactsApi } from 'services/api';

export const requestContacts = createAsyncThunk(
  'contacts/requestContacts',
  async (_, { rejectWithValue }) => {
    try {
      const contacts = await contactsApi.getContactsRequest();
      return contacts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  'contacts/addContact',
  async (newContact, { rejectWithValue }) => {
    try {
      const contacts = await contactsApi.addContactsRequest(newContact);
      return contacts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const removeContact = createAsyncThunk(
  'contacts/removeContact',
  async (contactId, { rejectWithValue }) => {
    try {
      const contacts = await contactsApi.deleteContactRequest(contactId);
      return contacts;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
