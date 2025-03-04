import React, { useState } from "react";
import CityList from "./CityList";

const StateList = ({
  country,
  addState,
  editState,
  deleteState,
  addCity,
  editCity,
  deleteCity,
}) => {
  const [selectedStateId, setSelectedStateId] = useState(null);

  return (
    <div className="state-list">
      <h3>States in {country.name}</h3>
      <button
        onClick={() => addState(country.id)}
        className="add-button"
      >
        Add State
      </button>
      {country.states.map((state) => (
        <div key={state.id} className="state-item">
          <h4>{state.name}</h4>
          <button
            onClick={() => editState(country.id, state.id)}
            className="edit-button"
          >
            Edit
          </button>
          <button
            onClick={() => deleteState(country.id, state.id)}
            className="delete-button"
          >
            Delete
          </button>
          <button
            onClick={() =>
              setSelectedStateId(
                selectedStateId === state.id ? null : state.id
              )
            }
            className="toggle-button"
          >
            {selectedStateId === state.id ? "Hide Cities" : "View Cities"}
          </button>
          {selectedStateId === state.id && (
            <CityList
              countryId={country.id}
              state={state}
              addCity={addCity}
              editCity={editCity}
              deleteCity={deleteCity}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default StateList;