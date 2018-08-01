const API = {
  fetchLadder2: function() {
    return fetch("/api/players/ladder", {
      method: "GET"
    }).then(response => response.json());
  }
};

export default API;
