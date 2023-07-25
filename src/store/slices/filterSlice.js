/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  filterList: [],
  dateFilter: null,
  performers: [],
  genres: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      state.filterList.push(action.payload);
    },
    setDateFilter(state, action) {
        state.dateFilter = action.payload;
    },
    removeFilter(state, action) {
      state.filterList = state.filterList.filter(
        (item) => item !== action.payload
      );
    },
    clearFilter(state) {
        state.filterList = [];
        state.dateFilter = null;
        state.performers = [];
        state.genres = [];
    },
    setPerformersAndGenres(state, action) {
      state.performers = action.payload.performers;
      state.genres = action.payload.genres;
    },
  },
});

export const { setFilter, removeFilter, setPerformersAndGenres, setDateFilter, clearFilter } = filterSlice.actions;

export default filterSlice.reducer;
