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
        // If the mail is already present, update its properties
        state.inbox = state.inbox.map((mail) =>
          mail.id === newMail.id ? { ...mail, ...newMail } : mail
        );
      } else {
        // If the mail is not present, add it to the inbox
        state.inbox.push(newMail);
      }
    },
    deleteFromInbox(state, action) {
      const id = action.payload;
      state.inbox = state.inbox.filter((mail) => mail.id !== id);
    },
    clearInbox(state) {
      state.inbox = [];
    },
  },
});

export const inboxActions = inboxSlice.actions;

export default inboxSlice.reducer;
