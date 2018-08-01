import React from "react";
import { Link } from "react-router-dom";
import "./Ladder.css";
import Loading from "../Loading/Loading";

const Ladder = props => {
  function totalLadder() {
    let totalLadder = [];
    let globalCount = 1;
    for (let key in props.ladderList) {
      totalLadder = [
        ...totalLadder,
        ...props.ladderList[key].map((player, idx) => (
          <tr>
            <td className="text-center">{globalCount++}</td>
            <td>
              <Link
                to={`/profile/userName=${player.name}`}
                className="normalLink"
                info={player}
                test="test"
              >
                <img src={player.iconPng} className="iconPng rounded-circle mr-4" />

                {player.name}
              </Link>
            </td>
            <td>{player.tier}</td>
            <td>{player.lp}</td>
            <td>{player.level}</td>
            <td>
              <div>{player.wl}</div>
            </td>
          </tr>
        ))
      ];
    }
    return totalLadder;
  }

  return (
    <div>
      {!props.ladderList.chall ? (
        <Loading />
      ) : (
        <div className="container">
          <table className="table table-dark table-hover mb-0 ">
            <thead className="thead-light">
              <tr>
                <th scope="col" />
                <th scope="col">Summoners</th>
                <th scope="col">Tier</th>
                <th scope="col">LP</th>
                <th scope="col">Level</th>
                <th scope="col">Win Ratio</th>
              </tr>
            </thead>
            <tbody>{totalLadder()}</tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Ladder;
