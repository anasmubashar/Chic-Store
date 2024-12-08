const mongoose = require("mongoose");

const mapApiConfigSchema = new mongoose.Schema({
  provider: {
    type: String,
    enum: ["google", "mapbox", "osrm"],
    required: [true, "Map provider is required"],
    unique: true
  },
  apiKey: {
    type: String,
    required: [true, "API key is required"]
  },
  baseUrl: {
      type: String,
      required: [true, "Base URL is required"],
      default: 'https://maps.googleapis.com/maps/api'
  },
  rateLimit: {
    requests: {
      type: Number,
      required: [true, "Rate limit requests count is required"]
    },
    timeWindow: {
      type: Number,
      required: [true, "Rate limit time window is required"]
    }
  },
  isActive: {
    type: Boolean,
    default: true
  },
  lastUsed: {
    type: Date,
    default: Date.now
  },
  requestCount: {
    type: Number,
    default: 0
  },
  settings: {
    useTrafficData: {
      type: Boolean,
      default: true
    },
    preferHighways: {
      type: Boolean,
      default: true
    },
    avoidTolls: {
      type: Boolean,
      default: false
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

mapApiConfigSchema.pre("save", function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model("MapApiConfig", mapApiConfigSchema);