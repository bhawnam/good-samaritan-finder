import React, { useState } from "react";

export default function Offerings(props) {
  const [offeringForm, setOfferingForm] = useState(false);
  const [offeringServiceType, setOfferingServiceType] = useState("");
  const [offeringForNumPersons, setOfferingForNumPersons] = useState("");
  const [availableDate, setAvailableDate] = useState("");

  const { username, offerings } = props;

  const offeringsTableData = [];
  for (const offered_id in offerings) {
    const currentOffering = offerings[offered_id];
    offeringsTableData.push(
      <tr key={currentOffering.offered_id}>
        <td>{currentOffering.offered_id}</td>
        <td>{currentOffering.service_type}</td>
        <td>{currentOffering.for_num_persons}</td>
      </tr>
    );
  }

  function refreshPage() {
    window.location.reload(false);
  }

  function handleOfferingButton() {
    setOfferingForm(true);
  }

  function addOffering(event) {
    event.preventDefault();
    fetch("api/add-offering", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        offeringServiceType,
        offeringForNumPersons,
        availableDate,
      }),
    }).then((response) => {
      response.json().then((result) => {
        if (result.success === true) {
          swal.fire(
            "Thank you for your offering! We found a matching beneficiary request for you. You will be connected to them shortly."
          );
          setOfferingServiceType("");
          setOfferingForNumPersons("");
          setAvailableDate("");
          setOfferingForm(false);
          refreshPage();
        } else if (result.success === false) {
          swal.fire("Thank you for your offering! We will find a matching request for you.");
          setOfferingServiceType("");
          setOfferingForNumPersons("");
          setAvailableDate("");
          setOfferingForm(false);
          refreshPage();
        } else {
          swal.fire({icon:'error',
            text: "Sorry there was an error!"});
        }
      });
    });
  }

  return (
    <>
      <div className="offerings">
        <div className="userofferings">
          <h6> Your offerings: </h6>
          <table className="offeringstable">
            <thead>
              <tr>
                <th>Offering ID</th>
                <th>Service Type</th>
                <th>For Num persons</th>
              </tr>
            </thead>
            <tbody>{offeringsTableData}</tbody>
          </table>
        </div>
        <button type="submit" className="btn" onClick={handleOfferingButton}>
          Add an offering
        </button>
      </div>
      {offeringForm ? (
        <form onSubmit={addOffering}>
          <br />
          <div className="form-offering">
            <label> Service Type </label>
            <select
              className="form-input"
              value={offeringServiceType}
              onChange={(event) => setOfferingServiceType(event.target.value)}
            >
              <option value="">Select a service</option>
              <option value="PACKAGED_MEAL_KIT"> Packaged Meal Kit</option>
              <option value="WATER"> Water </option>
              <option value="FIRST_AID_KIT"> First Aid Kit</option>
              <option value="BLANKET"> Blanket</option>
              <option value="PET_FOOD"> Pet Food </option>
            </select>
          </div>
          <br />
          <div className="form-offering">
            <label>For number of people </label>
            <input
              type="text"
              className="form-input"
              value={offeringForNumPersons}
              onChange={(event) => setOfferingForNumPersons(event.target.value)}
              required
            />
          </div>
          <br />
          <div className="form-offering">
            <label> Date of availability </label>
            <input
              type="date"
              min="2021-01-01"
              max="2021-12-31"
              className="form-input"
              value={availableDate}
              onChange={(event) => setAvailableDate(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Add
          </button>
        </form>
      ) : null}
    </>
  );
}
