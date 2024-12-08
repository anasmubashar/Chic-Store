const Route = require('../Models/routeModel');
const Stop = require('../Models/stopModel');
const MapApiConfig = require('../Models/mapApiConfigModel');
const RouteLog = require('../Models/routeLogModel');

class RouteController {
  // Get active map provider configuration
  async getActiveMapProvider() {
    const provider = await MapApiConfig.findOne({ isActive: true });
    if (!provider) {
      throw new Error('No active map provider configured');
    }
    return provider;
  }

  // Generate new route
  async generateRoute(req, res) {
    try {
      const {
        driverId,
        startLocation,
        stops,
        priority = 'normal'
      } = req.body;

      // Get active map provider
      const mapProvider = await this.getActiveMapProvider();

      // Validate rate limits
      if (mapProvider.requestCount >= mapProvider.rateLimit.requests) {
        const timeElapsed = Date.now() - mapProvider.lastUsed;
        if (timeElapsed < mapProvider.rateLimit.timeWindow) {
          throw new Error('Rate limit exceeded');
        }
        mapProvider.requestCount = 0;
      }

      // Calculate optimal route using map provider
      const routeDetails = await this.calculateRoute(mapProvider, startLocation, stops);

      // Create new route
      const route = await Route.create({
        driverId,
        startLocation: {
          type: 'Point',
          coordinates: startLocation.coordinates,
          address: startLocation.address
        },
        status: 'pending',
        totalDistance: routeDetails.distance,
        estimatedDuration: routeDetails.duration,
        priority,
        mapProvider: mapProvider.provider,
        routePolyline: routeDetails.polyline
      });

      // Create stops
      const stopPromises = stops.map((stop, index) => {
        return Stop.create({
          routeId: route._id,
          orderId: stop.orderId,
          location: {
            type: 'Point',
            coordinates: stop.coordinates,
            address: stop.address
          },
          sequence: index + 1,
          estimatedArrival: routeDetails.stopETAs[index],
          deliveryWindow: {
            start: stop.deliveryWindow.start,
            end: stop.deliveryWindow.end
          },
          notes: stop.notes
        });
      });

      await Promise.all(stopPromises);

      // Log route generation
      await RouteLog.create({
        routeId: route._id,
        eventType: 'route_generated',
        description: 'New route generated',
        metadata: {
          newRoute: routeDetails
        }
      });

      // Update map provider usage
      mapProvider.requestCount += 1;
      mapProvider.lastUsed = Date.now();
      await mapProvider.save();

      res.status(201).json({
        success: true,
        data: {
          route,
          stops: await Stop.find({ routeId: route._id }).sort('sequence')
        }
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  // Calculate optimal route using map provider
  async calculateRoute(mapProvider, startLocation, stops) {
    if (mapProvider.provider !== 'google') {
      throw new Error('Only Google Maps integration is supported');
    }

    const waypoints = stops.map(stop => `${stop.coordinates[1]},${stop.coordinates[0]}`).join('|');
    const origin = `${startLocation.coordinates[1]},${startLocation.coordinates[0]}`;
    const destination = `${stops[stops.length - 1].coordinates[1]},${stops[stops.length - 1].coordinates[0]}`;

    const url = `${mapProvider.baseUrl}/directions/json?origin=${origin}&destination=${destination}&waypoints=${waypoints}&key=${mapProvider.apiKey}`;

    try {
      const response = await axios.get(url);
      const data = response.data;

      if (data.status !== 'OK') {
        throw new Error(`Google Maps API error: ${data.error_message}`);
      }

      const route = data.routes[0];
      const leg = route.legs[0];

      return {
        distance: leg.distance.value,
        duration: leg.duration.value,
        polyline: route.overview_polyline.points,
        stopETAs: stops.map((stop, index) => new Date(Date.now() + leg.steps[index].duration.value * 1000))
      };
    } catch (error) {
      throw new Error(`Failed to calculate route: ${error.message}`);
    }
  }
  
  // Get route by ID
  async getRoute(req, res) {
    try {
      const route = await Route.findById(req.params.id);
      if (!route) {
        return res.status(404).json({
          success: false,
          error: 'Route not found'
        });
      }

      const stops = await Stop.find({ routeId: route._id }).sort('sequence');
      
      res.status(200).json({
        success: true,
        data: { route, stops }
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  // Update route
  async updateRoute(req, res) {
    try {
      const route = await Route.findById(req.params.id);
      if (!route) {
        return res.status(404).json({
          success: false,
          error: 'Route not found'
        });
      }

      const mapProvider = await this.getActiveMapProvider();
      const stops = await Stop.find({ routeId: route._id }).sort('sequence');
      
      // Recalculate route with updated information
      const routeDetails = await this.calculateRoute(
        mapProvider,
        route.startLocation,
        stops
      );

      // Store old route details for logging
      const oldRoute = {
        totalDistance: route.totalDistance,
        estimatedDuration: route.estimatedDuration,
        routePolyline: route.routePolyline
      };

      // Update route with new calculations
      route.totalDistance = routeDetails.distance;
      route.estimatedDuration = routeDetails.duration;
      route.routePolyline = routeDetails.polyline;
      await route.save();

      // Log route update
      await RouteLog.create({
        routeId: route._id,
        eventType: 'route_updated',
        description: 'Route recalculated',
        metadata: {
          oldRoute,
          newRoute: routeDetails
        }
      });

      res.status(200).json({
        success: true,
        data: { route, stops }
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }

  // Delete route
  async deleteRoute(req, res) {
    try {
      const route = await Route.findById(req.params.id);
      if (!route) {
        return res.status(404).json({
          success: false,
          error: 'Route not found'
        });
      }

      // Delete associated stops
      await Stop.deleteMany({ routeId: route._id });
      
      // Delete route logs
      await RouteLog.deleteMany({ routeId: route._id });
      
      // Delete route
      await route.delete();

      res.status(200).json({
        success: true,
        data: {}
      });

    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = new RouteController();