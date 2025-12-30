import React, { useState } from "react";
import { habitService } from "../services/habit";

const AddHabit = ({ onAdded }) => {
  const [habit, setHabit] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!habit.trim()) {
      setError("Habit is required");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await habitService.createHabit(habit);
      setHabit("");

      onAdded();
    } catch (error) {
      setError(error.response?.data?.message || "Failed to create habit");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-8">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Add New Habit</h3>
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && <div className="text-red-500 text-sm">{error}</div>}
        <div className="flex gap-4">
          <input
            type="text"
            value={habit}
            onChange={(e) => setHabit(e.target.value)}
            placeholder="Enter your habit (e.g., Exercise 30 minutes)"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
          >
            {loading ? "Adding..." : "Add Habit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddHabit;
