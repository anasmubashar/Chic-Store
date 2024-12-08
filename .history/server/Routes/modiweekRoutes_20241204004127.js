const {
  getCurrentModiweek,
  createModiweek,
  updateModiweek,
} = require("../Controllers/modiweekController.js");
const { isAdmin } = require("../Middlewares/AuthMiddleware.js");
const router = require("express").Router();

router.get("/current", getCurrentModiweek);

// Admin routes
// router.use(isAdmin);
router.post("/", createModiweek);
router.patch("/:id", updateModiweek);

module.exports = router;
