import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth";
import inboxReducer from "./inbox";
import sentReducer from "./sent";

const store = configureStore({
  reducer: {
    auth: authReducer,
    inbox: inboxReducer,
    sent: sentReducer,
  },
});

export default store;
