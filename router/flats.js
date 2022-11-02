import { Router } from "express";
import flatsController from "../controllers/flatsController.js";
import FlatsModel from "../models/FlatsModel.js";
const router = new Router();

router.get("/", flatsController.getNewFlats);

export default router;
