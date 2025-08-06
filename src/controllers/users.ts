import type { Request, Response } from "express";
import { getUsersFromDB } from "../services/userService.js";

export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await getUsersFromDB();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
