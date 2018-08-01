import React from "react";
import { Link } from "react-router-dom";
import "./DataBar.css";

const DataBar = props => {
  return (
    <nav
      className=" dataBarCSS navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "#707883" }}
    >
      <ul className="listCSS navbar-nav text-white">
        <li className="text-white">
          <Link
            className={props.match.path === "/" ? "link-selected" : "link"}
            to="/"
          >
            Home
          </Link>
          &nbsp;&nbsp;
          <Link
            to="/ladder"
            className={
              props.match.path === "/ladder" ? "link-selected" : "link"
            }
          >
            Leaderboards
          </Link>
          &nbsp;&nbsp;
          {/* <Link
            to="/profile"
            className={
              props.match.path === "/profile" ? "link-selected" : "link"
            }
          >
            Profile
          </Link> */}
        </li>
      </ul>
    </nav>
  );
};

export default DataBar;
