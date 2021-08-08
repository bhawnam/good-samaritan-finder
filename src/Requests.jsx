import React, { useState } from "react";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

export default function Requests(props){

  const [requestForm, setRequestForm] = useState(false);
  const [requestServiceType, setRequestServiceType] = useState("");
  const [requestForNumPersons, setRequestForNumPersons] = useState("");
  const [show, setShow] = useState(false);
  
  const {username, requests} = props
  
  const requestsTableData = [];
  for (const request_id in requests) {
    let currentRequest = requests[request_id];
    requestsTableData.push(
      <tr key={currentRequest.request_id}>
        <td>{currentRequest.request_id}</td>
        <td>{currentRequest.service_type}</td>
        <td>{currentRequest.request_active.toString()}</td>
      </tr>
    );
  }

  function refreshPage() {
    window.location.reload(false);
  }

  function handleRequestButton() {
    setRequestForm(true);
    setShow(true);
  }

  function handleClose(){
    setShow(false);
  }

  function addRequest(event) {
    event.preventDefault();
    fetch("api/add-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username, requestServiceType, requestForNumPersons}),}).then((response) => {
      response.json().then((result) => {
        if (result.success === true) {
          swal.fire({
            text: "Thank you for your request! We found a matching volunteer for you. You will be connected to them shortly.",
            showConfirmButton: true,
            confirmButtonText: `Okay`,
          })
          .then((result) => {
              if(result.isConfirmed) {
                setRequestServiceType("");
                setRequestForNumPersons("");
                setRequestForm(false);
                refreshPage();
              }
            });
        } else if (result.success === false) {
          swal.fire({
            text: "Thank you for your request! We will find a matching volunteer for you.",
            showConfirmButton: true,
            confirmButtonText: `Okay`,
          })
          .then((result) => {
            if (result.isConfirmed) {  
              setRequestServiceType("");
              setRequestForNumPersons("");
              setRequestForm(false);
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

  return(
    <>
      <div className="services">
        <div className="userservices">
          <h6> Your requests: </h6>
          <Table striped bordered hover responsive="md" className="requeststable">
            <thead>
              <tr>
                <th>Request ID</th>
                <th>Service Type</th>
                <th>Active</th>
              </tr>
            </thead>
            <tbody>{requestsTableData}</tbody>
          </Table>
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleRequestButton}>
          Add a request
        </button>
      </div>
      {requestForm ? (
        <Modal centered show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title> Add a Request </Modal.Title>
          </Modal.Header>
          <Modal.Body>
        <form onSubmit={addRequest}>
          <br />
          <div className="form-request mb-4">
            <label> Service Type </label>
            <select className="form-input mx-2" value={requestServiceType} onChange={(event) => setRequestServiceType(event.target.value)}>
              <option value="">Select a service</option>
              <option value="PACKAGED_MEAL_KIT"> Packaged Meal Kit</option>
              <option value="WATER"> Water </option>
              <option value="FIRST_AID_KIT"> First Aid Kit</option>
              <option value="BLANKET"> Blanket</option>
              <option value="PET_FOOD"> Pet Food </option>
            </select>
          </div>
          <div className="form-request mb-2">
            <label>For number of people </label>
            <input
              type="text"
              className="form-input mx-2 w-25"
              value={requestForNumPersons}
              onChange={(event) => setRequestForNumPersons(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
        </Modal.Body>
        </Modal>
      ) : null}
    </>
  );
}
