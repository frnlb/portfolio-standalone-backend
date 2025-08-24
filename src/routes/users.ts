import { Router } from "express";
import {
  getUsers,
  createUserAuth,
  getUserByEmail,
  login,
} from "../controllers/users.ts";

const router = Router();

router.get("/", getUsers);
router.get("/:email", getUserByEmail);
router.post("/signup", createUserAuth);
router.post("/login", login);

export default router;
