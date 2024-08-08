import { create } from "zustand";

const useFavoriteTheatersStore = create((set) => ({
  favoriteTheaters: [],
  setFavoriteTheaters: (favoriteTheaters) => set({ favoriteTheaters }),
  addFavoriteTheater: (theater) =>
    set((state) => ({
      favoriteTheaters: [...state.favoriteTheaters, theater],
    })),
  removeFavoriteTheater: (theaterId) =>
    set((state) => ({
      favoriteTheaters: state.favoriteTheaters.filter(
        (theater) => theater.id !== theaterId
      ),
    })),
}));

export default useFavoriteTheatersStore;
