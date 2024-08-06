import { useEffect } from "react";
import { useFetchRegions, useFetchTheaters } from "../hooks/useTheaters";
import useTheaterStore from "../zustand/useTheatersStore";

const PrmcPage = () => {
  //   const {
  //     data: regions,
  //     isLoading: isRLoading,
  //     isError: isRError,
  //     error: Rerror,
  //   } = useFetchRegions();
  //   const { setSelectedRegion, selectedRegion } = useTheaterStore((state) => ({
  //     selectedRegion: state.selectedRegion,
  //     setSelectedRegion: state.setSelectedRegion,
  //     setRegions: state.setRegions,
  //   }));
  //   const {
  //     data: theaters,
  //     isLoading: isTLoading,
  //     isError: isTError,
  //     error: Terror,
  //   } = useFetchTheaters(selectedRegion);
  //   if (isRLoading || isTLoading) return <p>Loading...</p>;
  //   if (isRError || isTError)
  //     return <p>Error: {Rerror.message || Terror.message}</p>;
  //   console.log(selectedRegion);
  //   console.log(theaters);
  //   const handleButtonClick = (regionId, event) => {
  //     event.preventDefault();
  //     setSelectedRegion(regionId);
  //   };
  //   return (
  //     <div>
  //       <ul>
  //         {regions.map((region) => (
  //           <li key={region.id}>
  //             <button
  //               type="button"
  //               onClick={(event) => handleButtonClick(region.id, event)}
  //             >
  //               {region.region}
  //             </button>
  //           </li>
  //         ))}
  //       </ul>
  //       {selectedRegion ? (
  //         theaters.venues ? (
  //           <ul>
  //             {theaters.venues.map((theater) => (
  //               <li key={theater.id}>{theater.venue}</li>
  //             ))}
  //           </ul>
  //         ) : (
  //           <p>no region</p>
  //         )
  //       ) : (
  //         <p>No region selected</p>
  //       )}
  //     </div>
  //   );
};

export default PrmcPage;
