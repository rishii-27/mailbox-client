import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const emailRef = useRef();
  const [alert, setAlert] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDB9sJXQnrF4L1Rc-wgk2Oqx7BqsN42eBI`,
        {
          method: "POST",
          body: JSON.stringify({
            requestType: "PASSWORD_RESET",
            email: emailRef.current.value,
          }),
        }
      );

      if (response.ok) {
        setAlert(true);
      }

      const data = await response.json();
      console.log(data);

      emailRef.current.value = "";
    } catch (error) {
      console.error("Error during password reset:", error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="card">
          <div className="card-body">
            <h3 className="card-title text-center mb-4">Forgot Password</h3>
            {alert && (
              <div className="alert alert-success" role="alert">
                Password link sent to your registered Email Id
              </div>
            )}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  ref={emailRef}
                  required
                />
              </div>
              {alert ? (
                <button
                  type="button"
                  className="btn btn-primary btn-block mt-2"
                  disabled
                >
                  Send Link
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary btn-block mt-2"
                >
                  Send Link
                </button>
              )}
            </form>
            <div className="text-center mt-3">
              <Link to="/">Remember your password? Log in here</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
