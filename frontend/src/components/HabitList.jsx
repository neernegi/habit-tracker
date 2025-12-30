import { HabitCard } from "./HabitCard";

export const HabitList = ({ habits, loading, onHabitCompleted }) => {
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <p className="mt-6 text-gray-600 font-medium text-lg">
          Loading your habits...
        </p>
      </div>
    );
  }

  if (habits.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-4">
        <div className="bg-linear-to-br from-indigo-50 to-purple-50 rounded-3xl p-12 text-center max-w-md border border-indigo-100">
          <div className="bg-white rounded-2xl p-8 inline-block shadow-lg mb-6 border border-gray-100">
            <Plus
              className="w-20 h-20 text-indigo-600 mx-auto"
              strokeWidth={1.5}
            />
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-4">
            No Habits Yet
          </h3>
          <p className="text-gray-600 text-lg mb-8 leading-relaxed">
            Start building better habits today! Add your first habit to begin
            tracking your progress.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-4 md:p-6">
      {habits.map((habit) => (
        <HabitCard
          key={habit._id}
          habit={habit}
          onComplete={() => onHabitCompleted(habit._id)}
        />
      ))}
    </div>
  );
};
