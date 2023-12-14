import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body bg-primary text-white mailbox-widget pb-0">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h2 className="text-white">MailBox Client</h2>
              <NavLink to="/logout" className="btn btn-dark">
                Logout
              </NavLink>
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
                  INBOX
                </NavLink>
              </li>
              <li className="nav-item nav-spacing">
                <NavLink to="/sent" className="nav-link ml-2">
                  SENT
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
