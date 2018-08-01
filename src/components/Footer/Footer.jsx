import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

const Footer = props => {
  return (
    <footer className="page-footer d-none d-lg-block fixed-bottom bg-dark font-small h-15 pt-4 ">
      <div className="container text-center text-md-left">
        <div className="row py-3 d-flex align-items-center">
          <div className="col-md-8 col-lg-8">
            <p className=" text-center text-secondary text-md-left">
              © 2018 Copyright:
              <Link to="/" className="text-white" style={{textDecoration:"none"}}>
                <strong> PRO.GG</strong>
              </Link>
            </p>
          </div>
          <div className="col-md-4 col-lg-4 ml-lg-0">
            <div className="text-center text-md-right">
              <ul className="list-unstyled list-inline">
                <li className="list-inline-item">
                  <Link
                    to="#"
                    className="btn-secondary btn-sm rgba-white-slight mx-1"
                  >
                    <i className="fab fa-facebook-f" />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link
                    to="#"
                    className="btn-secondary btn-sm rgba-white-slight mx-1"
                  >
                    <i className="fab fa-twitter" />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link
                    to="#"
                    className="btn-secondary btn-sm rgba-white-slight mx-1"
                  >
                    <i className="fab fa-github" />
                  </Link>
                </li>
                <li className="list-inline-item">
                  <Link
                    to="#"
                    className="btn-secondary btn-sm rgba-white-slight mx-1"
                  >
                    <i className="fab fa-linkedin-in" />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
