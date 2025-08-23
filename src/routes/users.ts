import { Router } from "express";
import {
  createUser,
  getUserById,
  getUsers,
  deleteUserById,
  updateUserById,
  createUserAuth,
} from "../controllers/users.ts";

const router = Router();

router.post("/", createUser);
router.post("/auth", createUserAuth);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
