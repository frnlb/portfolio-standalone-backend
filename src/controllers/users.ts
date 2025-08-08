import { connection } from "../db/index.js";
import type { Request, Response } from "express";
import { UserModel } from "../models/user.js";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const data = await UserModel.getUsers();
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserById = async (req: Request, res: Response) => {};

// export const getUserById = async (id: string) => {
//   const conn = await connection();
//   const [result, fields] = await conn.execute(
//     `SELECT * from users WHERE user_id = ${id}`
//   );
//   return result;
// };
