import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = props => {
  let nav = props.user ? (
    <li
      className="text-white dropdown text-center postion-absolute"
      id="dropdownmobile"
    >
      <span className="NavBar-welcome">Welcome, {props.user.name}</span>
      &nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
      <Link
        className="dropdown-toggle fixed-center text-white"
        to="#"
        id="navbarDropdown"
        role="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
      >
        Profile
      </Link>
      <div
        className="dropdown-menu text-center"
        style={{ marginLeft: "69px" }}
        aria-labelledby="navbarDropdown"
      >
        <Link to="/profile" className="dropdown-item ">
          View Profile
        </Link>
        <Link className="dropdown-item" to="/profile/edit">
          Edit Profile
        </Link>
        <div className="dropdown-divider" />
        <Link to="" className="dropdown-item" onClick={props.handleLogout}>
          LOG OUT
        </Link>
      </div>
      &nbsp;&nbsp;&nbsp;
      <button
        className="btn btn-sm bg-primary text-white"
        onClick={props.handleRefresh}
      >
        Update
      </button>
    </li>
  ) : (
    <li className="text-white dropdown text-center" id="dropdownmobile">
      <Link to="/login" className="btn btn-sm bg-primary text-white">
        LOG IN
      </Link>
      &nbsp;&nbsp;|&nbsp;&nbsp;
      <Link to="/signup" className="btn btn-sm bg-primary text-white">
        SIGN UP
      </Link>
    </li>
  );

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <Link className="navCSS navbar-brand mb-2" to="/">
        PRO.GG
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon" />
      </button>
      <div
        className="collapse navbar-collapse justify-content-end"
        id="navbarSupportedContent"
      >
        <ul className="navbar-nav text-white mb-2">{nav}</ul>
      </div>
    </nav>
  );
};

export default NavBar;
