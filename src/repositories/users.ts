import { PrismaClient, Prisma } from "@prisma/client";
const prisma = new PrismaClient();

export class UserRepository {
  static async createUser(user: Prisma.usersCreateInput) {
    try {
      const result = await prisma.users.create({ data: user });
      return result;
    } catch (error) {
      console.error(`Error at createUser: ${error}`);
      throw error;
    }
  }

  static async getUsers() {
    try {
      const result = await prisma.users.findMany();
      return result;
    } catch (error) {
      console.error(`Error in getUsers repositories: ${error}`);
      throw error;
    }
  }
}
