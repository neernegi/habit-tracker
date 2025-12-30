import React, { useEffect, useState } from "react";
import { CheckCircle, Clock, Calendar } from "lucide-react";

export const HabitCard = ({ habit, onComplete }) => {

  // check today’s date inside completedDates so the habit can only be completed once per day and the UI stays correct even after refresh
  const today = new Date().toISOString().split("T")[0];

  const [isCompleted, setIsCompleted] = useState(
    habit.completedDates?.includes(today)
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setIsCompleted(habit.completedDates?.includes(today));
  }, [habit.completedDates, today]);

  const handleComplete = async () => {
    if (loading || isCompleted) return;

    try {
      setLoading(true);
      await onComplete();
      setIsCompleted(true);
    } catch (error) {
      console.error("Error completing habit:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 p-6 border border-gray-100">
      <div className="flex justify-between items-start mb-5">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            {habit.habit}
          </h3>
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold ${
              isCompleted
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                : "bg-amber-50 text-amber-700 border border-amber-200"
            }`}
          >
            {isCompleted ? (
              <>
                <CheckCircle className="w-3.5 h-3.5" />
                Done Today
              </>
            ) : (
              <>
                <Clock className="w-3.5 h-3.5" />
                Pending
              </>
            )}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleComplete}
          disabled={loading || isCompleted}
          className={`w-full py-3.5 px-4 rounded-xl font-semibold text-sm transition-all duration-200 ${
            isCompleted
              ? "bg-gray-100 text-gray-500 cursor-not-allowed border border-gray-200"
              : loading
              ? "bg-indigo-400 text-white cursor-wait"
              : "bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-md hover:shadow-lg"
          }`}
        >
          {loading ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full"></div>
              Completing...
            </span>
          ) : isCompleted ? (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Completed
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              <CheckCircle className="w-4 h-4" />
              Mark as Done
            </span>
          )}
        </button>

        <div className="flex items-center justify-center gap-2 text-xs text-gray-500 pt-2">
          <Calendar className="w-4 h-4" />
          {new Date().toLocaleDateString("en-US", {
            weekday: "long",
            month: "short",
            day: "numeric",
          })}
        </div>
      </div>
    </div>
  );
};
