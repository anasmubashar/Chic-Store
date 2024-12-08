const mongoose = require("mongoose");

const routeLogSchema = new mongoose.Schema({
  routeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Route",
    required: [true, "Route ID is required"]
  },
  eventType: {
    type: String,
    enum: ["route_generated", "route_started", "route_updated", "stop_reached", 
           "route_completed", "route_cancelled", "traffic_update"],
    required: [true, "Event type is required"]
  },
  description: {
    type: String,
    required: [true, "Event description is required"]
  },
  metadata: {
    oldRoute: {
      type: mongoose.Schema.Types.Mixed
    },
    newRoute: {
      type: mongoose.Schema.Types.Mixed
    },
    trafficData: {
      type: mongoose.Schema.Types.Mixed
    },
    reason: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

routeLogSchema.index({ routeId: 1, createdAt: -1 });

module.exports = mongoose.model("RouteLog", routeLogSchema);