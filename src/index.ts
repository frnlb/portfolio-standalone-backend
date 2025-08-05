import express = require("express");
import dotenv = require("dotenv");
import type { Express, Request, Response } from "express";
import mysql = require("mysql2/promise");
const app: Express = express();
const envPath =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envPath });
const PORT = process.env.PORT || 3000;

const testDbConnection = async () => {
  try {
    const connection = await mysql.createConnection(
      process.env.DATABASE_URL as string
    );
    await connection.end();
    console.log("databse connection successful");
  } catch (error) {
    console.error("Database connection failed: ", error);
  }
};

app.get("/", (req, res, next) => {
  res.send("hello fran");
});

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
  testDbConnection();
});
