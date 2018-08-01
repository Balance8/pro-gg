import React, { Component } from "react";
import { Link } from "react-router-dom";
import userService from "../../utils/userService";

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      pw: "",
      hasError: false
    };
  }

  handleChange = (field, e) => {
    this.setState({
      // Using ES2015 Computed Property Names
      [field]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    userService
      .login(this.state)
      .then(() => {
        this.props.handleLogin();
        this.props.history.push("/");
      })
      // invalid credentials - don't alert in YOUR app :)
      .catch(err => this.setState({ hasError: `Invalid Username/Password` }));
  };

  render() {
    let err = this.state.hasError ? (
      <h3 className="alert alert-danger">{this.state.hasError}</h3>
    ) : (
      ""
    );
    return (
      <form
        className="form-signin "
        style={{
          margin: "auto",
          width: "90%",
          marginTop: "100px",
          maxWidth: "500px"
        }}
        onSubmit={this.handleSubmit}
      >
        {err}
        <h2 className="header-footer text-center">Log In</h2>
        <div className="form-group">
          <div className="col-sm-12">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={this.state.email}
              onChange={e =>
                this.handleChange("email", e) ||
                this.setState({ hasError: false })
              }
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={this.state.pw}
              onChange={e =>
                this.handleChange("pw", e) || this.setState({ hasError: false })
              }
            />
          </div>
        </div>
        <div className="form-group">
          <div className="col-sm-12 text-center">
            <button className="btn btn-primary">Log In</button>&nbsp;&nbsp;&nbsp;
            <Link to="/">Cancel</Link>
          </div>
        </div>
      </form>
    );
  }
}

export default LoginForm;
