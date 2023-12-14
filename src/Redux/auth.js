import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("idToken"),
  isLogin: Boolean(localStorage.getItem("isLoggedIn")),
  email: localStorage.getItem("email"),
};

console.log(initialState);

const authSlice = createSlice({
  name: "authentication",
  initialState: initialState,
  reducers: {
    login(state, actions) {
      const { data } = actions.payload;

      state.token = data.idToken;
      state.isLogin = true;
      state.email = data.email;
      localStorage.setItem("idToken", data.idToken);
      localStorage.setItem("email", data.email);
      localStorage.setItem("isLoggedIn", true);
    },
    logout(state) {
      state.token = "";
      state.isLogin = false;
      state.email = "";
      localStorage.removeItem("idToken");
      localStorage.removeItem("email");
      localStorage.removeItem("isLoggedIn");
    },
  },
});

export const authActions = authSlice.actions;

export default authSlice.reducer;
