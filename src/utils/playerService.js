import playerAPI from "./playerAPI";

function refresh(player) {
  return playerAPI.refresh(player);
}

function getSummoner(player) {
  return playerAPI.getSummoner(player);
}

export default {
  refresh,
  getSummoner
};
