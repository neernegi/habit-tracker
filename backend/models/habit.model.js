import mongoose from "mongoose";

const habitSchema = new mongoose.Schema(
  {
    habit: {
      type: String,
      required: true
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    completedDates: {
      type: [String], // YYYY-MM-DD format
      default: []
    }
  },
  { timestamps: true }
);

export default mongoose.model("Habit", habitSchema);
