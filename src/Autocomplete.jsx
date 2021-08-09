import React from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getZipCode,
} from "use-places-autocomplete";

export const PlacesAutocomplete = ({setAddress, setZipcode}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      /* Define search scope here */
    },
    debounce: 300,
  });

  const handleInput = (e) => {
    // Update the keyword of the input element
    setValue(e.target.value);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter to "false"
    setValue(description, false);
    setAddress(description);
    clearSuggestions();

    // Get zipcode based on address selected
    getGeocode({ address: description })
      .then((results) => getZipCode(results[0], false))
      .then((zipCode ) => {
        setZipcode(zipCode);
        console.log("Zipcode: ", { zipCode });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  const renderSuggestions = () =>
    data.map((suggestion) => {
      const {
        place_id,
        structured_formatting: { main_text, secondary_text },
      } = suggestion;

      return (
        <li key={place_id} onClick={handleSelect(suggestion)}>
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div>
      <input
        value={value}
        className="form-input mx-2 w-100"
        onChange={handleInput}
        disabled={!ready}
        placeholder="Street address"
      />
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {status === "OK" && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
