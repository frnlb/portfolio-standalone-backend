import { UserModel } from "../models/user.ts";
import { UserRepository } from "../repositories/users.ts";
import type { User } from "../types/users.ts";

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
      rights = "user";
    }
    const [result] = await UserModel.createUserAuth(user);
    if (result && result.affectedRows) {
      return result.affectedRows;
    }
    return result;
  }

  static async getUsers() {
    const result = await UserRepository.getUsers();
    return result;
  }
}
