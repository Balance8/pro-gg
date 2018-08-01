import React from "react";
import { Link } from "react-router-dom";
import "./Loading.css";

const Loading = props => {
  return (
    <div className="container mt-5">
      <h1 className="katGif"> Loading</h1>
      <div className="katGif">
        <img src="http://i.imgur.com/QRUPiHQ.gif" alt="" />
      </div>
    </div>
  );
};

export default Loading;
