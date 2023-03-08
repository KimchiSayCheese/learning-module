// import { useState, useEffect, useCallback } from "react";
import fetchBreedList from "./fetchBreedList";
import { useQuery } from "@tanstack/react-query";

export default function useBreedList(animal) {
  const results = useQuery(["breeds", animal], fetchBreedList);

  return [results?.data?.breeds ?? [], results.status];
}

// const localCache = {};

// export default function useBreedList(animal) {
//   const [breedList, setBreedList] = useState([]);
//   const [status, setStatus] = useState("unloaded");

//   const requestBreedList = useCallback(async () => {
//     console.log("duff");
//     setBreedList([]);
//     setStatus("loading");

//     const res = await fetch(
//       `http://pets-v2.dev-apis.com/breeds?animal=${animal}`
//     );

//     const json = await res.json();
//     localCache[animal] = json.breeds || [];

//     setBreedList(localCache[animal]);
//     setStatus("loaded");
//   }, [animal]);

//   useEffect(() => {
//     console.log("im run");
//     if (!animal) {
//       setBreedList([]);
//     } else if (localCache[animal]) {
//       setBreedList(localCache[animal]);
//     } else {
//       requestBreedList();
//     }
//   }, [animal, requestBreedList]);

//   return [breedList, status];
// }
