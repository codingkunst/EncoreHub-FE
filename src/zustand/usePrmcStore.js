import { create } from "zustand";
import { fetchPrmcs } from "../api/prmc";

const usePrmcStore = create((set) => ({
  prmcs: [],
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
}));

export default usePrmcStore;
