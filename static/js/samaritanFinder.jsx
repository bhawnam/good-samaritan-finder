function App() {

  const [requests, setRequests] = React.useState({});

  const[loggedUser, setloggedUser] = React.useState("");

  React.useEffect(() => {
    fetch("api/requests",
    {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({loggedUser}),
    })
    .then((response) => response.json())
    .then((requestsData) => {
      setRequests(requestsData);
    });
  }, [loggedUser]);

  React.useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setloggedUser(JSON.parse(user));
    }
  }, []);

  return (
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="" brand="Good Samaritan Finder" />
      <div className="outer">
        <div className="inner">
        <ReactRouterDOM.Switch>  
        <ReactRouterDOM.Route exact path="/">
          <Homepage />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/login">
          <Login />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/be-a-volunteer">
          <Register />
        </ReactRouterDOM.Route>  
        <ReactRouterDOM.Route exact path="/be-a-beneficiary">
          <Register />
        </ReactRouterDOM.Route>
        <ReactRouterDOM.Route exact path="/welcome-beneficiary">
          <BeneficiaryProfile user={loggedUser} requests={requests}/>
        </ReactRouterDOM.Route>
        <div> Sorry Page Not found </div>
        </ReactRouterDOM.Switch>
      </div>
      <Footer />
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
