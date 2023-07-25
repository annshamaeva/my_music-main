/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  trackId: null,
  source: null,
  favorite: false,
  allTracksId: [],
};

const trackSlice = createSlice({
  name: 'track',
  initialState,
  reducers: {
    setTrackId(state, action) {
      state.trackId = action.payload.trackId || state.trackId;
      state.source = action.payload.source || state.source;
      state.favorite = action.payload.favorite;
    },
    setAllTracksId(state, action) {
      state.allTracksId = action.payload;
    },
    clearTrackId(state) {
      state.trackId = null;
      state.source = null;
      state.favorite = false;
    },
  },
});

export const { setTrackId, setAllTracksId, clearTrackId } = trackSlice.actions;

export default trackSlice.reducer;
