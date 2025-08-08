import { pool } from "../db/index.js";

export class UserModel {
  static async getUsers() {
    const query = `SELECT * from users`;
    const [rows] = await pool.execute(query);
    return rows;
  }
}
