const BASE_URL = "/api/players/";
const Players = "../../models/players";

//database remove and also return not an error orginal works

function refresh(ladderList) {
  fetch(BASE_URL + "refresh", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify([...ladderList.chall, ...ladderList.master])
  }).then(res => {
    console.log(res);
    if (res.ok) return res.json();
    throw new Error("Bad Data");
  });
}
//   return fetch(BASE_URL + "refresh", {
//     method: "POST",
//     headers: new Headers({ "Content-Type": "application/json" }),
//     body: JSON.stringify(ladderList.chall[1])
//   }).then(res => {
//     if (res.ok) return res.json();
//     throw new Error("wtf");
//   });

function getSummoner(player) {
  console.log(player);
  return fetch(BASE_URL + "getSummoner", {
    method: "POST",
    headers: new Headers({ "Content-Type": "application/json" }),
    body: JSON.stringify(player)
  }).then(res => {
    console.log(res);
    if (res.ok) return res.json();
    throw new Error("Bad credentials");
  });
}

export default {
  refresh,
  getSummoner
};
