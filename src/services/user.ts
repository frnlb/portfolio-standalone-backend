import { UserModel } from "../models/user.ts";
import { UserRepository } from "../repositories/users.ts";
import type { User } from "../types/users.ts";
import type { ResultSetHeader } from "mysql2";

export class UserService {
  static async createUser(user: User) {
    const { email, username, rights } = user;
    if (!email || !username || !rights) {
      throw new Error(
        `Error at createUser service. User may not be complete: ${user}`
      );
    }
    const result = await UserRepository.createUser(user);
    return result;
  }

  static async createUserAuth(user: User) {
    let { rights } = user;
    if (!rights) {
      rights = "reader";
    }
    const result = await UserModel.createUserAuth(user);
    return result;
  }

  static async login(user: Partial<User>) {
    const { email, password } = user;
    if (!email || !password) {
      throw new Error(`Email: ${email} or password are mandatory fields`);
    }
    const [result] = await UserModel.login(email, password);
    return result;
  }

  static async getUserByEmail(email: User["email"]) {
    if (!email) {
      throw new Error(`Email is a required field`);
    }
    const results = await UserModel.getUserByEmail(email);
    return results;
  }

  static async getUsers() {
    const result = await UserRepository.getUsers();
    return result;
  }
}
