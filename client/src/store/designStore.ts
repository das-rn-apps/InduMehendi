import { create } from "zustand";
import axios from "axios";
import type { Design } from "../types";

interface DesignState {
  designs: Design[];
  currentDesign: Design | null;
  loading: boolean;
  error: string | null;

  fetchDesigns: () => Promise<void>;
  fetchDesignById: (id: string) => Promise<Design | null>;
  getDesignById: (id: string) => Design | undefined;
  addOrUpdateDesign: (design: Design) => void;
  clearCurrentDesign: () => void;
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const useDesignStore = create<DesignState>((set, get) => ({
  designs: [],
  currentDesign: null,
  loading: false,
  error: null,

  // Fetch all designs
  fetchDesigns: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_BASE_URL}/design`);
      set({ designs: res.data.designs, loading: false });
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch designs", loading: false });
    }
  },

  // Fetch a single design and set currentDesign
  fetchDesignById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_BASE_URL}/design/${id}`);
      const design = res.data;
      set({ currentDesign: design, loading: false });
      get().addOrUpdateDesign(design); // optional: keep all in sync
      return design;
    } catch (err: any) {
      console.error("Failed to fetch design by ID:", err);
      set({ error: err.message || "Failed to fetch design", loading: false });
      return null;
    }
  },

  // Get design from designs array
  getDesignById: (id: string) => {
    return get().designs.find((d) => d._id === id);
  },

  // Add or update in designs[]
  addOrUpdateDesign: (design: Design) => {
    const current = get().designs;
    const existingIndex = current.findIndex((d) => d._id === design._id);

    const updatedDesigns =
      existingIndex !== -1
        ? current.map((d) => (d._id === design._id ? design : d))
        : [...current, design];

    set({ designs: updatedDesigns });
  },

  // Clear currentDesign (optional helper)
  clearCurrentDesign: () => {
    set({ currentDesign: null });
  },
}));
