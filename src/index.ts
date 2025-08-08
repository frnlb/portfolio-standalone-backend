// import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import type { Express, Request, Response } from "express";
// import path from "path";
import { testConnection } from "./db/mysql.js";

// const envPath = path.resolve(
//   process.cwd(),
//   `.env.${process.env.NODE_ENV || "development"}`
// );

// dotenv.config({ path: envPath });
const app: Express = express();
app.use(cors());
const port = process.env.PORT;

testConnection();

app.get("/", (req: Request, res: Response) => {
  res.send("Hola fran!");
});

app.get("/users/:id", (req: Request, res: Response) => {
  res.send("users");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
