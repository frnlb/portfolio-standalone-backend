import { UserModel } from "../models/user.ts";
import { UserRepository } from "../repositories/users.ts";
import type { User } from "../types/users.ts";
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

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
    let { rights, password, email, username } = user;
    if (!rights) {
      rights = "reader";
    }
    if (!password || !email || !username) {
      throw new Error(`Username: ${username}, email: ${email}
        and password are mandatory fields`);
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
    const hashedUser = {
      ...user,
      password: hashedPassword,
    };
    const result = await UserModel.createUserAuth(hashedUser);
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
