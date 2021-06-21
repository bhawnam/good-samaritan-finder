function Homepage() {
  return (
    <div id="home-banner">
        <h1>Good Samaritan Finder</h1>
        <p className="lead">Welcome to our site!</p>
    </div>
  );
}


function Navbar(props) {
  const { logo, brand } = props;

  return (
    <nav className="navbar">
      <ReactRouterDOM.Link
        to="/" className="navbar-brand">
        <img src={logo} alt="GSF" height="25" />
        <span>{brand}</span>
      </ReactRouterDOM.Link>

      <div className="nav-item">
        <ReactRouterDOM.Link
        to="/login" activeClassName="navlink-active" className="nav-link">
        Log In
        </ReactRouterDOM.Link>
        <ReactRouterDOM.Link
          to="/about-us" activeClassName="navlink-active" className="nav-link">
          About Us
        </ReactRouterDOM.Link>
        <ReactRouterDOM.Link
          to="/contact" activeClassName="navlink-active" className="nav-link">
          Be in touch
        </ReactRouterDOM.Link>
        <ReactRouterDOM.Link
          to="/be-a-beneficiary" activeClassName="navlink-active" className="nav-link">
          Be a beneficiary
        </ReactRouterDOM.Link>
        <ReactRouterDOM.Link
          to="/be-a-volunteer" activeClassName="navlink-active" className="nav-link">
          Be a Volunteer
        </ReactRouterDOM.Link>
      </div>
    </nav>
  );
}


function Login(){

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const[errormessage, setErrormessage] = React.useState(false);

  let history  = ReactRouterDOM.useHistory();

  React.useEffect(() => {
    localStorage.setItem("user", JSON.stringify(username));
  }, [username]);

  function processUserLogin(event){ 
    event.preventDefault();
    fetch("/login-user", 
    {
      method : "POST",
      headers : 
      {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({username, email, password}),
      }).then((response) => {
      response.json().then((result) => {
        if ((result.success) == false){
          setErrormessage(true);
          setEmail("");
          setPassword("");
          setUsername("");
        } else {
          history.push("/welcome-beneficiary");
        }
      });
    });
  }

  return(
    <React.Fragment>
    <form onSubmit={processUserLogin}>
       <h3>Log in</h3>

      <div className="form-login">
        <label>Username </label> <br/>
        <input type="text" className="form-input" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="Enter username" required/>
      </div> 

      <div className="form-login">
        <label>Email </label> <br/>
        <input type="email" className="form-input" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Enter email" required/>
      </div>

      <div className="form-login">
        <label>Password </label> <br/>
        <input type="password" className="form-input" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" required/>
      </div>

      <button type="submit" className="btn">Sign in</button>
      <p className="forgot-password">
        <a href="#">Forgot password?</a>
      </p>
    </form>
    {errormessage && <form onSubmit={() => setErrormessage(true)}> 
      <h6> Sorry the email and password do not match our records! </h6> 
    </form>}
    </React.Fragment>
  )
}


function Register(){

  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [phonenumber, setPhonenumber] = React.useState("");
  const [address, setAddress] = React.useState("");
  const [zipcode, setZipcode] = React.useState("");

  const[errormessage, setErrormessage] = React.useState(false);

  let history = ReactRouterDOM.useHistory();

  function registerUser(event){
    event.preventDefault();
    fetch("/register-user",
    {
      method: "POST",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify(
        {firstname, lastname, username, email, password, phonenumber, address, zipcode}),
    }).then((response) => {
      response.json().then((jsonResponse) => {
        if ((jsonResponse.success) == false){
          setErrormessage(true);
          setEmail("");
          setPassword("");
          setUsername("");
          setFirstname("");
          setLastname("");
          setPhonenumber("");
          setAddress("");
          setZipcode("");
        }
        else {
          history.push("/login");
        }
      });
    });
  }
  return (
    <React.Fragment>
    <form onSubmit={registerUser}>
      <h3>Register</h3>

      <div className="form-register">
        <label>First Name </label> <br/>
        <input type="text" className="form-input" value={firstname} onChange={(event) => setFirstname(event.target.value)} placeholder="First name" required/>
      </div>

      <div className="form-register">
        <label>Last Name </label> <br/>
        <input type="text" className="form-input" value={lastname} onChange={(event) => setLastname(event.target.value)} placeholder="Last name" required/>
      </div>

      <div className="form-register">
        <label>User Name </label> <br/>
        <input type="text" className="form-input" value={username} onChange={(event) => setUsername(event.target.value)} placeholder="User name" required/>
      </div>

      <div className="form-register">
        <label>Email </label> <br/>
        <input type="email" className="form-input" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Email" required/>
      </div>

      <div className="form-register">
        <label>Password </label> <br/>
        <input type="password" className="form-input" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Password" required/>
      </div>

      <div className="form-register">
        <label> Phone Number </label> <br/>
        <input type="text" className="form-input" value={phonenumber} onChange={(event) => setPhonenumber(event.target.value)} placeholder="Phone number" pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}" required/>
      </div>

      <div className="form-register">
        <label> Address </label> <br/>
        <input type="text" className="form-input" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Street" required/>
      </div>

      <div className="form-register">
        <label>Zipcode </label> <br/>
        <input type="text" className="form-input" value={zipcode} onChange={(event)=> setZipcode(event.target.value)} placeholder="Zipcode" pattern="[0-9]*" required/>
      </div>

      <button type="submit" className="btn" >Register</button>
      <p className="forgot-password">
        <a href="#"> Already registered? </a>
      </p>
  </form>
      {errormessage && <form onSubmit={() => setErrormessage(true)}> 
      <h6> Sorry the username is already registered with us.
            Please sign in. </h6> 
    </form>}
    </React.Fragment>
  );
}

