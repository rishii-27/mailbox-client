import { createSlice } from "@reduxjs/toolkit";

const inboxSlice = createSlice({
  name: "inbox",
  initialState: {
    inbox: [],
  },
  reducers: {
    getInbox(state, action) {
      const newMail = action.payload;
      const mailIsPresent = state.inbox.find((mail) => mail.id === newMail.id);

      if (mailIsPresent) {
        return;
      } else {
        state.inbox.push(action.payload);
      }
    },
    deleteFromInbox(state, action) {
      const id = action.payload;
      state.inbox = state.inbox.filter((mail) => mail.id !== id);
    },
  },
});

export const inboxActions = inboxSlice.actions;

export default inboxSlice.reducer;
