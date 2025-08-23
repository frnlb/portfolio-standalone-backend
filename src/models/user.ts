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
      const results = await pool.execute(query);
      return results;
    } catch (error) {
      console.error(`Error in createUserAuth
          user: ${user}
          error: ${error}
          `);
    }
  }
}
