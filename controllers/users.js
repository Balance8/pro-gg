var request = require("request");
var requestP = require("request-promise-native");
var User = require("../models/user");
var jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET;
var KEY = process.env.API_KEY;
const pullNum = 2;
module.exports = {
  signup,
  login,
  getLadder
};

/* 
Run getLadder: Take Summoner Name push it into(https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/${summonerName}?api_key=${KEY}) 
> Get profileIconId from above api and then get version[0] of ddragon from api(https://na1.api.riotgames.com/lol/static-data/v3/versions?api_key=${KEY}) 
> push both into(http://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${iconId}.png)
> Do this again for the masters API (https://na1.api.riotgames.com/lol/league/v3/masterleagues/by-queue/RANKED_SOLO_5x5?api_key=${KEY})
> sort ALL PLAYERS using (.sort((a, b) => b.lp - a.lp);)
> res.json the sorted players to be rendered on the page


*/

function getLadder(req, res) {
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
          wl: (body.wins / (body.wins + body.losses) * 100).toFixed() + "%",
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
          wl: (body.wins / (body.wins + body.losses) * 100).toFixed() + "%",
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

function login(req, res) {
  User.findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (!user) return res.status(401).json({ err: "bad credentials" });
      user.comparePassword(req.body.pw, (err, isMatch) => {
        if (isMatch) {
          res.json({ token: createJWT(user) });
        } else {
          return res.status(401).json({ err: "bad credentials" });
        }
      });
    })
    .catch(err => res.status(401).json(err));
}

function signup(req, res) {
  var user = new User(req.body);
  user
    .save()
    .then(user => {
      // TODO: Send back a JWT instead of the user
      res.json({ token: createJWT(user) });
    })
    // User data invalid
    .catch(err => res.status(400).json(err));
}

/*----- Helper Functions -----*/

function createJWT(user) {
  return jwt.sign(
    { user }, // data payload
    SECRET,
    { expiresIn: "24h" }
  );
}
