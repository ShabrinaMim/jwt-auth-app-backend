import express from "express";
import { getUsers, register, login, logout } from "../controller/user.js";
import isAuthenticated from "../middleware/auth.js";

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(isAuthenticated, getUsers);
router.route("/logout").get(isAuthenticated, logout);

export default router;
