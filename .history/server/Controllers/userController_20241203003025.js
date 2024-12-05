import User from "../models/user.js";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = new User({ email, password, name });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.status(201).json({ user, token });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    res.json({ user, token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "email", "birthday"];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
      return res.status(400).json({ error: "Invalid updates" });
    }

    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();

    res.json(req.user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!req.user.wishlist.includes(productId)) {
      req.user.wishlist.push(productId);
      await req.user.save();
    }

    res.json({ message: "Added to wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.params;

    req.user.wishlist = req.user.wishlist.filter(
      (id) => id.toString() !== productId
    );
    await req.user.save();

    res.json({ message: "Removed from wishlist" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
