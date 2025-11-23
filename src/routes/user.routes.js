import express from "express";
import { createUser, getUsers, getUserById, updateUser, deleteUser, loginUser } from "../controllers/user.controller.js";
import { verifyToken } from "../middleware/validateToken.js";
import e from "express";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.post("/login", loginUser)
router.get("/profile", verifyToken, (req, res) => {
  res.json({ message: "Acceso concedido", user: req.user.name });
});

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router
