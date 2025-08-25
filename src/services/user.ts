import { emitWarning } from "process";
import { UserModel } from "../models/user.ts";
import { UserRepository } from "../repositories/users.ts";
import type { User } from "../types/users.ts";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env
  .JWT_EXPIRES_IN as jwt.SignOptions["expiresIn"];

const SALT_ROUNDS = 10;

function signJwt(
  payload: object,
  secret: string,
  options?: jwt.SignOptions
): Promise<string> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, options || {}, (err, token) => {
      if (err || !token) {
        return reject(err);
      }
      resolve(token);
    });
  });
}
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

  static async checkExistingUser(user: Partial<User>) {
    const { email, password } = user;
    if (!email || !password) {
      throw new Error(`Email: ${email} or password are mandatory fields`);
    }
    const userRecord = await this.getUserByEmail(email);
    if (!userRecord || userRecord.length === 0) {
      throw new Error(`No user found with this email: ${email}`);
    }

    const storedHash = userRecord[0]?.password;
    if (!storedHash) {
      throw new Error(`Could not retrieve user's password`);
    }

    const isMatch = await bcrypt.compare(password, storedHash);
    if (isMatch) {
      return {
        userRecord: userRecord[0],
        message: `User ${userRecord[0]?.username} Login successful!`,
      };
    } else {
      throw new Error("Invalid email or password");
    }
  }

  static async login(user: Partial<User>) {
    const { userRecord } = await this.checkExistingUser(user);
    if (!userRecord) {
      throw new Error(`Could not retrieve a valid user: ${userRecord}`);
    }
    const { email, rights, username, user_id } = userRecord;
    const token = await signJwt(
      { id: user_id, email, name: username },
      JWT_SECRET as string,
      { expiresIn: JWT_EXPIRES_IN || "1h" }
    );
    if (token) {
      return token;
    } else {
      throw new Error(`Error at login: no token could be released`);
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
  static async getUsers() {
    const result = await UserRepository.getUsers();
    return result;
  }
}
