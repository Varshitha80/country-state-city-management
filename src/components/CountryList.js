import React, { useState } from "react";
import StateList from "./StateList";

const CountryList = ({
  countries,
  editCountry,
  deleteCountry,
  addState,
  editState,
  deleteState,
  addCity,
  editCity,
  deleteCity,
}) => {
  const [selectedCountryId, setSelectedCountryId] = useState(null);

  return (
    <div className="country-list">
      {countries.map((country) => (
        <div key={country.id} className="country-item">
          <h2>{country.name}</h2>
          <button
            onClick={() => editCountry(country.id)}
            className="edit-button"
          >
            Edit
          </button>
          <button
            onClick={() => deleteCountry(country.id)}
            className="delete-button"
          >
            Delete
          </button>
          <button
            onClick={() =>
              setSelectedCountryId(
                selectedCountryId === country.id ? null : country.id
              )
            }
            className="toggle-button"
          >
            {selectedCountryId === country.id ? "Hide States" : "View States"}
          </button>
          {selectedCountryId === country.id && (
            <StateList
              country={country}
              addState={addState}
              editState={editState}
              deleteState={deleteState}
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

export default CountryList;