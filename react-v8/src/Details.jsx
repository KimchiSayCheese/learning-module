import { useState, useContext } from "react";
import { useParams, useNavigate } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { Carousel2 } from "./Carousel";

import AdoptedPetContext from "./AdoptedPetContext";
import Modal from "./Modal";
import fetchPet from "./fetchPet";
import ErrorBoundary from "./ErrorBoundary";
const Details = () => {
  const navigate = useNavigate();
  const [_, setAdoptedPet] = useContext(AdoptedPetContext);
  const [showModal, setShowModal] = useState(false);
  const { id } = useParams();
  const results = useQuery(["details", id], (q) => {
    console.log(q);
    return fetchPet(q);
  });

  if (results.isLoading) {
    return (
      <div className="loading-pane">
        <h2 className="loader">🤣</h2>
      </div>
    );
  }
  console.log(results.data);
  const pet = results.data.pets[0];

  return (
    <div className="details">
      <Carousel2 images={pet.images} />
      <div>
        <h1>{pet.name}</h1>
        <h2>
          {pet.animal} — {pet.breed} — {pet.city} — {pet.state}
        </h2>
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Adopt {pet.name}
        </button>
        <p>{pet.description}</p>
        {showModal && (
          <Modal>
            <div>
              <h1>Would you like to adopt {pet.name}?</h1>
              <div className="buttons">
                <button
                  onClick={() => {
                    setAdoptedPet(pet);
                    navigate("/");
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => {
                    setShowModal(false);
                  }}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

function DetailsErrorBoundary(props) {
  return (
    <ErrorBoundary>
      <Details {...props} />
    </ErrorBoundary>
  );
}

export default DetailsErrorBoundary;
