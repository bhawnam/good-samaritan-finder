import React from "react";
import Requests from "./Requests";
import Offerings from "./Offerings";
import MatchedRequests from "./MatchedRequests";
import FulfilledRequests from "./FulfilledRequests";

export default function UserProfile(props) {
  const {username, requests, offerings, matchedRequests, fulfilledRequests} = props

  return (
    <>
    <div className="profile-image">
      <h2> <b>Welcome, </b> {username}</h2>
      <br />
      <p> 
        Thank you for being a part of the Good Samaritan Network. 
        This is your primary dashboard wheich lets you add a request <br/> when you
        are in need if some assistance or you can put in an offering if you want 
        to help someone in need.
      </p>
      <br/>
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
      </div>
    </>
  );
}
