import Habit from "../models/habit.model.js";
import { getTodayDate } from "../utils/dateFormat.js";

// Returns all habits for logged-in user
export const getHabits = async (req, res, next) => {
  try {
    const habits = await Habit.find({ user: req.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      message: "Habits fetched successfully",
      data: habits,
    });
  } catch (error) {
    next(error);
  }
};

// Creates a new habit
export const createHabit = async (req, res, next) => {
  try {
    const { habit } = req.body;
    const userId = req.userId;

    if (!habit) {
      return res.status(400).json({
        success: false,
        message: "habit field is required",
      });
    }
    const newHabit = await Habit.create({
      habit: habit,
      user: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Habit created successfully",
      data: newHabit,
    });
  } catch (error) {
    next(error);
  }
};

// Marks habit as completed for today
export const completeHabit = async (req, res, next) => {
  try {
    const { id } = req.params;

    const userId = req.userId;
    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Habit id is required",
      });
    }

    // Find the habit and verify it belongs to the authenticated user
    const habit = await Habit.findOne({ _id: id, user: userId });
    if (!habit) {
      return res
        .status(404)
        .json({ success: false, message: "Habit not found" });
    }

    // Get today's date in YYYY-MM-DD format
    const today = getTodayDate();

    // Check if habit is already completed for today
    if (habit.completedDates.includes(today)) {
      return res.status(400).json({
        message: "Habit already completed for today",
        date: today,
      });
    }

    // Add today's date to completedDates array
    habit.completedDates.push(today);
    await habit.save();

    res.status(200).json({
      success: true,
      message: "Habit marked as completed for today",
      data: habit,
    });
  } catch (error) {
    next(error);
  }
};

/*
 --  GET /habits/:id/status?date=YYYY-MM-DD
 --  Checks if habit is completed on given date
 */
export const habitStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.userId;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Habit id is required",
      });
    }
    const habit = await Habit.findOne({
      _id: id,
      user: userId,
    });

    if (!habit) {
      return res
        .status(404)
        .json({ success: false, message: "Habit not found" });
    }

    const completed = habit.completedDates.includes(req.query.date);

    return res.status(200).json({
      success: true,
      message: completed
        ? "Habit was completed on this date"
        : "Habit was not completed on this date",
      completed,
    });
  } catch (error) {
    next(error);
  }
};
