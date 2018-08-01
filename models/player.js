var mongoose = require("mongoose");

var playerSchema = new mongoose.Schema(
  {
    accountId: Number,
    iconId: Number,
    iconPng: String,
    level: Number,
    loss: Number,
    lp: Number,
    name: String,
    playerId: String,
    tier: String,
    win: Number,
    wl: String
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("Player", playerSchema);
