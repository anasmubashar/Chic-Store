const { Signup, Login } = require("../Controllers/AuthController");
const router = require("express").Router();
const { userVerification } = require("../Middlewares/AuthMiddleware");
router.post("/signup", Signup);
router.post("/login", Login);

router.post("/", userVerification, (req, res) => {
  // At this point, req.user is guaranteed to be a valid user
  res.json({ status: true, message: "Access granted", user: req.user });
});

module.exports = router;

module.exports = router;
