function App() {


  return (
    <ReactRouterDOM.BrowserRouter>
      <Navbar logo="" brand="Good Samaritan Finder">
      <ReactRouterDOM.NavLink
          to="/login" activeClassName="navlink-active" className="nav-link">
          Log In
        </ReactRouterDOM.NavLink>
        <ReactRouterDOM.NavLink
          to="/about-us" activeClassName="navlink-active" className="nav-link">
          About Us
        </ReactRouterDOM.NavLink>
        <ReactRouterDOM.NavLink
          to="/contact" activeClassName="navlink-active" className="nav-link">
          Be in touch
        </ReactRouterDOM.NavLink>
        <ReactRouterDOM.NavLink
          to="/be-a-beneficiary" activeClassName="navlink-active" className="nav-link">
          Be a beneficiary
        </ReactRouterDOM.NavLink>
        <ReactRouterDOM.NavLink
          to="/be-a-volunteer" activeClassName="navlink-active" className="nav-link">
          Be a Volunteer
        </ReactRouterDOM.NavLink>
      </Navbar>

      <div className="outer">
        <div className="inner">
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
      </div>
      </div>
    </ReactRouterDOM.BrowserRouter>
  );
}

ReactDOM.render(<App />, document.querySelector("#root"));
