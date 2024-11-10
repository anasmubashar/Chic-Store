const User = require("./Models/UserModel");

const date = new Date();

User.create({
  email: "khadija@gmail.com",
  username: "khadija",
  role: "admin",
  password: "Khadija123",
  createdAt: date,
});
