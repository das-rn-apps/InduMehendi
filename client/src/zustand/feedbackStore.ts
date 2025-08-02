import { create } from "zustand";
import axios from "axios";
import type { Feedback } from "../types";
const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

interface FeedbackState {
  feedbacks: Record<string, Feedback[]>;
  loading: boolean;
  error: string | null;

  fetchFeedbacks: (designId: string) => Promise<void>;
  addFeedback: (
    designId: string,
    feedback: Omit<Feedback, "id" | "designId">
  ) => Promise<void>;
  setFeedbacks: (designId: string, feedbacks: Feedback[]) => void;
}

export const useFeedbackStore = create<FeedbackState>((set, _get) => ({
  feedbacks: {},
  loading: false,
  error: null,

  fetchFeedbacks: async (designId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_BASE_URL}/feedback/${designId}`);
      set((state) => ({
        feedbacks: {
          ...state.feedbacks,
          [designId]: res.data.feedbacks,
        },
        loading: false,
      }));
    } catch (err: any) {
      set({
        error: err.message || "Failed to fetch feedbacks",
        loading: false,
      });
    }
  },

  addFeedback: async (designId, feedback) => {
    try {
      const res = await axios.post(`${API_BASE_URL}/feedback`, {
        ...feedback,
        designId,
      });

      const newFeedback = res.data;
      set((state) => ({
        feedbacks: {
          ...state.feedbacks,
          [designId]: [newFeedback, ...(state.feedbacks[designId] || [])],
        },
      }));
    } catch (err: any) {
      set({ error: err.message || "Failed to add feedback" });
    }
  },

  setFeedbacks: (designId, feedbacks) => {
    set((state) => ({
      feedbacks: {
        ...state.feedbacks,
        [designId]: feedbacks,
      },
    }));
  },
}));
