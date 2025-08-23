import express, { Router } from "express";
import cors from "cors";
import type { Express, Request, Response } from "express";
import { testConnection } from "./db/index.js";
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
  next();
});

app.use("/locations", locationsRouter);
app.use("/users", usersRouter);

const port = process.env.PORT;

testConnection();

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(
    `Serving images from ${imagesPath} at http://localhost:${port}/images`
  );
});
