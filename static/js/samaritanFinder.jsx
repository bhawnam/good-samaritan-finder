function App() {

  const [requests, setRequests] = React.useState({});

  React.useEffect(() => {
    fetch("api/requests")
    .then((response) => response.json())
    .then((requestsData) => {
      setRequests(requestsData);
    });
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
          <BeneficiaryProfile requests={requests}/>
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
