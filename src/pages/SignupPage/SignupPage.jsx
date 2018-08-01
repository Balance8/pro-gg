import React, { Component } from "react";
import SignupForm from "../../components/SignupForm/SignupForm";
import "./SignupPage.css";
import NavBar from "../../components/NavBar/NavBar";

class SignupPage extends Component {
  constructor(props) {
    super(props);
    this.state = { message: "" };
  }

  updateMessage = msg => {
    this.setState({ message: msg });
  };

  render() {
    return (
      <div>
        <NavBar />
        <SignupForm
          
          {...this.props}
          updateMessage={this.updateMessage}
          handleSignup={this.props.handleSignup}
        />
        <p>{this.state.message}</p>
      </div>
    );
  }
}

export default SignupPage;
