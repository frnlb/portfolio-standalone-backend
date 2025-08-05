import express = require("express");
import type { Express, Request, Response } from "express";
const app: Express = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req, res, next) => {
  res.send("hello fran");
});

app.listen(PORT, () =>
  console.log(`[server]: Server is running at http://localhost:${PORT}`)
);
