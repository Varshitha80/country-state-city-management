import React from "react";

const CityList = ({ countryId, state, addCity, editCity, deleteCity }) => {
  return (
    <div className="city-list">
      <h4>Cities in {state.name}</h4>
      <button
        onClick={() => addCity(countryId, state.id)}
        className="add-button"
      >
        Add City
      </button>
      {state.cities.map((city) => (
        <div key={city.id} className="city-item">
          <h5>{city.name}</h5>
          <button
            onClick={() => editCity(countryId, state.id, city.id)}
            className="edit-button"
          >
            Edit
          </button>
          <button
            onClick={() => deleteCity(countryId, state.id, city.id)}
            className="delete-button"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default CityList;