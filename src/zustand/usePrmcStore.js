import { create } from "zustand";

const usePrmcStore = create((set) => ({
  prmcs: [],
  isLoading: false,
  error: null,
  setPrmcs: (prmcs) => set({ prmcs }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export default usePrmcStore;
