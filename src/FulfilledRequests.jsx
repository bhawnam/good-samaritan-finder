import React, { useState } from "react";
import RequestFeedback from "./RequestFeedback";
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';

export default function FulfilledRequests(props) {
  const [feedbackForm, setFeedbackForm] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackRequestID, setFeedbackRequestID] = useState("");

  const [show, setShow] = useState(false);
  const [disable, setDisable] = useState(false);

  const { username, fulfilledRequests } = props;

  const fulfilledRequestsTableData = [];
  let i = 1;
  for (const currentFulfilledRequest of Object.values(fulfilledRequests)) {
    const requestFeedbackCard = (
      <RequestFeedback
        key={currentFulfilledRequest.request_id}
        i = {i}
        request_id={currentFulfilledRequest.request_id}
        service_type={currentFulfilledRequest.service_type}
        for_num_persons={currentFulfilledRequest.for_num_persons}
        handleRequestFeedbackBtn={handleFeedbackButton}
        feedbackRequestid={feedbackRequestID}
      />
    );
    i++;
    fulfilledRequestsTableData.push(requestFeedbackCard);
  }

  function handleFeedbackButton(request_id) {
    setFeedbackForm(true);
    setFeedbackRequestID(request_id);
    setDisable(true);
    setShow(true);
  }

  function handleClose(){
    setDisable(false);
    setShow(false);
  }

  function handleFeedbackResponse(event) {
    event.preventDefault();
    fetch("api/accept-feedback", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, feedbackRequestID, feedbackMessage }),
    }).then((response) => {
      response.json().then((result) => {
        if (result.success === true) {
          setFeedbackForm(false);
          swal.fire({
            position: 'center',
            icon: 'success',
            text: 'Your feedback has been registered',
            showConfirmButton: false,
            timer: 2000
          });
          setDisable(true);
        } else {
          swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!',
            timer: 2000
          });
        }
      });
    });
  }

  return (
    <>
      <div className="fulfilledrequests">
        <h4> <b> FEEDBACK: </b> </h4>
        <p> We have gathered all your fulfilled requests below. Please leave a note for our Volunteers
          to let them know how they did. 
        </p>
        <Table striped bordered hover responsive="md" className="fulfilledrequeststable">
          <thead>
            <tr>
              <th> # </th>
              <th>Requested Service Type</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{fulfilledRequestsTableData}</tbody>
        </Table>
      </div>
      {feedbackForm ? (
        <Modal centered show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Leave a Note </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={handleFeedbackResponse}>
          <div className="form-feedback mb-2">
            <label> Feedback Message</label>
            <input
              type="textarea"
              className="form-input mx-2 w-50"
              value={feedbackMessage}
              onChange={(event) => setFeedbackMessage(event.target.value)}
              required
            />
          </div>
          <center>
          <button type="submit" className="btn btn-outline-primary">
            Submit
          </button>
          </center>
        </form>
        </Modal.Body>
        </Modal>
      ) : null}
    </>
  );
}
