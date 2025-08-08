// src/store/designStore.ts
import { create } from "zustand";
import axios from "axios";
import type { Design } from "../types";

interface DesignState {
  designs: Design[];
  currentDesign: Design | null;
  categories: string[];
  loading: boolean;
  error: string | null;

  fetchDesigns: () => Promise<void>;
  fetchCategories: () => void;
  fetchDesignById: (id: string) => Promise<Design | null>;
  getDesignById: (id: string) => Design | undefined;
  addOrUpdateDesign: (design: Design) => void;
  clearCurrentDesign: () => void;
}

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

export const useDesignStore = create<DesignState>((set, get) => ({
  designs: [],
  currentDesign: null,
  categories: [],
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

  // Extract unique categories from designs
  fetchCategories: () => {
    const allCats = get().designs.flatMap((d) => d.category || []);
    const uniqueCats = Array.from(new Set(allCats));
    set({ categories: uniqueCats });
  },

  // Fetch a single design
  fetchDesignById: async (id: string) => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get(`${API_BASE_URL}/design/${id}`);
      const design = res.data;
      set({ currentDesign: design, loading: false });
      get().addOrUpdateDesign(design);
      return design;
    } catch (err: any) {
      set({ error: err.message || "Failed to fetch design", loading: false });
      return null;
    }
  },

  // Get design from state
  getDesignById: (id: string) => {
    return get().designs.find((d) => d._id === id);
  },

  // Add/update a design in state
  addOrUpdateDesign: (design: Design) => {
    const current = get().designs;
    const existingIndex = current.findIndex((d) => d._id === design._id);

    const updatedDesigns =
      existingIndex !== -1
        ? current.map((d) => (d._id === design._id ? design : d))
        : [...current, design];

    set({ designs: updatedDesigns });
  },

  // Clear current design
  clearCurrentDesign: () => {
    set({ currentDesign: null });
  },
}));
