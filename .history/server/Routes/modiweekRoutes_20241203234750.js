const { getCurrentModiweek } = require("../Controllers/modiweekController.js");

const router = require("express").Router();

router.get("/current", getCurrentModiweek);

module.exports = router;
