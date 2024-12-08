const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Your email address is required"],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Your username is required"],
  },
  password: {
    type: String,
    required: [true, "Your password is required"],
  },
  role: {
    type: String,
    default: "customer",
  },
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
  newsletter: { type: Boolean, default: false },
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

// Hash password before saving
userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    // Avoid re-hashing if the password is unchanged
    this.password = await bcrypt.hash(this.password, 12);
  }
});

module.exports = mongoose.model("User", userSchema);
