import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
async function main() {
  const allUsers = await prisma.users.findMany();
  console.log(allUsers);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(`Prisma Error while connecting with database: ${e}`);
    await prisma.$disconnect();
    process.exit(1);
  });
