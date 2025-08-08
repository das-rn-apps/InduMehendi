import axios from "axios";
import { create } from "zustand";

interface User {
  _id: string;
  name: string;
  email: string;
  token: string;
  isAdmin: boolean;
}

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;

  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  initAuth: () => void;
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const useAuthStore = create<AuthState>((set) => ({
  token: localStorage.getItem("token"),
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user")!)
    : null,
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/login`, {
        email,
        password,
      });
      const data = res.data;

      if (!data.token) {
        set({ error: data.message || "Login failed" });
        return false;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      set({
        token: data.token,
        user: data,
        isAuthenticated: true,
        error: null,
      });

      return true;
    } catch (err) {
      set({ error: "Network error" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  register: async (name, email, password) => {
    set({ isLoading: true, error: null });
    try {
      const res = await axios.post(`${API_BASE_URL}/auth/register`, {
        name,
        email,
        password,
      });

      const data = res.data;
      console.log(data);

      if (!data.token) {
        set({ error: data.message || "Registration failed" });
        return false;
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data));

      set({
        token: data.token,
        user: data,
        isAuthenticated: true,
        error: null,
      });

      return true;
    } catch (err) {
      set({ error: "Network error" });
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    set({
      token: null,
      user: null,
      isAuthenticated: false,
      error: null,
    });
  },

  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),

  initAuth: () => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    set({
      token,
      user: user ? JSON.parse(user) : null,
      isAuthenticated: !!token,
    });
  },
}));
