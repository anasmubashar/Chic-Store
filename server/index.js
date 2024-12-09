const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
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

// Apply CORS middleware first
app.use(
  cors({
    origin: [
      "https://chic-store-mbky-j8umomabc-anasmubashars-projects.vercel.app",
      "https://chic-store-nine.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
