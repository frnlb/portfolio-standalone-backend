import type { Request, Response } from "express";
import { LocationService } from "../services/location.ts";
import type { Location } from "../types/locations.ts";

export const getLocations = async (req: Request, res: Response) => {
  const { name, description, country, latitude, longitude } = req.query;
  let result = {};
  try {
    if (name) {
      result = await LocationService.getLocationByName(name as string);
    } else if (country) {
      result = await LocationService.getLocationByCountry(country as string);
    } else {
      result = await LocationService.getLocations();
    }
    res.send(result);
  } catch (error) {
    console.error("Error at getLocations: ", error);
    throw error;
  }
};

export const getLocationById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const idNumber = Number(id);
  try {
    const result = await LocationService.getLocationById(idNumber);
    res.send(result);
  } catch (error) {
    console.error(`Error at getLocationById --> id: ${id} \nError: ${error}`);
    throw error;
  }
};

export const createLocation = async (req: Request, res: Response) => {
  console.log("req.body", req.body);
  try {
    const [results] = await LocationService.createLocation(req.body);
  } catch (error) {
    console.error(`Error creating new location:\n${req.body}`);
    throw error;
  }
  res.send(req.body);
};
