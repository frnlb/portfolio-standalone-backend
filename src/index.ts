import express, { Router } from "express";
import cors from "cors";
import type { Express, Request, Response } from "express";
import { testConnection } from "./db/index.js";
import { getUsers } from "./controllers/users.js";
import usersRouter from "./routes/users.ts";
import locationsRouter from "./routes/locations.ts";

const imagesPath = process.env.IMAGES_PATH;
const router = Router();

router.get("/public", (req: Request, res: Response) => {
  res.send("this is you in public");
});

const app: Express = express();
app.use(cors());
app.use(express.json());
if (imagesPath) {
  app.use("/images", express.static(imagesPath));
}

app.use((req, res, next) => {
  console.log("req.baseUrl: ", req.baseUrl);
  console.log("req.body ", req.body);
  next();
});

app.use("/locations", locationsRouter);
app.use("users", usersRouter);

const port = process.env.PORT;

testConnection();

app.get("/", (req: Request, res: Response) => {
  res.send("Hola fran!");
});

app.get("/users", async (req, res) => {
  await getUsers(req, res);
});

app.get("/users/:id", (req: Request, res: Response) => {
  res.send("users");
});

app.post("/api/images/sync", (req: Request, res: Response) => {
  res.send("posting");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(
    `Serving images from ${imagesPath} at http://localhost:${port}/images`
  );
});
