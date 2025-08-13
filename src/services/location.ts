import { LocationModel } from "../models/location.ts";
import type { Location } from "../types/locations.ts";

export class LocationService {
  static async getLocations() {
    const locations = await LocationModel.getLocations();
    return locations;
  }

  static async getLocationById(id: Location["id"]) {
    const location = await LocationModel.getLocationById(id);
    return location;
  }

  static async getLocationByName(name: Location["name"]) {
    const location = await LocationModel.getLocationByName(name);
    return location;
  }

  static async getLocationByCountry(country: Location["country"]) {
    const location = await LocationModel.getLocationByName(country);
    return location;
  }

  static async createLocation(location: Location) {
    console.log("🚀 ~ LocationService ~ createLocation ~ location:", location);
    return "";
  }
}
