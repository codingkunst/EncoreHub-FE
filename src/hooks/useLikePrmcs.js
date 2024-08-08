// import { useQuery } from "@tanstack/react-query";
// import usePrmcStore from "../zustand/usePrmcStore";
// import { fetchLikePrmcs } from "../api/prmc";

// export const useFetchLikePrmcs = () => {
//   const setLikePrmc = usePrmcStore((state) => state.setLikePrmc);
//   return useQuery({
//     queryKey: ["likePrmcs"],
//     queryFn: fetchLikePrmcs,
//     onSuccess: (data) => {
//       setLikePrmc(data);
//     },
//     onError: (error) => {
//       console.error("Error fetching like prmc", error);
//     },
//   });
// };
