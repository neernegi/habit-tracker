import api from "./api";

export const authService = {
  login: async (email, password) => {
    const { data } = await api.post("/auth/login", { email, password });
    return data;
  },

  signup: async (email, password) => {
    const { data } = await api.post("/auth/signup", { email, password });
    return data;
  },
};
