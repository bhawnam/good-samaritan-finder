import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

export default function Offerings(props) {
  const [offeringForm, setOfferingForm] = useState(false);
  const [offeringServiceType, setOfferingServiceType] = useState("");
  const [offeringForNumPersons, setOfferingForNumPersons] = useState("");
  const [availableDate, setAvailableDate] = useState("");
  const [show, setShow] = useState(false);

  const { username, offerings } = props;

  const offeringsTableData = [];
  let i = 1;
  for (const offered_id in offerings) {
    const currentOffering = offerings[offered_id];
    offeringsTableData.push(
      <tr key={currentOffering.offered_id}>
        <td>{i}</td>
        <td>{currentOffering.service_type}</td>
        <td>{currentOffering.for_num_persons}</td>
      </tr>
    );
    i++;
  };

  function refreshPage() {
    window.location.reload(false);
  }

  function handleOfferingButton() {
    setOfferingForm(true);
    setShow(true);
  }

  function handleClose(){
    setShow(false);
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
          swal.fire({
            text: "Thank you for your offering! We found a matching beneficiary request for you. You will be connected to them shortly.",
            showConfirmButton: true,
            confirmButtonText: `Okay`,
          })
          .then((result) => {
            if (result.isConfirmed) {
              setOfferingServiceType("");
              setOfferingForNumPersons("");
              setAvailableDate("");
              setOfferingForm(false);
              refreshPage();
            }
          });
        } else if (result.success === false) {
          swal.fire({
            text: "Thank you for your offering! We will find a matching request for you.",
            showConfirmButton: true,
            confirmButtonText: `Okay`,
          })
          .then((result) => {
            if (result.isConfirmed) {
              setOfferingServiceType("");
              setOfferingForNumPersons("");
              setAvailableDate("");
              setOfferingForm(false);
              refreshPage();
            }
          });
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
          <h4> <b> OFFERINGS </b> </h4>
          <p> All your offered services are listed below. </p>
          <Table striped bordered hover responsive="md" className="offeringstable">
            <thead>
              <tr>
                <th> # </th>
                <th> Offered Service Type</th>
                <th> Serving Number of PAX </th>
              </tr>
            </thead>
            <tbody>{offeringsTableData}</tbody>
          </Table>
        </div>
        <button type="submit" className="btn btn-outline-dark col-2" onClick={handleOfferingButton}>
          Add an offering
        </button>
      </div>
      {offeringForm ? (
        <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Add an Offering </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={addOffering}>
          <br />
          <div className="form-offering mb-4">
            <label> Service Type </label>
            <select
              className="form-input mx-2"
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
          <div className="form-offering mb-4">
            <label>For number of people </label>
            <input
              type="text"
              className="form-input mx-2 w-25"
              value={offeringForNumPersons}
              onChange={(event) => setOfferingForNumPersons(event.target.value)}
              required
            />
          </div>
          <div className="form-offering mb-2">
            <label> Date of availability </label>
            <input
              type="date"
              min="2021-01-01"
              max="2021-12-31"
              className="form-input mx-2 w-50"
              value={availableDate}
              onChange={(event) => setAvailableDate(event.target.value)}
              required
            />
          </div>
          <center>
          <button type="submit" className="btn btn-outline-primary">
            Add
          </button>
          </center>
        </form>
        </Modal.Body>
        </Modal>
      ) : null}
    </>
  );
}
