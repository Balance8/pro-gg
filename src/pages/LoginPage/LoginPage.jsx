import React from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./LoginPage.css";
import NavBar from "../../components/NavBar/NavBar";

const LoginPage = props => {
  return (
    <div>
      <NavBar />
      <LoginForm className="LoginPage" {...props} />
    </div>
  );
};

export default LoginPage;
