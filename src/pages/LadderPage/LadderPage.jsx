import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./LadderPage.css";
import NavBar from "../../components/NavBar/NavBar";
import Ladder from "../../components/Ladder/Ladder";
import API from "../../api/api";
import DataBar from "../../components/DataBar/DataBar";
import playerService from "../../utils/playerService";

class LadderPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ladderList: []
    };
  }

  handleRefresh = e => {
    e.preventDefault();
    playerService
      .refresh(this.state.ladderList)
      // successfully signed up - show GamePage
      // .then(state => {        
      //   // this.setState({ player: state });
      //   this.props.history.push("/ladder");
      // })
      // invalid player data
     
    
  };

  /*---------- Lifecycle Methods ----------*/

  componentDidMount() {
    API.fetchLadder2().then(data => {
      this.setState({
        ladderList: data
      });
    });
  }

  render() {
    return (
      <div>
        <NavBar
          ladderList={this.state.ladderList}
          user={this.props.user}
          handleLogout={this.props.handleLogout}
          handleRefresh={this.handleRefresh}
        />
        <DataBar {...this.props} />
        <Ladder ladderList={this.state.ladderList} />
      </div>
    );
  }
}

export default LadderPage;