function Footer() {

  return (
    <div className="footer">
      <div className="foot-item">
      <ReactRouterDOM.Link
          to="/be-a-beneficiary" activeClassName="footlink-active" className="foot-link">
          <b> Be a beneficiary </b> <br/>
          How it works <br/>
          Services Offered <br/>
        </ReactRouterDOM.Link>
        <ReactRouterDOM.Link
          to="/be-a-volunteer" activeClassName="footlink-active" className="foot-link">
          <b> Be a Volunteer </b> <br/>  
           How it works <br/>
        </ReactRouterDOM.Link>
        <ReactRouterDOM.Link
          to="/about-us" activeClassName="footlink-active" className="foot-link">
          <b> Company </b><br/>
          About Us <br/>
        </ReactRouterDOM.Link>
        <ReactRouterDOM.Link
          to="/contact" activeClassName="footlink-active" className="foot-link">
          <b> Get in touch </b> <br/>
          Contact Us <br/>
        </ReactRouterDOM.Link>
        <ReactRouterDOM.Link
          to="#" activeClassName="footlink-active" className="foot-link">
           <b>Follow Us</b> <br/>
          Facebook <br/>
          Instagram <br/>
          Twitter
        </ReactRouterDOM.Link>
      </div>
    </div>
  );
}

function BeneficiaryProfile(props){
  const {user, requests, offerings} = props

  const requestsTableData = [];
  for (const request_id in requests){
    let currentRequest = requests[request_id];
    requestsTableData.push(
      <tr key={currentRequest.request_id}>
        <td>{currentRequest.request_id}</td>
        <td>{currentRequest.service_type}</td>
        <td>{currentRequest.request_active.toString()}</td>
      </tr>
    );
    }
  const offeringsTableData = [];
  for (const offering_id in offerings){
    let currentOffering = offerings[offering_id];
    offeringsTableData.push(
      <tr key={currentOffering.offering_id}>
        <td>{currentOffering.offering_id}</td>
        <td>{currentOffering.service_type}</td>
        <td>{currentOffering.for_num_persons}</td>
      </tr>
    );
  }

  return (
    <React.Fragment>
    <h3> Welcome {user}</h3>
    <div className="userservices">
      <h6> Your requests: </h6>
      <table className="requeststable">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Service Type</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>{requestsTableData}</tbody>
      </table>
    </div>
    <br />
    <div className="userofferings">
    <h6> Your offerings: </h6>
      <table className="offeringstable">
        <thead>
          <tr>
            <th>Offering ID</th>
            <th>Service Type</th>
            <th>Active</th>
          </tr>
        </thead>
        <tbody>{offeringsTableData}</tbody>
      </table>
    </div>
    </React.Fragment>
  );
}