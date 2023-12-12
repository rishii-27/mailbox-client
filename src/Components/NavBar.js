import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card">
          <div className="card-body bg-primary text-white mailbox-widget pb-0">
            <h2 className="text-white pb-3">MailBox Client</h2>
            <ul
              className="nav nav-tabs custom-tab border-bottom-0 mt-4"
              id="myTab"
              role="tablist"
            >
              <li className="nav-item">
                <NavLink to="/" className="nav-link ">
                  INBOX
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/sent" className="nav-link">
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
