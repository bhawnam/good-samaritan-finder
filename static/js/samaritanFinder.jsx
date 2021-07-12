function App() {

  const [requests, setRequests] = React.useState({});
  const [offerings, setOfferings] = React.useState({});
  const [matchedRequests, setMatchedRequests] = React.useState({});
  const [fulfilledRequests, setFulfilledRequests] = React.useState({});
  
  const [username, setUsername] = React.useState("");
  const [isLogged, setIsLogged] = React.useState(false);

  React.useEffect(() => {
    if (username){
    localStorage.setItem("user", JSON.stringify(username));
    setIsLogged(true);
  }}, [username]);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setUsername(JSON.parse(user));
    }
  }, []);

  React.useEffect(() => {
    fetch("api/requests",
    {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({username}),
    })
    .then((response) => response.json())
    .then((requestsData) => {
      setRequests(requestsData);
    });
  }, [username]);

  React.useEffect(() => {
    fetch("api/offerings",
    {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({username}),
    })
    .then((response) => response.json())
    .then((offeringsData) => {
      setOfferings(offeringsData);
    });
  }, [username]);

  React.useEffect(() => {
    fetch("api/matched-requests",
    {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({username}),
    })
    .then((response) => response.json())
    .then((setMatchedRequestsData) => {
      setMatchedRequests(setMatchedRequestsData);
    });
  }, [username]);

  React.useEffect(() => {
    fetch("api/show-feedback-requests",
    {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({username}),
    })
    .then((response) => response.json())
    .then((setFulfilledRequestsData) => {
      setFulfilledRequests(setFulfilledRequestsData);
    });
  }, [username]);

  return (
      <ReactRouterDOM.BrowserRouter>
        <Navbar logo="/static/img/logo.png" brand="Good Samaritan Finder" isLogged={isLogged} setIsLogged={setIsLogged}/>
        <div>
          <div>
            <ReactRouterDOM.Switch>
              <ReactRouterDOM.Route exact path="/">
                <Homepage />
              </ReactRouterDOM.Route>
              <ReactRouterDOM.Route exact path="/login">
                <Login username={username} setUsername={setUsername}/>
              </ReactRouterDOM.Route>
              <ReactRouterDOM.Route exact path="/be-a-volunteer">
                <Register />
              </ReactRouterDOM.Route>
              <ReactRouterDOM.Route exact path="/be-a-beneficiary">
                <MapExample />
                <Register />
              </ReactRouterDOM.Route>
              <ReactRouterDOM.Route exact path="/welcome-user">
                <UserProfile username={username} requests={requests} offerings={offerings} matchedRequests={matchedRequests} fulfilledRequests={fulfilledRequests}/>
              </ReactRouterDOM.Route>
              <div> Sorry Page Not found </div>
            </ReactRouterDOM.Switch>
          </div>
        </div>
        <Footer />
      </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
