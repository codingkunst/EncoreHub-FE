import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchBoxOffPrmcs } from "../api/prmc";
import usePrmcStore from "../zustand/usePrmcStore";

export const useFetchBoxOffPrmcs = () => {
  const setBoxOffPrmcs = usePrmcStore((state) => state.setBoxOffPrmcs);
  return useQuery({
    queryKey: ["boxOffPrmcs"],
    queryFn: fetchBoxOffPrmcs,
    onSuccess: (data) => {
      setBoxOffPrmcs(data);
      console.log("success");
    },
    onError: (error) => {
      console.error("Error fetching regions", error);
    },
    enabled: true,
  });
};
