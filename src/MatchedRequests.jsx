import React, { useState } from "react";
import RequestAccept from "./RequestAccept";

export default function MatchedRequests(props) {
  const { username, matchedRequests } = props;

  const matchingRequestsTableData = [];
  for (const currentMatchingRequest of Object.values(matchedRequests)) {
    // let currentMatchingRequest = matchedRequests[request_id];
    const requestAcceptCard = (
      <RequestAccept
        key={currentMatchingRequest.request_id}
        request_id={currentMatchingRequest.request_id}
        service_type={currentMatchingRequest.service_type}
        for_num_persons={currentMatchingRequest.for_num_persons}
        handleAcceptRequest={handleAcceptBtn}
      />
    );
    matchingRequestsTableData.push(requestAcceptCard);
  }

    function refreshPage() {
    window.location.reload(false);
  }

  function handleAcceptBtn(request_id) {
    console.log(request_id);
    fetch("api/accept-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, request_id }),
    }).then((response) => {
      response.json().then((result) => {
        if (result.success === true) {
          swal.fire({
            text: "Thank you for providing your service. You will be notifed with a text and receive an email shortly with the next steps.",
            showConfirmButton: true,
            confirmButtonText: `Okay`,
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
      <div className="matchedrequests">
        <h6> Matched requests: </h6>
        <table className="matchedrequeststable">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Service Type</th>
              <th>For num persons</th>
            </tr>
          </thead>
          <tbody>{matchingRequestsTableData}</tbody>
        </table>
      </div>
    </>
  );
}
