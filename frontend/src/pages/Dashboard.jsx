import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddHabit from "../components/AddHabit";
import { useAuth } from "../context/AuthContext";
import { habitService } from "../services/habit";
import { HabitList } from "../components/HabitList";

const Dashboard = () => {
  const navigate = useNavigate();
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const { logout } = useAuth();

  const fetchHabits = async () => {
    try {
      setLoading(true);
      const response = await habitService.getHabits();
      setHabits(response.data || []);
    } catch (err) {
      console.error("Failed to fetch habits", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHabits();
  }, []);

  const handleHabitCompleted = async (habitId) => {
    try {
      await habitService.completeHabit(habitId); 
      fetchHabits();
    } catch (error) {
      console.error("Failed to complete habit:", error);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto py-6">
        <div className="px-4">
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Habits</h2>
            <AddHabit onAdded={fetchHabits} />
          </div>

          <HabitList
            habits={habits}
            loading={loading}
            onHabitCompleted={handleHabitCompleted}
          />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
