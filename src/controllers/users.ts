import type { Request, Response } from "express";
import { UserService } from "../services/user.ts";
import type { User } from "../types/users.ts";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await UserService.getUsers();
    res.status(200).json({
      success: true,
      data,
    });
    return data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createUserAuth = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const result = await UserService.createUserAuth(user);
    res.status(200);
    res.send(`Created ${result} new records`);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500);
    res.send(errorMessage);
    console.error(`Error in createUserAuth controller ${error}`);
  }
};

export const getUserById = async (req: Request, res: Response) => {};
export const createUser = async (req: Request, res: Response) => {};
export const deleteUserById = async (req: Request, res: Response) => {};
export const updateUserById = async (req: Request, res: Response) => {};
