import express from "express";
import authMiddleware from "../middlewares/auth.middleware.js";
import {
  getHabits,
  createHabit,
  completeHabit,
  habitStatus
} from "../controllers/habit.controller.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", getHabits);
router.post("/", createHabit);
router.post("/:id/complete", completeHabit);
router.get("/:id/status", habitStatus);

export default router;
