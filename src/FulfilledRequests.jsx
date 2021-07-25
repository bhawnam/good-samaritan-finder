import React, { useState } from "react";
import RequestFeedback from "./RequestFeedback";

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
          alert("Your feedback has been registered");
          setDisable(true);
        } else {
          alert("Sorry something went wrong!");
        }
      });
    });
  }

  return (
    <React.Fragment>
      <div className="fulfilledrequests">
        <h6> Give feedback for fulfilled requests: </h6>
        <table className="fulfilledrequeststable">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Service Type</th>
            </tr>
          </thead>
          <tbody>{fulfilledRequestsTableData}</tbody>
        </table>
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
    </React.Fragment>
  );
}
