import React, { useState } from "react";

export default function RequestAccept(props){

const {request_id, handleAcceptRequest, service_type, for_num_persons} = props;

return (
    <React.Fragment>
    <tr key = {request_id}>
    <td>{request_id}</td>
    <td>{service_type} </td>
    <td> {for_num_persons}</td>
    <td> <button type="submit" className="btn" onClick={()=>handleAcceptRequest(request_id)}> Accept </button>
    </td>
</tr>
</React.Fragment>
);
}