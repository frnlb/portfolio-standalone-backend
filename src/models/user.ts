import type { RowDataPacket } from "mysql2";
import { pool } from "../db/index.js";
import type { User } from "../types/users.ts";

export class UserModel {
  static async getUsers() {
    const query = `SELECT * from users`;
    const [rows] = await pool.execute(query);
    return rows;
  }

  static async createUserAuth(user: User) {
    const { username, email, password, rights } = user;
    const query = `INSERT INTO users (username, email, password, rights)
    VALUES ("${username}", "${email}", "${password}", "${rights}");`;

    try {
      const [rows] = await pool.execute(query);
      return rows;
    } catch (error) {
      console.error(`Error in createUserAuth models
         User: ${user.username}
         Email: ${user.email}
          `);
      throw error;
    }
  }

  static async login(email: User["email"], password: User["password"]) {
    const query = `SELECT * FROM users WHERE email="${email}" AND password="${password}"`;
    try {
      const [rows] = await pool.execute<RowDataPacket[]>(query);
      return rows;
    } catch (error) {
      console.error(`Error in login model: ${error}`);
      throw error;
    }
  }

  static async getUserByEmail(email: User["email"]) {
    const query = `SELECT * FROM users WHERE email=${email}`;
    try {
      const [rows] = await pool.execute(query);
      return rows;
    } catch (error) {
      console.error(`Error in getUserByEmail models: ${error}`);
      throw error;
    }
  }
}
