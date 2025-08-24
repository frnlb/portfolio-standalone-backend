import { Router } from "express";
import {
  createUser,
  getUserById,
  getUsers,
  deleteUserById,
  updateUserById,
  createUserAuth,
  getUserByEmail,
  login,
} from "../controllers/users.ts";

const router = Router();

router.get("/:id", getUserById);
router.get("/", getUsers);
router.post("/signup", createUserAuth);
router.post("/login", login);
router.post("/", createUser);
router.get("/:email", getUserByEmail);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
