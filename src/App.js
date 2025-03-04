import React, { useState, useEffect } from "react";
import CountryList from "./components/CountryList";
import ConfirmationDialog from "./components/ConfirmationDialog";
import "./App.css";

const App = () => {
  // Load data from localStorage on initial render
  const [countries, setCountries] = useState(() => {
    const savedCountries = JSON.parse(localStorage.getItem("countries"));
    return savedCountries || [];
  });

  const [showConfirmation, setShowConfirmation] = useState(false);
  const [entityToDelete, setEntityToDelete] = useState({ type: null, id: null });

  // Save data to localStorage whenever countries change
  useEffect(() => {
    localStorage.setItem("countries", JSON.stringify(countries));
  }, [countries]);

  // Add a new country
  const addCountry = () => {
    const name = prompt("Enter country name:");
    if (name) {
      const newCountry = { id: Date.now(), name, states: [] };
      setCountries([...countries, newCountry]);
    }
  };

  // Edit a country
  const editCountry = (id) => {
    const newName = prompt("Enter new country name:");
    if (newName) { // Only update if the user provides a name
      const updatedCountries = countries.map((country) =>
        country.id === id ? { ...country, name: newName } : country
      );
      setCountries(updatedCountries);
    }
  };

  // Delete a country
  const deleteCountry = (id) => {
    setEntityToDelete({ type: "country", id });
    setShowConfirmation(true);
  };

  // Add a state to a country
  const addState = (countryId) => {
    const stateName = prompt("Enter state name:");
    if (stateName) { // Only add if the user provides a name
      const updatedCountries = countries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              states: [
                ...country.states,
                { id: Date.now(), name: stateName, cities: [] },
              ],
            }
          : country
      );
      setCountries(updatedCountries);
    }
  };

  // Edit a state
  const editState = (countryId, stateId) => {
    const newName = prompt("Enter new state name:");
    if (newName) { // Only update if the user provides a name
      const updatedCountries = countries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              states: country.states.map((state) =>
                state.id === stateId ? { ...state, name: newName } : state
              ),
            }
          : country
      );
      setCountries(updatedCountries);
    }
  };

  // Delete a state
  const deleteState = (countryId, stateId) => {
    setEntityToDelete({ type: "state", id: stateId, countryId });
    setShowConfirmation(true);
  };

  // Add a city to a state
  const addCity = (countryId, stateId) => {
    const cityName = prompt("Enter city name:");
    if (cityName) { // Only add if the user provides a name
      const updatedCountries = countries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              states: country.states.map((state) =>
                state.id === stateId
                  ? { ...state, cities: [...state.cities, { id: Date.now(), name: cityName }] }
                  : state
              ),
            }
          : country
      );
      setCountries(updatedCountries);
    }
  };

  // Edit a city
  const editCity = (countryId, stateId, cityId) => {
    const newName = prompt("Enter new city name:");
    if (newName) { // Only update if the user provides a name
      const updatedCountries = countries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              states: country.states.map((state) =>
                state.id === stateId
                  ? {
                      ...state,
                      cities: state.cities.map((city) =>
                        city.id === cityId ? { ...city, name: newName } : city
                      ),
                    }
                  : state
              ),
            }
          : country
      );
      setCountries(updatedCountries);
    }
  };

  // Delete a city
  const deleteCity = (countryId, stateId, cityId) => {
    setEntityToDelete({ type: "city", id: cityId, countryId, stateId });
    setShowConfirmation(true);
  };

  // Handle confirmation for deletion
  const handleConfirmDelete = () => {
    const { type, id, countryId, stateId } = entityToDelete;

    if (type === "country") {
      const updatedCountries = countries.filter((country) => country.id !== id);
      setCountries(updatedCountries);
    } else if (type === "state") {
      const updatedCountries = countries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              states: country.states.filter((state) => state.id !== id),
            }
          : country
      );
      setCountries(updatedCountries);
    } else if (type === "city") {
      const updatedCountries = countries.map((country) =>
        country.id === countryId
          ? {
              ...country,
              states: country.states.map((state) =>
                state.id === stateId
                  ? {
                      ...state,
                      cities: state.cities.filter((city) => city.id !== id),
                    }
                  : state
              ),
            }
          : country
      );
      setCountries(updatedCountries);
    }

    setShowConfirmation(false);
    setEntityToDelete({ type: null, id: null });
  };

  const handleCancelDelete = () => {
    setShowConfirmation(false);
    setEntityToDelete({ type: null, id: null });
  };

  return (
    <div className="app">
      <h1>Country Management</h1>
      <button onClick={addCountry} className="add-button">
        Add Country
      </button>
      <CountryList
        countries={countries}
        editCountry={editCountry}
        deleteCountry={deleteCountry}
        addState={addState}
        editState={editState}
        deleteState={deleteState}
        addCity={addCity}
        editCity={editCity}
        deleteCity={deleteCity}
      />
      {showConfirmation && (
        <ConfirmationDialog
          message={`Are you sure you want to delete this ${entityToDelete.type}?`}
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </div>
  );
};

export default App;