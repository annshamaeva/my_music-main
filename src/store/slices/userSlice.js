/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userID: localStorage.getItem('userId'),
  access: localStorage.getItem('access'),
  refresh: localStorage.getItem('refresh'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken(state, action) {
      state.access = action.payload.access || state.access;
      state.refresh = action.payload.refresh || state.refresh;
    },
    setUserId(state, action) {
      state.userID = action.payload.userID;
    },
    removeUser(state) {
      state.userID = null;
      state.access = null;
      state.refresh = null;
    },
  },
});

export const { setToken, setUserId, removeUser } = userSlice.actions;

export default userSlice.reducer;
