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

mongoose
  .connect(MONGO_URL)
  .then(() => console.log("MongoDB is  connected successfully"))
  .catch((err) => console.error(err));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);

// Routes
app.use("/api/driver", require("./routes/driverRoutes"));
app.use("/api/bus", require("./routes/busRoutes"));

app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/search", searchRoutes);
app.use("/api/modiweek", modiweekRoutes);
