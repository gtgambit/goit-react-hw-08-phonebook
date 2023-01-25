import { createSlice } from '@reduxjs/toolkit';

const filterInitialState = '';
const filtersSlice = createSlice({
  name: 'filter',
  initialState: filterInitialState,
  reducers: {
    filterContact(_, { payload }) {
      return payload;
    },
  },
});

export const { filterContact } = filtersSlice.actions;
export default filtersSlice.reducer;
