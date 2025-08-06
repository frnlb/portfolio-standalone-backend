import mysql from "mysql2/promise";
import type { FieldPacket } from "mysql2/promise";
const pool = mysql.createPool(process.env.DATABASE_URL as string);
const HOSTNAME = process.env.development.HOSTNAME;
console.log("🚀 ~ HOSTNAME:", HOSTNAME);
const PORT = process.env.development.PORT;
console.log("🚀 ~ PORT:", PORT);
const PASSWORD = process.env.development.PASSWORD;
console.log("🚀 ~ PASSWORD:", PASSWORD);
const USERNAME = process.env.development.USERNAME;
console.log("🚀 ~ USERNAME:", USERNAME);

export const connection = mysql.createConnection({
  host: HOSTNAME,
  user: USERNAME,
  database: "users",
});

export async function executeQuery<T>(
  query: string,
  values?: any[]
): Promise<[T[], mysql.FieldPacket[]]> {
  return (await pool.execute(query, values)) as [T[], mysql.FieldPacket[]];
}

async function pingDb(): Promise<void> {
  await pool.query("SELECT 1+1 AS solution");
  console.log("✅ Database connection successful!");
}
