import React, { useState } from "react";
import RequestAccept from "./RequestAccept";
import RequestFeedback from "./RequestFeedback";

export default function UserProfile(props){

    const [requestForm, setRequestForm] = useState(false);
    const [requestServiceType, setRequestServiceType] = useState("");
    const [requestForNumPersons, setRequestForNumPersons] = useState("");
   
    const [offeringForm, setOfferingForm] = useState(false);
    const [offeringServiceType, setOfferingServiceType] = useState("");
    const [offeringForNumPersons, setOfferingForNumPersons] = useState("");
    const [availableDate, setAvailableDate] = useState("");
  
    const [feedbackForm, setFeedbackForm] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState("");
    const [feedbackRequestID, setFeedbackRequestID] = useState("");
  
    const [disable, setDisable] = useState(false);
  
    const {username, requests, offerings, matchedRequests, fulfilledRequests} = props
  
    const requestsTableData = [];
    for (const request_id in requests){
      let currentRequest = requests[request_id];
      requestsTableData.push(
        <tr key={currentRequest.request_id}>
          <td>{currentRequest.request_id}</td>
          <td>{currentRequest.service_type}</td>
          <td>{currentRequest.request_active.toString()}</td>
        </tr>
      );
      }
    const offeringsTableData = [];
    for (const offered_id in offerings){
      let currentOffering = offerings[offered_id];
      offeringsTableData.push(
        <tr key={currentOffering.offered_id}>
          <td>{currentOffering.offered_id}</td>
          <td>{currentOffering.service_type}</td>
          <td>{currentOffering.for_num_persons}</td>
        </tr>
      );
      }
    const matchingRequestsTableData = [];
    for (const currentMatchingRequest of Object.values(matchedRequests)){
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
    const fulfilledRequestsTableData = [];
    for (const currentFulfilledRequest of Object.values(fulfilledRequests)){
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
  
    function refreshPage(){
      window.location.reload(false);
    }
  
    function handleAcceptBtn(request_id){
      console.log(request_id)
      fetch("/accept-request",
      {
        method : "POST",
        headers : 
        {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({username, request_id}),
        })
        .then((response) => {
          response.json()
        .then((result) => {
          if ((result.success) == true){
            alert("Thank you for providing your service. You will be receiving an email with the next steps.")
        } else {
          alert("Sorry something went wrong!")
        }
        }); 
        });
    }
  
    function handleFeedbackButton(request_id){
      setFeedbackForm(true);
      setFeedbackRequestID(request_id);
      setDisable(true);
    }
  
    function handleFeedbackResponse(event){
      event.preventDefault();
      fetch("/accept-feedback",
      {
        method : "POST",
        headers : 
        {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({username, feedbackRequestID, feedbackMessage}),
        })
        .then((response) => {
          response.json()
        .then((result) => {
          if ((result.success) == true){
            setFeedbackForm(false);
            alert("Your feedback has been registered");
            setDisable(true);
        } else {
          alert("Sorry something went wrong!");
        }
        }); 
        });
    }
  
    function handleRequestButton(){
      setRequestForm(true);
    }
  
    function addRequest(event){
      event.preventDefault();
       fetch("/add-request", 
      {
        method : "POST",
        headers : 
        {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({username, requestServiceType, requestForNumPersons}),
        })
        .then((response) => {
        response.json()
        .then((result) => {
          if ((result.success) == true){
            alert("Thank you for your request! We found a matching volunteer. You will be connected to them shortly")
            setRequestServiceType("");
            setRequestForNumPersons("");
            setRequestForm(false);
            refreshPage();
          } else if ((result.success == false)){
            alert("Thank you for your request! We will find a matching volunteer")
            setRequestServiceType("");
            setRequestForNumPersons("");
            setRequestForm(false);
            refreshPage();
          } else {
            alert("Sorry there was an error!");
            }
        });
      });
    }
  
    function handleOfferingButton(){
      setOfferingForm(true);
    }
  
    function addOffering(event){
      event.preventDefault();
      fetch("/add-offering",
      {
        method: "POST",
        headers :
        {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({username, offeringServiceType, offeringForNumPersons, availableDate}),
      })
      .then((response) => {
      response.json()
      .then((result) => {
        if((result.success) == true){
          alert("Thank you for your offering! We found a matching beneficiary request. You will be connected to them shortly")
          setOfferingServiceType("");
          setOfferingForNumPersons("");
          setAvailableDate("");
          setOfferingForm(false);
          refreshPage();
        }
        else if ((result.success) == false){
          alert("Thank you for your offering! We will find a matching request")
          setOfferingServiceType("");
          setOfferingForNumPersons("");
          setAvailableDate("");
          setOfferingForm(false);
          refreshPage();
        }
        else {
          alert("Sorry there was an error!")
        }
      });  
      });
    }
  
    return (
      <React.Fragment>
      <h3> Welcome {username}</h3>
      <div className="services">
      <div className="userservices">
        <h6> Your requests: </h6>
        <table className="requeststable">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Service Type</th>
              <th>Active</th>
            </tr>
          </thead>
          <tbody>{requestsTableData}</tbody>
        </table>
      </div>
      <button type="submit" className="btn" onClick={handleRequestButton}> Add a request</button>
      </div>
      {requestForm ? (
        <form onSubmit={addRequest}>
          <br/>
          <div className="form-request">
          <label> Service Type </label>
          <select className="form-input" value={requestServiceType} onChange={(event) => setRequestServiceType(event.target.value)}>  
          <option value="">Select a service</option>
          <option value="PACKAGED_MEAL_KIT"> Packaged Meal Kit</option>
          <option value="WATER"> Water </option>
          <option value="FIRST_AID_KIT"> First Aid Kit</option>
          <option value="BLANKET"> Blanket</option>
          <option value="PET_FOOD"> Pet Food </option>
          </select>
        </div>
        <br/>
        <div className="form-request">
          <label>For number of people </label>
          <input type="text" className="form-input" value={requestForNumPersons} onChange={(event) => setRequestForNumPersons(event.target.value)} required/>
        </div>
        <button type="submit" className="btn"> Add </button>
        </form>
      ) : (null) }
      <br />
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
      <button type="submit" className="btn" onClick={handleOfferingButton}> Add an offering </button>
      </div>
      {offeringForm ? (
        <form onSubmit={addOffering}>
          <br/>
          <div className="form-offering">
          <label> Service Type </label>
          <select className="form-input" value={offeringServiceType} onChange={(event) => setOfferingServiceType(event.target.value)}>  
          <option value="">Select a service</option>
          <option value="PACKAGED_MEAL_KIT"> Packaged Meal Kit</option>
          <option value="WATER"> Water </option>
          <option value="FIRST_AID_KIT"> First Aid Kit</option>
          <option value="BLANKET"> Blanket</option>
          <option value="PET_FOOD"> Pet Food </option>
          </select>
        </div>
        <br/>
        <div className="form-offering">
          <label>For number of people </label>
          <input type="text" className="form-input" value={offeringForNumPersons} onChange={(event) => setOfferingForNumPersons(event.target.value)} required/>
        </div>
        <br/>
        <div className="form-offering">
          <label> Date of availability </label>
          <input type="date" min="2021-01-01" max="2021-12-31" className="form-input" value={availableDate} onChange={(event) => setAvailableDate(event.target.value)} required/>
        </div>
        <button type="submit" className="btn"> Add </button>
        </form>
      ) : (null) }
      <br/>
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
      <br/>
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
          <br/>
          <div className="form-feedback">
          <label> Feedback Message</label>
          <input type="textarea" className="form-input" value={feedbackMessage} onChange={(event) => setFeedbackMessage(event.target.value)} required/>
        </div>
        <button type="submit" className="btn"> Submit </button> 
        </form>
      ): (null) }
      </React.Fragment>
    );
  }
