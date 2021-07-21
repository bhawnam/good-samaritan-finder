import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Login from "./Login";
import Register from "./Register";
import UserProfile from "./UserProfile";
import Footer from "./Footer";
import TermsOfService from "./TermsOfService";
// from the current folder (.) import MapExample
import MapExample from "./MapExample";
import "./App.css";

export default function App() {
  const [requests, setRequests] = useState({});
  const [offerings, setOfferings] = useState({});
  const [matchedRequests, setMatchedRequests] = useState({});
  const [fulfilledRequests, setFulfilledRequests] = useState({});

  const [username, setUsername] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  useEffect(() => {
    if (username) {
      localStorage.setItem("user", JSON.stringify(username));
      setIsLogged(true);
    }
  }, [username]);

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUsername(JSON.parse(user));
    }
  }, []);

  useEffect(() => {
    fetch("api/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => response.json())
      .then((requestsData) => {
        setRequests(requestsData);
      });
  }, [username]);

  useEffect(() => {
    fetch("api/offerings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => response.json())
      .then((offeringsData) => {
        setOfferings(offeringsData);
      });
  }, [username]);

  useEffect(() => {
    fetch("api/matched-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => response.json())
      .then((setMatchedRequestsData) => {
        setMatchedRequests(setMatchedRequestsData);
      });
  }, [username]);

  useEffect(() => {
    fetch("api/show-feedback-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    })
      .then((response) => response.json())
      .then((setFulfilledRequestsData) => {
        setFulfilledRequests(setFulfilledRequestsData);
      });
  }, [username]);

  return (
    <BrowserRouter>
      <Navbar logo="/static/img/logo.png" brand="Good Samaritan Finder" isLogged={isLogged} setIsLogged={setIsLogged}/>
      <div className="container-fluid">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/login">
            <Login username={username} setUsername={setUsername} />
          </Route>
          <Route exact path="/be-a-volunteer">
            <Register />
          </Route>
          <Route exact path="/be-a-beneficiary">
            <MapExample />
            <Register />
          </Route>
          <Route exact path="/welcome-user">
            {/* <SideBar /> */}
            <UserProfile username={username} requests={requests} offerings={offerings} matchedRequests={matchedRequests} fulfilledRequests={fulfilledRequests}/>
          </Route>
          <Route exact path="/terms-of-service">
            <TermsOfService />
          </Route>
          {/* <Route exact path="/requests">
            <Requests username={username} requests={requests} />
          </Route>
          <Route exact path="/offerings">
            <Requests/>
          </Route>
          <Route exact path="/matched-requests">
            <Requests />
          </Route>
          <Route exact path="/fulfilled-requests">
            <Requests />
          </Route> */}
          <div> Sorry Page Not found </div>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}