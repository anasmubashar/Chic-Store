const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

const app = express();
require("dotenv").config();
const { OAuth2Client } = require("google-auth-library");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const productRoutes = require("./Routes/ProductRoute");
const userRoutes = require("./Routes/UserRoute");
const orderRoutes = require("./Routes/OrderRoute");
const adminRoutes = require("./Routes/AdminRoute");
const cartRoutes = require("./Routes/CartRoute");
const searchRoutes = require("./Routes/searchRoute");
const modiweekRoutes = require("./Routes/modiweekRoutes");
const { MONGO_URL, PORT } = process.env;

const JWT_SECRET = process.env.TOKEN_KEY; // Use an environment variable for the JWT secret
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Apply CORS middleware first
app.use(
  cors({
    origin: [
      `${process.env.FRONTEND_URL}`,
      `${process.env.FRONTEND_DOMAIN}/`,
      "http://localhost:5173",
      "http://localhost:4000",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// Then apply other middleware
app.use(express.json());
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is connected successfully"))
  .catch((err) => console.error(err));

// Define routes
app.use("/", authRoute);
app.use("/api/driver", require("./Routes/driverRoutes"));
app.use("/api/bus", require("./Routes/busRoutes"));
app.use("/api/profile", require("./Routes/profileRoutes"));
app.use("/api/invoices", require("./Routes/invoiceRoutes"));
app.use("/api/delivery/orders", require("./Routes/orderRoutes"));
app.use("/api/assign", require("./Routes/orderAssignmentRoutes"));
app.use("/api/shipment-details", require("./Routes/shipmentRoute"));
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/modiweek", modiweekRoutes);

app.post("/google-auth", async (req, res) => {
  try {
    const { credential } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    const { email, name } = payload;

    // Here, you should check if the user exists in your database
    // If not, create a new user
    // For this example, we'll assume a user object:
    const user = { email, username: name, role: "customer" };

    const token = jwt.sign({ email: user.email, role: user.role }, JWT_SECRET, {
      expiresIn: "1h",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    res.json({ success: true, user: { email: user.email, role: user.role } });
  } catch (error) {
    console.error("Google auth error:", error);
    res
      .status(500)
      .json({ success: false, message: "Error authenticating with Google" });
  }
});
// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
