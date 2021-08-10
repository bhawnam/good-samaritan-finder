import React, { useState } from "react";
import RequestAccept from "./RequestAccept";
import Table from 'react-bootstrap/Table';

export default function MatchedRequests(props) {
  const { username, matchedRequests } = props;

  const matchingRequestsTableData = [];
  let i = 1;
  for (const currentMatchingRequest of Object.values(matchedRequests)) {
    // let currentMatchingRequest = matchedRequests[request_id];
    const requestAcceptCard = (
      <RequestAccept
        key={currentMatchingRequest.request_id}
        i = {i}
        request_id={currentMatchingRequest.request_id}
        service_type={currentMatchingRequest.service_type}
        for_num_persons={currentMatchingRequest.for_num_persons}
        distance = {currentMatchingRequest.distance}
        handleAcceptRequest={handleAcceptBtn}
      />
    );
    i++;
    matchingRequestsTableData.push(requestAcceptCard);
  }

  function refreshPage() {
    window.location.reload(false);
  }

  function handleAcceptBtn(request_id) {
    console.log(request_id);
    swal.fire({
      title: 'Are you sure?',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes!'
    }).
    then((result) => {
      if (result.isConfirmed) {
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
            })
            .then((result) => {
              if (result.isConfirmed) {
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
    });
  }

  return (
    <>
      <div className="matchedrequests">
        <h4> <b> MATCHED REQUESTS </b> </h4>
        <p> We have found the following requests by our beneficiaries 
          which match your offerlings and are listed below. We apprecited 
          your help! </p>
        <Table striped bordered hover responsive="md" className="matchedrequeststable">
          <thead>
            <tr>
              <th> # </th>
              <th> Requested Service Type</th>
              <th> Number of PAX </th>
              <th> Distance (in Miles) </th>
              <th></th>
            </tr>
          </thead>
          <tbody>{matchingRequestsTableData}</tbody>
        </Table>
      </div>
    </>
  );
}
