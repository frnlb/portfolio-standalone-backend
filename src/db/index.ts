import mysql from "mysql2/promise";

const dbConfig = {
  host: process.env.HOSTNAME as string,
  port: parseInt(process.env.DB_PORT || "3006") as number,
  user: process.env.DB_USERNAME as string,
  password: process.env.PASSWORD as string,
  database: process.env.DB_NAME as string,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

export const pool = mysql.createPool(dbConfig);

export const connection = async () => await mysql.createConnection(dbConfig);

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
