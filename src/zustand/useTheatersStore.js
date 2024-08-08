import { create } from "zustand";

const useTheaterStore = create((set) => ({
  regions: [],
  theaters: [],
  searchTheaters: [],
  // favoriteTheaters: [],
  selectedRegion: null,
  searchTheaterName: null,
  isLoading: false,
  error: null,
  setRegions: (regions) => set({ regions }),
  setTheaters: (theaters) => set({ theaters }),
  setSearchTheaters: (theater) => set({ searchTheaters: theater }),
  setSelectedRegion: (region) => set({ selectedRegion: region }),
  setSearchTheaterName: (theater) => set({ searchTheaterName: theater }),
  // setFavoriteTheaters: (theater) => set({ favoriteTheaters: theater }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useTheaterStore;
