import React, { useState } from "react";
import RequestFeedback from "./RequestFeedback";
import Table from 'react-bootstrap/Table';

export default function FulfilledRequests(props) {
  const [feedbackForm, setFeedbackForm] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");
  const [feedbackRequestID, setFeedbackRequestID] = useState("");

  const [disable, setDisable] = useState(false);

  const { username, fulfilledRequests } = props;

  const fulfilledRequestsTableData = [];
  for (const currentFulfilledRequest of Object.values(fulfilledRequests)) {
    const requestFeedbackCard = (
      <RequestFeedback
        key={currentFulfilledRequest.request_id}
        request_id={currentFulfilledRequest.request_id}
        service_type={currentFulfilledRequest.service_type}
        for_num_persons={currentFulfilledRequest.for_num_persons}
        handleRequestFeedbackBtn={handleFeedbackButton}
        feedbackRequestid={feedbackRequestID}
      />
    );
    fulfilledRequestsTableData.push(requestFeedbackCard);
  }

  function handleFeedbackButton(request_id) {
    setFeedbackForm(true);
    setFeedbackRequestID(request_id);
    setDisable(true);
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
        <h6> Give feedback for fulfilled requests: </h6>
        <Table striped bordered hover responsive="md" className="fulfilledrequeststable">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Service Type</th>
            </tr>
          </thead>
          <tbody>{fulfilledRequestsTableData}</tbody>
        </Table>
      </div>
      {feedbackForm ? (
        <form onSubmit={handleFeedbackResponse}>
          <br />
          <div className="form-feedback">
            <label> Feedback Message</label>
            <input
              type="textarea"
              className="form-input"
              value={feedbackMessage}
              onChange={(event) => setFeedbackMessage(event.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn">
            Submit
          </button>
        </form>
      ) : null}
    </>
  );
}
