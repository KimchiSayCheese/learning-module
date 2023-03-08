import { useState, useContext } from "react";
import Results from "./Results";
import { useQuery } from "@tanstack/react-query";
import fetchSearch from "./fetchSearch";
import useBreedList from "./useBreedList";
import AdoptedPetContext from "./AdoptedPetContext";
const ANIMALS = ["bird", "cat", "dog", "rabbit", "reptile"];

const SearchParams = () => {
  // const [location, setLocation] = useState("Seattle, WA");
  const [adoptedPet, _] = useContext(AdoptedPetContext);
  const [requestParams, setRequestParams] = useState({
    location: "",
    animal: "",
    breed: "",
    page: "0",
  });
  const [animal, setAnimal] = useState("");
  // const [breed, setBreed] = useState("");
  // const [pets, setPets] = useState([]);
  const [breeds] = useBreedList(animal);

  const results = useQuery(["search", requestParams], fetchSearch);
  const data = { ...results?.data };
  data.pets ??= [];
  console.log(data?.pets);

  //   const requestPets = useCallback(async () => {
  //     console.log("u ran!");
  //     const res = await fetch(
  //       `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  //     );
  //     const json = await res.json();

  //     setPets(json.pets);
  //   }, [animal, location, breed]);

  //   useEffect(() => {
  //     requestPets();
  //   }, [requestPets]); // eslint-disable-line react-hooks/exhaustive-deps

  //   const requestPets = async () => {
  //     const res = await fetch(
  //       `http://pets-v2.dev-apis.com/pets?animal=${animal}&location=${location}&breed=${breed}`
  //     );
  //     const json = await res.json();

  //     setPets(json.pets);
  //   };
  //   useEffect(() => {
  //     requestPets();
  //   }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          //   requestPets();
          const formData = new FormData(e.target);
          const obj = {
            animal: formData.get("animal") ?? "",
            breed: formData.get("breed") ?? "",
            location: formData.get("location") ?? "",
            page: data.startIndex,
          };

          setRequestParams(obj);
        }}
      >
        {adoptedPet && (
          <div className="pet image-container">
            <img src={adoptedPet.images[0]} alt={adoptedPet.name} />
          </div>
        )}
        <label htmlFor="location">
          Location
          <input id="location" name="location" placeholder="location" />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            name="animal"
            value={animal}
            onChange={(e) => setAnimal(e.target.value)}
          >
            <option />
            {ANIMALS.map((animal) => (
              <option key={animal}>{animal}</option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select disabled={breeds.length === 0} id="breed" name="breed">
            <option />
            {breeds.map((breed) => (
              <option key={breed}>{breed}</option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </form>
      {/* {pets.map((pet) => (
        <Pet
          name={pet.name}
          animal={pet.animal}
          breed={pet.breed}
          key={pet.id}
        />
      ))} */}
      {/* <Results data={data} /> */}
      {results.isSuccess && (
        <Results data={data} setRequestParams={setRequestParams} />
      )}
    </div>
  );
};

export default SearchParams;
