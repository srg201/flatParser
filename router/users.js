import { Router } from "express";
import userController from "../controllers/userController.js";
import UserModel from "../models/UserModel.js";
const router = new Router();

router.post("/registration", userController.registration);
router.get("/all", userController.getUsers);
router.get("/me/:id", userController.getMe);
router.patch("/me/:id", userController.changeStatus);

export default router;
