import React, { useState } from "react";

export default function RequestFeedback(props){
  
    const {request_id, handleRequestFeedbackBtn, service_type, feedbackRequestid} = props;
  
    return (
      <React.Fragment>
      <tr key = {request_id}>
      <td>{request_id}</td>
      <td>{service_type} </td>
      <td> <button type="submit" className="btn" disabled={feedbackRequestid === request_id} onClick={()=>handleRequestFeedbackBtn(request_id)}> Give Feedback </button>
      </td>
    </tr>
    </React.Fragment>
    );
  }