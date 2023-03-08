import Pet from "./Pet";

const Results = ({ data, setRequestParams }) => {
  const { pets, hasNext, startIndex } = data;
  console.log(data);
  const prevPage = () => {
    setRequestParams((old) => {
      return { ...old, page: `${parseInt(old.page) - 1}` };
    });
  };

  const nextPage = () => {
    setRequestParams((old) => {
      return { ...old, page: `${parseInt(old.page) + 1}` };
    });
  };

  return (
    <div className="search">
      {!pets.length ? (
        <h1>No Pets Found</h1>
      ) : (
        pets.map((pet) => (
          <Pet
            name={pet.name}
            id={pet.id}
            breed={pet.breed}
            animal={pet.animal}
            images={pet.images}
            location={`${pet.city}, ${pet.state}`}
            key={pet.id}
          />
        ))
      )}
      <div className="pagination-container">
        <div>
          <div className={startIndex === 0 ? "hide" : ""}>
            <button onClick={prevPage}>Previous</button>
          </div>
        </div>
        <div>
          <div className={`${!hasNext ? "hide" : ""}`}>
            <button onClick={nextPage} disabled={!hasNext ? true : false}>
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Results;
