import api from "./api";

export const habitService = {
  getHabits: async () => {
    const { data } = await api.get("/habits");
    return data;
  },

  createHabit: async (habit) => {
    const { data } = await api.post("/habits", { habit });
    return data;
  },

  completeHabit: async (id) => {
    const { data } = await api.post(`/habits/${id}/complete`);
    return data;
  },

  getHabitStatus: async (id, date) => {
    const { data } = await api.get(`/habits/${id}/status?date=${date}`);
    return data;
  },
};
