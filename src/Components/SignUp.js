import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const SignUp = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const navigate = useNavigate();

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandle = (e) => {
    e.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    // Check if ref exists before accessing value
    const enteredConfirmPassword = confirmpasswordInputRef.current
      ? confirmpasswordInputRef.current.value
      : "";

    if (!isLogin) {
      if (enteredPassword === enteredConfirmPassword) {
        fetch(
          `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyD1K-dIUqrst1fC86i8auiSHQMxoS666h4`,
          {
            method: "POST",
            body: JSON.stringify({
              email: enteredEmail,
              password: enteredPassword,
              returnSecureToken: true,
            }),
          }
        )
          .then((res) => res.json())
          .then((data) => {
            if (data.error) {
              alert(data.error.message);
            } else {
              console.log("User has successfully signed up", data);

              emailInputRef.current.value = "";
              passwordInputRef.current.value = "";
              confirmpasswordInputRef.current.value = "";

              alert("Sign up successful!");
            }
          });
      } else {
        alert("Enter Valid Details");
      }
    } else {
      fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyD1K-dIUqrst1fC86i8auiSHQMxoS666h4`,
        {
          method: "POST",
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.error) {
            alert(data.error.message);
          } else {
            emailInputRef.current.value = "";
            passwordInputRef.current.value = "";

            localStorage.setItem("idToken", data.idToken);
            localStorage.setItem("email", data.email);

            navigate("/welcome");

            console.log("User has successfully logged in", data);
          }
        })
        .catch((error) => console.error("Error during login:", error));
    }
  };
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-sm-10 col-md-8 col-lg-6">
          <div className="card p-4">
            <h1 className="text-center mb-4">
              {isLogin ? "Login" : "Sign Up"}
            </h1>
            <form onSubmit={submitHandle}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="form-control"
                  ref={emailInputRef}
                  required
                />
              </div>
              <div className={isLogin ? "mb-0" : "mb-3"}>
                <label htmlFor="password" className="form-label">
                  Your Password
                </label>
                <input
                  type="password"
                  id="password"
                  className="form-control"
                  ref={passwordInputRef}
                  required
                />
              </div>
              {!isLogin && (
                <div className="mb-3">
                  <label htmlFor="cnfpassword" className="form-label">
                    confirm Password
                  </label>
                  <input
                    type="password"
                    id="cnfpassword"
                    className="form-control"
                    ref={confirmpasswordInputRef}
                    required
                  />
                </div>
              )}
              {isLogin && (
                <Link to="/forgetPassword" className="btn btn-link">
                  Forget password
                </Link>
              )}
              <div className="d-grid">
                <button className="btn btn-primary">
                  {isLogin ? "Login" : "Create Account"}
                </button>
              </div>
              <div className="text-center mt-3">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={switchAuthModeHandler}
                >
                  {isLogin
                    ? "Create a new account"
                    : "Login with an existing account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
