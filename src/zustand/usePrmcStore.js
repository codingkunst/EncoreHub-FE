import { create } from "zustand";
import { fetchLikePrmcs, fetchPrmcs } from "../api/prmc";

const usePrmcStore = create((set) => ({
  prmcs: [],
  likePrmc: [],
  isLoading: false,
  error: null,
  fetchPrmcs: async () => {
    const data = await fetchPrmcs();
    set({ prmcs: data });
  },
  getRankedList: () => {
    const state = usePrmcStore.getState();
    return state.prmcs.slice().sort((a, b) => a.rnum - b.rnum);
  },
  getUpcomingList: () => {
    const state = usePrmcStore.getState();
    return state.prmcs
      .slice()
      .sort((a, b) => new Date(a.ticketDate) - new Date(b.ticketDate));
  },
  setLikePrmc: async () => {
    const data = await fetchLikePrmcs();
    set({ likePrmc: data });
  },
  setError: (error) => set({ error }),
  setLoading: (isLoading) => set({ isLoading }),
}));

export default usePrmcStore;
