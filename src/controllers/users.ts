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

export const getUserById = async (req: Request, res: Response) => {};
export const createUser = async (req: Request, res: Response) => {
  console.log("🚀 ~ createUser ~ res:", res);
  console.log("🚀 ~ createUser ~ req:", req);
};
export const deleteUserById = async (req: Request, res: Response) => {
  console.log("🚀 ~ createUser ~ res:", res);
  console.log("🚀 ~ createUser ~ req:", req);
};
export const updateUserById = async (req: Request, res: Response) => {
  console.log("🚀 ~ createUser ~ res:", res);
  console.log("🚀 ~ createUser ~ req:", req);
};
