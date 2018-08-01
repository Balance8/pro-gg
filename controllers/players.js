var request = require("request");
var requestP = require("request-promise-native");
var Player = require("../models/player");
const SECRET = process.env.SECRET;
var KEY = process.env.API_KEY;
const pullNum = 2;
module.exports = {
  getLadder2,
  refresh,
  getAllData,
  getSummoner
};

/* 
Run getLadder: Take Summoner Name push it into(https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${KEY}) 
> Get profileIconId from above api and then get version[0] of ddragon from api(https://na1.api.riotgames.com/lol/static-data/v3/versions?api_key=${KEY}) 
> push both into(http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconId}.png)
> Do this again for the masters API (https://na1.api.riotgames.com/lol/league/v3/masterleagues/by-queue/RANKED_SOLO_5x5?api_key=${KEY})
> sort ALL PLAYERS using (.sort((a, b) => b.lp - a.lp);)
> res.json the sorted players to be rendered on the page


*/

function getLadder2(req, res) {
  Promise.all([getChall(), getMaster()]).then(results => {
    res.json({
      chall: results[0],
      master: results[1]
    });
  });
}

function getChall() {
  var challData = {};
  return new Promise(function(resolve) {
    requestP(
      `https://na1.api.riotgames.com/lol/league/v3/challengerleagues/by-queue/RANKED_SOLO_5x5?api_key=${KEY}`
    )
      .then(body => {
        var players = JSON.parse(body).entries;

        challData = players.map(body => ({
          playerId: body.playerOrTeamId,
          name: body.playerOrTeamName,
          lp: body.leaguePoints,
          win: body.wins,
          loss: body.losses,
          wl: ((body.wins / (body.wins + body.losses)) * 100).toFixed() + "%",
          tier: "Challenger"
        }));
        challData = challData.sort((a, b) => b.lp - a.lp);
        var iconIdArr = [];
        for (let i = 0; i < pullNum; i++) {
          iconIdArr.push(
            requestP(
              `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${
                challData[i].name
              }?api_key=${KEY}`
            )
          );
        }
        return Promise.all(iconIdArr);
        // resolve(challData);
      })
      .then(results => {
        results.forEach((result, idx) => {
          var players = JSON.parse(result);
          challData[idx].iconId = players.profileIconId;
          challData[idx].level = players.summonerLevel;
          challData[idx].accountId = players.accountId;
        });
        var versionId = "8.11.1";
        return versionId;
      })
      .then(versionId => {
        var iconPicArr = [];
        for (let i = 0; i < pullNum; i++) {
          iconPicArr.push(
            `http://ddragon.leagueoflegends.com/cdn/${versionId}/img/profileicon/${
              challData[i].iconId
            }.png`
          );
        }
        return Promise.all(iconPicArr);
      })
      .then(results => {
        results.forEach((result, idx) => {
          challData[idx].iconPng = result;
        });
        resolve(challData);
      });
  });
}

function getMaster() {
  var masterData = {};
  return new Promise(function(resolve) {
    requestP(
      `https://na1.api.riotgames.com/lol/league/v3/masterleagues/by-queue/RANKED_SOLO_5x5?api_key=${KEY}`
    )
      .then(body => {
        var players = JSON.parse(body).entries;

        masterData = players.map(body => ({
          playerId: body.playerOrTeamId,
          name: body.playerOrTeamName,
          lp: body.leaguePoints,
          win: body.wins,
          loss: body.losses,
          wl: ((body.wins / (body.wins + body.losses)) * 100).toFixed() + "%",
          tier: "Master"
        }));
        masterData = masterData.sort((a, b) => b.lp - a.lp);
        var iconIdArr = [];
        for (let i = 0; i < pullNum; i++) {
          iconIdArr.push(
            requestP(
              `https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${
                masterData[i].name
              }?api_key=${KEY}`
            )
          );
        }
        return Promise.all(iconIdArr);
        // resolve(masterData);
      })
      .then(results => {
        results.forEach((result, idx) => {
          var players = JSON.parse(result);
          masterData[idx].iconId = players.profileIconId;
          masterData[idx].level = players.summonerLevel;
          masterData[idx].accountId = players.accountId;
        });
        var versionId = "8.11.1";
        return versionId;
      })
      .then(versionId => {
        var iconPicArr = [];
        for (let i = 0; i < pullNum; i++) {
          iconPicArr.push(
            `http://ddragon.leagueoflegends.com/cdn/${versionId}/img/profileicon/${
              masterData[i].iconId
            }.png`
          );
        }
        return Promise.all(iconPicArr);
      })
      .then(results => {
        results.forEach((result, idx) => {
          masterData[idx].iconPng = result;
        });
        resolve(masterData);
      });
  });
}

// (response, body)

//24 refresh cycle for version#
// function getVersion(req, res) {
// https://ddragon.leagueoflegends.com/api/versions.json
// }

function refresh(req, res) {
  Player.remove().then(() => {
    Player.create(req.body)
      .then(player => {
        res.json(player);
      })
      .catch(err => res.status(400).json(err));
  });
}

function getAllData(req, res) {
  Player.find({}).then(players => {
    res.json(players).status(200);
  });
}

function getSummoner(req, res) {
  console.log(req);
  Player.findOne({ name: req.body.name })
    .exec()
    .then(player => {
      console.log(player);
      res.json(player);
    })
    .catch(err => res.status(401).json(err));
}
