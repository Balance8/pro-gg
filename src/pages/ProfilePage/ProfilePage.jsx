import React, { Component } from "react";
import SignupForm from "../../components/SignupForm/SignupForm";
import "./ProfilePage.css";
import NavBar from "../../components/NavBar/NavBar";
import DataBar from "../../components/DataBar/DataBar";
import Profile from "../../components/Profile/Profile";
import Footer from "../../components/Footer/Footer";

const ProfilePage = props => {
  return (
    <div>
      <NavBar user={props.user} handleLogout={props.handleLogout} />
      <DataBar {...props} />
      <Profile profile_id={props.match.params.profile_id} {...props} />
      <Footer />
    </div>
  );
};

export default ProfilePage;
