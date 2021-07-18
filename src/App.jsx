import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import Login from "./Login";
import Footer from "./Footer";
import TermsOfService from "./TermsOfService";
// from the current folder (.) import MapExample
import MapExample from "./MapExample";
import "./App.css";

export default function App() {
  const [requests, setRequests] = React.useState({});
  const [offerings, setOfferings] = React.useState({});
  const [matchedRequests, setMatchedRequests] = React.useState({});
  const [fulfilledRequests, setFulfilledRequests] = React.useState({});
  const [username, setUsername] = React.useState("");
  const [isLogged, setIsLogged] = React.useState(false);

  React.useEffect(() => {
    if (username) {
      localStorage.setItem("user", JSON.stringify(username));
      setIsLogged(true);
    }
  }, [username]);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUsername(JSON.parse(user));
    }
  }, []);

  React.useEffect(() => {
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

  React.useEffect(() => {
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

  React.useEffect(() => {
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

  React.useEffect(() => {
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
      <Navbar />
      <div className="container-fluid">
        <Switch>
          <Route exact path="/">
            <Homepage />
          </Route>
          <Route exact path="/login">
            <Login username={username} setUsername={setUsername} />
          </Route>
          <Route exact path="/map">
            <MapExample />
          </Route>
          <Route exact path="/terms-of-service">
            <TermsOfService />
          </Route>
          <div> Sorry Page Not found </div>
        </Switch>
      </div>
      <Footer />
    </BrowserRouter>
  );
}
