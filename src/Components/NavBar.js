import React, { useEffect, useState } from "react";
import "./NavBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { authActions } from "../Redux/auth";
import { inboxActions } from "../Redux/inbox";
import { sentActions } from "../Redux/sent";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inboxCount, setInboxCount] = useState();
  const [sendCount, setSendCount] = useState();

  const clean_UserEmail = localStorage
    .getItem("email")
    .replace("@", "")
    .replace(".", "");

  useEffect(() => {
    const fetchInbox = async () => {
      const response1 = await fetch(
        `https://mailbox-client-a1bb4-default-rtdb.firebaseio.com/${clean_UserEmail}/inbox.json`,
        {
          method: "GET",
        }
      );
      const response2 = await fetch(
        `https://mailbox-client-a1bb4-default-rtdb.firebaseio.com/${clean_UserEmail}/send.json`,
        {
          method: "GET",
        }
      );

      const data1 = await response1.json();
      const data2 = await response2.json();

      const inboxCount = Object.keys(data1).length || 0;
      const sentCount = Object.keys(data2).length || 0;

      setInboxCount(inboxCount);
      setSendCount(sentCount);
    };
    fetchInbox();
  }, []);

  const logoutHandle = () => {
    dispatch(authActions.logout());
    dispatch(inboxActions.clearInbox());
    dispatch(sentActions.clearSent());
    navigate("/");
  };
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body bg-primary text-white mailbox-widget pb-0">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="text-white">MailBox Client</h2>
              <button className="btn btn-dark" onClick={logoutHandle}>
                Logout
              </button>
            </div>

            <ul
              className="nav nav-tabs custom-tab border-bottom-0 mt-4"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item nav-spacing">
                <NavLink to="/writemail" className="btn btn-dark">
                  Compose Mail
                </NavLink>
              </li>
              <li className="nav-item nav-spacing">
                <NavLink to="/" className="nav-link ml-2">
                  INBOX ({inboxCount})
                </NavLink>
              </li>
              <li className="nav-item nav-spacing">
                <NavLink to="/sent" className="nav-link ml-2">
                  SENT ({sendCount})
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
