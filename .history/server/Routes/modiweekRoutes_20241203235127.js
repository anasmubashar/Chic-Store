const { getCurrentModiweek } = require("../Controllers/modiweekController.js");
const { isAdmin } = require("../Middlewares/AuthMiddleware.js");
const router = require("express").Router();

router.get("/current", getCurrentModiweek);

// Admin routes
router.use(isAdmin);
router.post("/", modiweekController.createModiweek);
router.patch("/:id", modiweekController.updateModiweek);

module.exports = router;
