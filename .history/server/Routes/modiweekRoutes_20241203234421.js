import express from "express";
import * as modiweekController from "../controllers/modiweekController.js";
import adminMiddleware from "../middleware/admin.js";

const router = require("express").Router();

router.get("/current", modiweekController.getCurrentModiweek);

// Admin routes
router.use(adminMiddleware);
router.post("/", modiweekController.createModiweek);
router.patch("/:id", modiweekController.updateModiweek);

export default router;
