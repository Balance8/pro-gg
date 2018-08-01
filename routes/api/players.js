var express = require("express");
var router = express.Router();
var Player = require("../../models/player");
var playersCtrl = require("../../controllers/players");

/*---------- Public Routes ----------*/
router.get("/ladder", playersCtrl.getLadder2);
router.post("/refresh", playersCtrl.refresh);
router.post("/getSummoner", playersCtrl.getSummoner);


/*---------- Protected Routes ----------*/

module.exports = router;
