import { create } from "zustand";

const useTheaterStore = create((set) => ({
  regions: [],
  // theaters: [],
  // searchTheater: [],
  // favoriteTheaters: [],
  // selectedRegion: null,
  isLoading: false,
  error: null,
  setRegions: (regions) => set({ regions }),
  // setTheaters: (theaters) => set({ theaters }),
  // setSearchTheater: (theater) => set({ searchTheater: theater }),
  // setSelectedRegion: (region) => set({ selectedRegion: region }),
  // setFavoriteTheaters: (theater) => set({ favoriteTheaters: theater }),
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export default useTheaterStore;
