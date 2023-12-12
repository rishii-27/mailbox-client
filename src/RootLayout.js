import React from "react";
import { Outlet } from "react-router-dom";
import Welcome from "./Components/NavBar";
import SignUp from "./Components/SignUp";
import { useSelector } from "react-redux";

const RootLayout = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLogin);

  return (
    <>
      {isLoggedIn && <Welcome />}
      {!isLoggedIn && <SignUp />}
      <Outlet />
    </>
  );
};

export default RootLayout;
