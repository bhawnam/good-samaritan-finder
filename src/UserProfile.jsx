import React from "react";
import Requests from "./Requests";
import Offerings from "./Offerings";
import MatchedRequests from "./MatchedRequests";
import FulfilledRequests from "./FulfilledRequests";

export default function UserProfile(props) {
  const {username, requests, offerings, matchedRequests, fulfilledRequests} = props

  return (
    <>
      <h3> Welcome, {username}</h3>
      <br />
      <Requests username={username} requests={requests} />
      <br /> <br />
      <Offerings username={username} offerings={offerings} />
      <br /> <br />
      <MatchedRequests username={username} matchedRequests={matchedRequests} />
      <br /> <br />
      <FulfilledRequests
        username={username}
        fulfilledRequests={fulfilledRequests}
      />
    </>
  );
}
