import type { Request, Response } from "express";
import { UserService } from "../services/user.ts";
import type { User } from "../types/users.ts";
import type { ResultSetHeader } from "mysql2";

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
  const user = req.body as User;
  try {
    const result = await UserService.createUserAuth(user);
    const affectedRows = (result as ResultSetHeader).affectedRows;
    res.status(200);
    res.send(`Created ${affectedRows} new records`);
  } catch (error) {
    const errorMessage = (error as Error).message;
    res.status(500);
    res.send(errorMessage);
    console.error(`Error in createUserAuth controller ${error}`);
  }
};

export const getUserByEmail = async (req: Request, res: Response) => {
  const { email } = req.body;
  try {
    const result = await UserService.getUserByEmail(email);
    return result;
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error(error);
    res.send(errorMessage);
    res.status(404);
  }
};

export const login = async (req: Request, res: Response) => {
  const user = req.body;
  try {
    const result = await UserService.login(user);
    res.send(result);
    res.status(200);
    return result;
  } catch (error) {
    const errorMessage = (error as Error).message;
    console.error(errorMessage);
    res.status(404);
  }
};
