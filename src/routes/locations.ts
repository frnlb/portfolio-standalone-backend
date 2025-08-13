import express from "express";
import type { Router } from "express";
import {
  getLocations,
  getLocationById,
  createLocation,
} from "../controllers/locations.ts";

const router = express.Router();

router.use((req, res, next) => {
  console.log("Time: ", Date.now());
  next();
});

router.get("/", getLocations);
router.get("/:id", getLocationById);
router.post("/", createLocation);
export default router;
