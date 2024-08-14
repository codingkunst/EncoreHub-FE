import { create } from "zustand";

const usePrmcStore = create((set) => ({
  prmcs: [],
  boxOffPrmcs: [],
  favoritePfmcs: [],
  isLoading: false,
  error: null,
  setPrmcs: (prmcs) => set({ prmcs }),
  setBoxOffPrmcs: (boxOffPrmcs) => set({ boxOffPrmcs }),
  setFavoritePfmcs: (favoritePfmcs) => set({ favoritePfmcs }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export default usePrmcStore;
