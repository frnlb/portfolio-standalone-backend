import express from "express";
import { pool } from "../db/mysql.ts";
import type { Location } from "../types/locations.ts";
import { capitalizeString } from "../utils/index.ts";

export class LocationModel {
  static async getLocations() {
    const query = `SELECT * FROM locations;`;
    try {
      const [results, fields] = await pool.query(query);
      return results;
    } catch (error) {
      console.error("Error getLocations: ", error);
      throw error;
    }
  }

  static async getLocationById(id: Location["id"]) {
    try {
      const query = `SELECT * FROM locations WHERE location_id=${id}`;
      const [results, fields] = await pool.query(query);
      return [results];
    } catch (error) {
      console.error(`Error at getLocationById: ${id}, ${error}`);
      throw error;
    }
  }

  static async getLocationByName(name: Location["name"]) {
    const capName = capitalizeString(name);
    try {
      const query = `SELECT * FROM locations WHERE name="${name}"`;
      const [results, fields] = await pool.query(query);
      return [results];
    } catch (error) {
      console.error(`Error at getLocationById: ${name}, ${error}`);
      throw error;
    }
  }

  static async getLocationByCountry(country: Location["country"]) {
    const capCountry = capitalizeString(country);
    try {
      const query = `SELECT * FROM locations WHERE country="${capCountry}"`;
      const [results, fields] = await pool.query(query);
      console.log(
        "🚀 ~ LocationModel ~ getLocationByCountry ~ results:",
        results
      );
      return [results];
    } catch (error) {
      console.error(`Error at getLocationById: ${country}, ${error}`);
      throw error;
    }
  }

  static async createLocation({
    name,
    description,
    country,
    region,
    latitude,
    longitude,
  }: Location) {
    const query = `INSERT INTO locations (name, description, country, region, latitude, longitude) 
  VALUES (${name}, ${description}, ${country}, ${region}, ${latitude},${longitude} );`;
    try {
    } catch (error) {
      console.error(`Error creating location: ${name} --> Error: `, error);
      throw error;
    }
  }
}
