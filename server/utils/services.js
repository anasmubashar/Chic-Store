const axios = require('axios');
const MapApiConfig = require('../Models/mapApiConfigModel');

class MapService {
  constructor() {
    this.providers = {
      google: this.googleMapsRoute,
      mapbox: this.mapboxRoute,
      osrm: this.osrmRoute
    };
  }

  async getRouteFromProvider(provider, startLocation, stops) {
    const routingFunction = this.providers[provider.provider];
    if (!routingFunction) {
      throw new Error(`Unsupported map provider: ${provider.provider}`);
    }

    return routingFunction.call(this, provider, startLocation, stops);
  }

  async googleMapsRoute(provider, startLocation, stops) {
    try {
      const waypoints = stops.map(stop => ({
        location: stop.location.address,
        stopover: true
      }));

      const response = await axios.get(`${provider.baseUrl}/directions/json`, {
        params: {
          origin: startLocation.address,
          destination: stops[stops.length - 1].location.address,
          waypoints: waypoints.slice(0, -1),
          optimize: true,
          key: provider.apiKey
        }
      });

      const route = response.data.routes[0];
      return {
        distance: route.legs.reduce((sum, leg) => sum + leg.distance.value, 0),
        duration: route.legs.reduce((sum, leg) => sum + leg.duration.value, 0),
        polyline: route.overview_polyline.points,
        stopETAs: this.calculateETAs(route.legs)
      };

    } catch (error) {
      throw new Error(`Google Maps API error: ${error.message}`);
    }
  }

  async mapboxRoute(provider, startLocation, stops) {
    try {
      const coordinates = [
        startLocation.coordinates,
        ...stops.map(stop => stop.location.coordinates)
      ].map(coord => coord.join(',')).join(';');

      const response = await axios.get(
        `${provider.baseUrl}/optimized-trips/v1/mapbox/driving/${coordinates}`, {
          params: {
            access_token: provider.apiKey,
            geometries: 'polyline'
          }
        }
      );

      const trip = response.data.trips[0];
      return {
        distance: trip.distance,
        duration: trip.duration,
        polyline: trip.geometry,
        stopETAs: this.calculateETAs(trip.legs)
      };

    } catch (error) {
      throw new Error(`Mapbox API error: ${error.message}`);
    }
  }

  async osrmRoute(provider, startLocation, stops) {
    try {
      const coordinates = [
        startLocation.coordinates,
        ...stops.map(stop => stop.location.coordinates)
      ].map(coord => coord.join(',')).join(';');

      const response = await axios.get(
        `${provider.baseUrl}/route/v1/driving/${coordinates}`, {
          params: {
            overview: 'full',
            geometries: 'polyline',
            steps: true
          }
        }
      );

      const route = response.data.routes[0];
      return {
        distance: route.distance,
        duration: route.duration,
        polyline: route.geometry,
        stopETAs: this.calculateETAs(route.legs)
      };

    } catch (error) {
      throw new Error(`OSRM API error: ${error.message}`);
    }
  }

  calculateETAs(legs) {
    let currentTime = new Date();
    return legs.map(leg => {
      currentTime = new Date(currentTime.getTime() + leg.duration * 1000);
      return new Date(currentTime);
    });
  }
}

module.exports = new MapService();