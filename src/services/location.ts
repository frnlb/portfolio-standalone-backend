import { LocationModel } from "../models/location.ts";
import type { Location } from "../types/locations.ts";

export class LocationService {
  static async getLocations() {
    const [locations] = await LocationModel.getLocations();
    return locations;
  }

  static async getLocationById(id: Location["id"]) {
    const [location] = await LocationModel.getLocationById(id);
    return location;
  }

  static async getLocationByName(name: Location["name"]) {
    const [location] = await LocationModel.getLocationByName(name);
    return location;
  }

  static async getLocationByCountry(country: Location["country"]) {
    const [location] = await LocationModel.getLocationByCountry(country);
    return location;
  }

  static async createLocation(location: Location) {
    const { name, description, country, region, latitude, longitude } =
      location;
    let parsedLocation: Location = {
      ...location,
    };
    if (latitude && longitude) {
      parsedLocation = {
        ...parsedLocation,
        latitude: Number(latitude),
        longitude: Number(longitude),
      };
    }

    const createdLocation = await LocationModel.createLocation(parsedLocation);
    return "";
  }
}
