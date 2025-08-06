import dotenv from "dotenv";
import express from "express";
import type { Express, Request, Response } from "express";
import { getUsers } from "./controllers/users.js";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/users", getUsers);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
