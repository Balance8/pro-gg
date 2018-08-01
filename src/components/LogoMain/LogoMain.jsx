import React from "react";
import { Link } from "react-router-dom";
import "./LogoMain.css";
import playerService from "../../utils/playerService";

const LogoMain = props => (
  <div className="backGround d-flex flex-column justify-content-center align-items-center">
    <div className="">
      <img
        className="logoMain col-sm-12 mt-5"
        src="https://i.imgur.com/3x66nv8.png"
      />
    </div>
    <div className="search col-sm-12 mt-3">
      <div className="input-group mb-3 shadow-sm">
        <input
          type="text"
          className="form-control"
          placeholder="Username"
          aria-label="Username"
          aria-describedby="basic-addon2"
        />
        <div className="input-group-append">
          <button
            className="btn btn-primary"
            type="button"
            // onClick={playerService.getSummoner({ user: "tsm zven" })}
          >
            GG
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default LogoMain;
