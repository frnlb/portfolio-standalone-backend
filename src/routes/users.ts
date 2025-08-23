import { Router } from "express";
import {
  createUser,
  getUserById,
  getUsers,
  deleteUserById,
  updateUserById,
} from "../controllers/users.ts";

const router = Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUserById);
router.put("/:id", updateUserById);
router.delete("/:id", deleteUserById);

export default router;
