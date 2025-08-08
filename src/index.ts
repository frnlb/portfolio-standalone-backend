import express, { Router } from "express";
import cors from "cors";
import type { Express, Request, Response } from "express";
import { testConnection } from "./db/index.js";
import { getUsers } from "./controllers/users.js";
const imagesPath = process.env.IMAGES_PATH;
import fs from "fs/promises";
import path from "path";

const router = Router();

const app: Express = express();
app.use(cors());
if (imagesPath) {
  app.use("/images", express.static(imagesPath));
}
const port = process.env.PORT;

testConnection();

app.get("/", (req: Request, res: Response) => {
  res.send("Hola fran!");
});

// app.get("/users/:id", async (req, res) => {
//   const { id } = req.params;
//   const user = await getUserById(id);
//   res.send(user);
// });

app.get("/users", async (req, res) => {
  await getUsers(req, res);
});

app.get("/users/:id", (req: Request, res: Response) => {
  res.send("users");
});

app.post("/api/images/sync");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(
    `Serving images from ${imagesPath} at http://localhost:${port}/images`
  );
});
