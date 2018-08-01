import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Profile.css";
import Loading from "../Loading/Loading";
import NavBar from "../../components/NavBar/NavBar";
import DataBar from "../../components/DataBar/DataBar";
import playerService from "../../utils/playerService";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      player: []
    };
  }

  /*---------- Lifecycle Methods ----------*/

  componentDidMount() {
    playerService.getSummoner({ name: this.props.profile_id }).then(data => {
      this.setState({
        player: data
      });
    });
  }

  render() {
    return (
      <div>
        <div class="container d-flex justify-content-center">
          <div class="d-flex justify-content-center">
            <div class="">
              <img
                src={this.state.player.iconPng}
                alt=""
                className="profilePng rounded-circle"
              />
            </div>
            <div class="col-md-9 p-t-2">
              <h2 class="h2-responsive">
                @{this.state.player.name}{" "}
                <button type="button" class="btn btn-primary">
                  Follow
                </button>
              </h2>
              <p>{this.state.player.name} </p>

              <ul class="flex-menu">
                <li>
                  <strong>{this.state.player.win} </strong> wins
                </li>
                <li>
                  <strong>{this.state.player.lp} </strong> lp
                </li>
                <li>
                  <strong>{this.state.player.tier} </strong> Tier
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
