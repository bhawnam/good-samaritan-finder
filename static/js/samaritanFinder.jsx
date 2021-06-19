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
      <Footer >
        <ReactRouterDOM.NavLink
          to="/be-a-beneficiary" activeClassName="foolink-active" className="foot-link">
          <b> Be a beneficiary </b> <br/>
          How it works <br/>
          Services Offered <br/>
        </ReactRouterDOM.NavLink>
        <ReactRouterDOM.NavLink
          to="/be-a-volunteer" activeClassName="foolink-active" className="nav-link">
          <b> Be a Volunteer </b> <br/>  
           How it works <br/>
        </ReactRouterDOM.NavLink>
        <ReactRouterDOM.NavLink
          to="/about-us" activeClassName="footlink-active" className="foot-link">
          <b> Company </b><br/>
          About Us <br/>
        </ReactRouterDOM.NavLink>
        <ReactRouterDOM.NavLink
          to="/contact" activeClassName="footlink-active" className="foot-link">
          <b> Get in touch </b> <br/>
          Contact Us <br/>
        </ReactRouterDOM.NavLink>
        <ReactRouterDOM.NavLink
          to="#" activeClassName="navlink-active" className="foot-link">
           <b>Follow Us</b> <br/>
          Facebook <br/>
          Instagram <br/>
          Twitter
        </ReactRouterDOM.NavLink>
        </Footer>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
