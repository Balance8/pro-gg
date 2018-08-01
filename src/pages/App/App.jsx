import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import "./App.css";
import SignupPage from "../SignupPage/SignupPage";
import LoginPage from "../LoginPage/LoginPage";
import userService from "../../utils/userService";
import playerService from "../../utils/playerService";
import RootPage from "../RootPage/RootPage";
import LadderPage from "../LadderPage/LadderPage";
import ProfilePage from "../ProfilePage/ProfilePage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleLogout = () => {
    userService.logout();
    this.setState({ user: null });
  };

  handleSignup = () => {
    this.setState({ user: userService.getUser() });
  };

  handleLogin = () => {
    this.setState({ user: userService.getUser() });
  };

  handleProfile = () => {
    this.setState({ player: playerService.getSummoner() });
  };

  // handleLoad = e => {
  //   this.setState({ player: playerService.getPlayer() });
  // };

  /*---------- Lifecycle Methods ----------*/

  componentDidMount() {
    let user = userService.getUser();
    this.setState({ user });
  }

  render() {
    return (
      <div>
        <Router>
          <Switch>
            <Route
              exact
              path="/"
              render={props => (
                <RootPage
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/ladder"
              render={props => (
                <LadderPage
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                  // handleLoad={this.handleLoad}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/profile/userName=:profile_id"
              render={props => (
                <ProfilePage
                  user={this.state.user}
                  handleLogout={this.handleLogout}
                  profile_id={props.match.params.profile_id}
                  {...props}
                />
              )}
            />
            <Route
              exact
              path="/signup"
              render={props =>
                this.state.user ? (
                  <Redirect to="/" />
                ) : (
                  <SignupPage {...props} handleSignup={this.handleSignup} />
                )
              }
            />

            <Route
              exact
              path="/login"
              render={props =>
                this.state.user ? (
                  <Redirect to="/" />
                ) : (
                  <LoginPage {...props} handleLogin={this.handleLogin} />
                )
              }
            />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
