import React from "react";
import { Link } from "react-router-dom";
import "./RootPage.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import LogoMain from "../../components/LogoMain/LogoMain";
import DataBar from "../../components/DataBar/DataBar";

const RootPage = props => {
  return (
    <div>
      <NavBar
        user={props.user}
        handleLogout={props.handleLogout}
        handleLoad={props.handleLoad}
      />
      <DataBar {...props} />
      <LogoMain />
      <Footer />
    </div>
  );
};

export default RootPage;
