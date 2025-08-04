import { create } from "zustand";
import axios from "axios";
import type { Feedback } from "../types";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface FeedbackState {
  allFeedbacks: Feedback[];
  loading: boolean;
  error: string | null;

  fetchAllFeedbacks: () => Promise<void>;
  getFeedbacksByDesignId: (designId: string) => Promise<Feedback[]>;
  addFeedback: (
    designId: string,
    feedback: Omit<Feedback, "id" | "designId">
  ) => Promise<void>;
}

export const useFeedbackStore = create<FeedbackState>((set, get) => ({
  allFeedbacks: [],
  loading: false,
  error: null,

  // ✅ Fetch all feedbacks once
  fetchAllFeedbacks: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_BASE_URL}/feedback`);
      set({ allFeedbacks: res.data.feedbacks, loading: false });
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch feedbacks",
        loading: false,
      });
    }
  },

  // ✅ Get feedbacks by designId (checks cache first, otherwise fetches)
  getFeedbacksByDesignId: async (designId: string): Promise<Feedback[]> => {
    const { allFeedbacks } = get();

    // If feedbacks are already loaded, return from memory
    if (allFeedbacks.length > 0) {
      return allFeedbacks.filter((f) => f.designId === designId);
    }

    // Otherwise, fetch only for that designId
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_BASE_URL}/feedback/${designId}`);
      set(() => ({
        loading: false,
      }));
      return res.data.feedbacks;
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch feedbacks",
        loading: false,
      });
      return [];
    }
  },

  // ✅ Add new feedback
  addFeedback: async (designId, feedback) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/feedback`, {
        ...feedback,
        designId,
      });

      const newFeedback = res.data;
      set((state) => ({
        allFeedbacks: [newFeedback, ...state.allFeedbacks],
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to add feedback" });
    }
  },
}));
