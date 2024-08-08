// import React, { useState, useEffect } from "react";
// import { fetchRankPerformances } from "../../api/prmc";

// const WeeklyRankList = () => {
//   const [performances, setPerformances] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getPerformances = async () => {
//       try {
//         const data = await fetchRankPerformances();
//         setPerformances(data);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getPerformances();
//     console.log(performances);
//   }, []);

//   return (
//     <div>
//       <h1>Performance Rankings</h1>
//       <ul>
//         {performances.map((performance, index) => (
//           <li key={index} style={{ marginBottom: "20px" }}>
//             <h1>{performance.prfnm}</h1>
//             <img
//               src={performance.poster}
//               style={{ width: "150px", height: "auto", borderRadius: "8px" }}
//             />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default WeeklyRankList;
