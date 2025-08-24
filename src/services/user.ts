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
    const userRecord = await this.getUserByEmail(email);
    if (!userRecord || userRecord.length === 0) {
      throw new Error(`No user found with this email: ${email}`);
    }

    const {
      user_id,
      username,
      email: usermail,
      rights,
    } = userRecord[0] as User;

    const storedHash = userRecord[0]?.password;
    if (!storedHash) {
      throw new Error(`Could not retrieve user's password`);
    }

    const isMatch = await bcrypt.compare(password, storedHash);
    if (isMatch) {
      return { message: `User ${username} Login successful!` };
    } else {
      throw new Error("Invalid email or password");
    }
  }

  static async getUserByEmail(email: User["email"]) {
    if (!email) {
      throw new Error(`Email is a required field`);
    }
    const result = await UserModel.getUserByEmail(email);
    return result;
  }

  //With repository
  // static async getUsers() {
  //   const result = await UserRepository.getUsers();
  //   return result;
  // }

  static async getUsers() {
    const result = await UserModel.getUsers();
    return result;
  }
}
