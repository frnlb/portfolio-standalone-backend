import mysql from "mysql2/promise";
import dotenv from "dotenv";

const envFIle =
  process.env.NODE_ENV === "production" ? ".env.production" : "env.development";

dotenv.config();

const dbConfig = {
  host: process.env.HOSTNAME as string,
  port: parseInt(process.env.PORT || "3000") as number,
  user: process.env.USERNAME as string,
  password: process.env.PASSWORD as string,
  database: process.env.DB_NAME as string,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  acquireTimeout: 60000,
  timeout: 60000,
};

export const pool = mysql.createPool(dbConfig);
console.log("🚀 ~ pool:", pool);

export const testConnection = async (): Promise<void> => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Database connected successfully");
    // Test query
    await connection.execute("SELECT 1");
    console.log("✅ Database query test passed");
    connection.release();
  } catch (error) {
    console.error("❌ Database connection failed:", error);
    throw error;
  }
};

export const closeConnection = async (): Promise<void> => {
  try {
    await pool.end();
    console.log("✅ Database connection closed");
  } catch (error) {
    console.error("❌ Error closing database:", error);
  }
};
