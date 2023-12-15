import { createSlice } from "@reduxjs/toolkit";

const sentSlice = createSlice({
  name: "sent",
  initialState: {
    sent: [],
  },
  reducers: {
    getSent(state, action) {
      const newMail = action.payload;
      const mailIsPresent = state.sent.find((mail) => mail.id === newMail.id);

      if (mailIsPresent) {
        return;
      } else {
        state.sent.push(action.payload);
      }
    },
    clearSent(state) {
      state.sent = [];
    },
  },
});

export const sentActions = sentSlice.actions;

export default sentSlice.reducer;
