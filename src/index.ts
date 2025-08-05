import express = require("express");
import dotenv = require("dotenv");
import type { Express, Request, Response } from "express";
const app: Express = express();
const envPath =
  process.env.NODE_ENV === "production"
    ? ".env.production"
    : ".env.development";
dotenv.config({ path: envPath });
const PORT = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.send("hello fran");
});

app.listen(PORT, () =>
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
);
