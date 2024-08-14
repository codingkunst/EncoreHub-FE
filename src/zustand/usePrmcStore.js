import { create } from "zustand";

const usePrmcStore = create((set) => ({
  prmcs: [],
  boxOffPrmcs: [],
  isLoading: false,
  error: null,
  setPrmcs: (prmcs) => set({ prmcs }),
  setBoxOffPrmcs: (boxOffPrmcs) => set({ boxOffPrmcs }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export default usePrmcStore;
