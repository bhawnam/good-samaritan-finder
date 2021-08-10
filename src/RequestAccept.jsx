import React from "react";

export default function RequestAccept(props) {
  const {request_id, handleAcceptRequest, service_type, for_num_persons, distance, i} = props;

  return (
    <>
      <tr key={request_id}>
        <td> {i} </td>
        <td>{service_type} </td>
        <td> {for_num_persons}</td>
        <td> {distance}</td>
        <td>
          <button type="submit" className="btn btn-primary" onClick={()=>handleAcceptRequest(request_id)}>
            Accept
          </button>
        </td>
      </tr>
    </>
  );
}
