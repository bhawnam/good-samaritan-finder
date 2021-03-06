import React from "react";

export default function RequestFeedback(props) {
  const {request_id, handleRequestFeedbackBtn, service_type, feedbackRequestid, i} = props;
  
  return (
    <>
      <tr key={request_id}>
        <td>{i}</td>
        <td>{service_type} </td>
        <td>
          <button type="submit" className="btn btn-outline-success" disabled={feedbackRequestid === request_id} onClick={()=>handleRequestFeedbackBtn(request_id)}>
            Give Feedback
          </button>
        </td>
      </tr>
    </>
  );
}
