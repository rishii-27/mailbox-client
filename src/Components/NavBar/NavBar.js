import React from "react";
import "../NavBar/NavBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { inboxActions } from "../../Redux/inbox";
import { authActions } from "../../Redux/auth";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const inbox = useSelector((state) => state.inbox.inbox);
  const sent = useSelector((state) => state.sent.sent);

  const logoutHandle = () => {
    dispatch(authActions.logout());
    dispatch(inboxActions.clearInbox());
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
                  INBOX ({inbox.length})
                </NavLink>
              </li>
              <li className="nav-item nav-spacing">
                <NavLink to="/sent" className="nav-link ml-2">
                  SENT ({sent.length})
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
