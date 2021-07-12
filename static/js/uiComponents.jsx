function Homepage() {
  return (
      <div id="homepage">
        <div className="container-fluid">
          <div>
            <h3>Welcome to Good Samaritan Finder</h3>
          </div>
          <div>
            <p>We are a non-profit organization connect volunteers and beneficiaries during unanticipated times. This
            started out as a small effort to organize the work being taken up by Volunteers so, they can focus on
            helping folks without being </p>
          </div>
          <div>
            <blockquote className="twitter-tweet">
              <a href="https://twitter.com/SonuSood/status/1391298808735174659?ref_src=twsrc%5Etfw">Tweet May 9, 2021</a>
            </blockquote>
          </div>
          <div>
            <blockquote className="blockquote">
              <p className="mb-2">Thank you dear Allen for helping us with the much needed essentials to keep us
              going during our most difficult times!</p>
              <footer className="blockquote-footer">Richard<cite title="Source Title">Dallas, Texas</cite>
              </footer>
            </blockquote>
          </div>
        </div>
      </div>
  );
}


function Navbar(props) {
  const { logo, brand, isLogged, setIsLogged} = props;

  let history = ReactRouterDOM.useHistory();

  function handleLogout(){
    localStorage.removeItem("user")
    setIsLogged(false);
    history.push("/");
  }

  return (
    <nav className="navbar">
      <ReactRouterDOM.Link
        to="/" className="navbar-brand">
        <img src={logo} alt={brand} height="40" />
      </ReactRouterDOM.Link>

      <div className="nav-item">
        {isLogged ? (
        <ReactRouterDOM.Link
        to="#" onClick = {handleLogout} className="nav-link">
        Log Out
        </ReactRouterDOM.Link>
        ) : (
        <ReactRouterDOM.Link
        to="/login" className="nav-link">
        Log In
        </ReactRouterDOM.Link>
        )}
        <ReactRouterDOM.Link
          to="/about-us" className="nav-link">
          About Us
        </ReactRouterDOM.Link>
        <ReactRouterDOM.Link
          to="/contact" className="nav-link">
          Be in touch
        </ReactRouterDOM.Link>
        <ReactRouterDOM.Link
          to="/be-a-beneficiary" className="nav-link">
          Be a Beneficiary
        </ReactRouterDOM.Link>
        <ReactRouterDOM.Link
          to="/be-a-volunteer" className="nav-link">
          Be a Volunteer
        </ReactRouterDOM.Link>
      </div>
    </nav>
  );
}


function Login(props){

  const [username_or_email, setUsernameOrEmail] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const[errormessage, setErrormessage] = React.useState(false);

  let history  = ReactRouterDOM.useHistory();

  const {username, setUsername} = props;

  function processUserLogin(event){ 
    event.preventDefault();
    fetch("/login-user", 
    {
      method : "POST",
      headers : 
      {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({username_or_email, password}),
      }).then((response) => {
      response.json().then((result) => {
        if ((result.success) == false){
          setErrormessage(true);
          setPassword("");
          setUsernameOrEmail("");
        } else {
          setEmail(result.email)
          setUsername(result.username)
          history.push("/welcome-user");
        }
      });
    });
  }

  return(
    <React.Fragment>
    <form onSubmit={processUserLogin}>
       <h3>Log in</h3>

      <div className="form-login">
        <label>Username or Email </label> <br/>
        <input type="text" className="form-input" value={username_or_email} onChange={(event) => setUsernameOrEmail(event.target.value)} placeholder="Enter username or email" required/>
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
          to="/be-a-beneficiary" className="foot-link">
          <b> Be a beneficiary </b> <br/>
          How it works <br/>
          Services Offered <br/>
        </ReactRouterDOM.Link>
        <ReactRouterDOM.Link
          to="/be-a-volunteer" className="foot-link">
          <b> Be a Volunteer </b> <br/>  
           How it works <br/>
        </ReactRouterDOM.Link>
        <ReactRouterDOM.Link
          to="/about-us"  className="foot-link">
          <b> Company </b><br/>
          About Us <br/>
        </ReactRouterDOM.Link>
        <ReactRouterDOM.Link
          to="/contact" className="foot-link">
          <b> Get in touch </b> <br/>
          Contact Us <br/>
        </ReactRouterDOM.Link>
        <ReactRouterDOM.Link
          to="#" className="foot-link">
           <b>Follow Us</b> <br/>
          Facebook <br/>
          Instagram <br/>
          Twitter
        </ReactRouterDOM.Link>
      </div>
    </div>
  );
}


function UserProfile(props){

  const [requestForm, setRequestForm] = React.useState(false);
  const [requestServiceType, setRequestServiceType] = React.useState("");
  const [requestForNumPersons, setRequestForNumPersons] = React.useState("");
 
  const [offeringForm, setOfferingForm] = React.useState(false);
  const [offeringServiceType, setOfferingServiceType] = React.useState("");
  const [offeringForNumPersons, setOfferingForNumPersons] = React.useState("");
  const [availableDate, setAvailableDate] = React.useState("");

  const [feedbackForm, setFeedbackForm] = React.useState(false);
  const [feedbackMessage, setFeedbackMessage] = React.useState("");
  const [feedbackRequestID, setFeedbackRequestID] = React.useState("");

  const [disable, setDisable] = React.useState(false);

  const {username, requests, offerings, matchedRequests, fulfilledRequests} = props

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
  for (const offered_id in offerings){
    let currentOffering = offerings[offered_id];
    offeringsTableData.push(
      <tr key={currentOffering.offered_id}>
        <td>{currentOffering.offered_id}</td>
        <td>{currentOffering.service_type}</td>
        <td>{currentOffering.for_num_persons}</td>
      </tr>
    );
    }
  const matchingRequestsTableData = [];
  for (const currentMatchingRequest of Object.values(matchedRequests)){
    // let currentMatchingRequest = matchedRequests[request_id];
    const requestAcceptCard = (
      <RequestAccept
      key={currentMatchingRequest.request_id}
      request_id={currentMatchingRequest.request_id}
      service_type={currentMatchingRequest.service_type}
      for_num_persons={currentMatchingRequest.for_num_persons}
      handleAcceptRequest={handleAcceptBtn}
      />
      );
      matchingRequestsTableData.push(requestAcceptCard);
  }  
  const fulfilledRequestsTableData = [];
  for (const currentFulfilledRequest of Object.values(fulfilledRequests)){
    const requestFeedbackCard = (
      <RequestFeedback
      key={currentFulfilledRequest.request_id}
      request_id={currentFulfilledRequest.request_id}
      service_type={currentFulfilledRequest.service_type}
      for_num_persons={currentFulfilledRequest.for_num_persons}
      handleRequestFeedbackBtn={handleFeedbackButton}
      disableBtn={disable}
      />
      );
      fulfilledRequestsTableData.push(requestFeedbackCard);
  }  

  function refreshPage(){
    window.location.reload(false);
  }

  function handleAcceptBtn(request_id){
    console.log(request_id)
    fetch("/accept-request",
    {
      method : "POST",
      headers : 
      {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({username, request_id}),
      })
      .then((response) => {
        response.json()
      .then((result) => {
        if ((result.success) == true){
          alert("Thank you for providing your service. You will be receiving an email with the next steps.")
      } else {
        alert("Sorry something went wrong!")
      }
      }); 
      });
  }

  function handleFeedbackButton(request_id){
    setFeedbackForm(true);
    setFeedbackRequestID(request_id);
    setDisable(true);
  }

  function handleFeedbackResponse(){
    fetch("/accept-feedback",
    {
      method : "POST",
      headers : 
      {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({username, feedbackRequestID, feedbackMessage}),
      })
      .then((response) => {
        response.json()
      .then((result) => {
        if ((result.success) == true){
          setFeedbackForm(false);
          alert("Thank you");
      } else {
        alert("Sorry something went wrong!");
      }
      }); 
      });
  }

  function handleRequestButton(){
    setRequestForm(true);
  }

  function addRequest(event){
    event.preventDefault();
     fetch("/add-request", 
    {
      method : "POST",
      headers : 
      {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({username, requestServiceType, requestForNumPersons}),
      })
      .then((response) => {
      response.json()
      .then((result) => {
        if ((result.success) == true){
          alert("Thank you for your request! We found a matching volunteer. You will be connected to them shortly")
          setRequestServiceType("");
          setRequestForNumPersons("");
          setRequestForm(false);
          refreshPage();
        } else if ((result.success == false)){
          alert("Thank you for your request! We will find a matching volunteer")
          setRequestServiceType("");
          setRequestForNumPersons("");
          setRequestForm(false);
          refreshPage();
        } else {
          alert("Sorry there was an error!");
          }
      });
    });
  }

  function handleOfferingButton(){
    setOfferingForm(true);
  }

  function addOffering(event){
    event.preventDefault();
    fetch("/add-offering",
    {
      method: "POST",
      headers :
      {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({username, offeringServiceType, offeringForNumPersons, availableDate}),
    })
    .then((response) => {
    response.json()
    .then((result) => {
      if((result.success) == true){
        alert("Thank you for your offering! We found a matching beneficiary request. You will be connected to them shortly")
        setOfferingServiceType("");
        setOfferingForNumPersons("");
        setAvailableDate("");
        setOfferingForm(false);
        refreshPage();
      }
      else if ((result.success) == false){
        alert("Thank you for your offering! We will find a matching request")
        setOfferingServiceType("");
        setOfferingForNumPersons("");
        setAvailableDate("");
        setOfferingForm(false);
        refreshPage();
      }
      else {
        alert("Sorry there was an error!")
      }
    });  
    });
  }

  return (
    <React.Fragment>
    <h3> Welcome {username}</h3>
    <div className="services">
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
    <button type="submit" className="btn" onClick={handleRequestButton}> Add a request</button>
    </div>
    {requestForm ? (
      <form onSubmit={addRequest}>
        <br/>
        <div className="form-request">
        <label> Service Type </label>
        <select className="form-input" value={requestServiceType} onChange={(event) => setRequestServiceType(event.target.value)}>  
        <option value="">Select a service</option>
        <option value="PACKAGED_MEAL_KIT"> Packaged Meal Kit</option>
        <option value="WATER"> Water </option>
        <option value="FIRST_AID_KIT"> First Aid Kit</option>
        <option value="BLANKET"> Blanket</option>
        <option value="PET_FOOD"> Pet Food </option>
        </select>
      </div>
      <br/>
      <div className="form-request">
        <label>For number of people </label>
        <input type="text" className="form-input" value={requestForNumPersons} onChange={(event) => setRequestForNumPersons(event.target.value)} required/>
      </div>
      <button type="submit" className="btn"> Add </button>
      </form>
    ) : (null) }
    <br />
    <div className="offerings">
    <div className="userofferings">
    <h6> Your offerings: </h6>
      <table className="offeringstable">
        <thead>
          <tr>
            <th>Offering ID</th>
            <th>Service Type</th>
            <th>For Num persons</th>
          </tr>
        </thead>
        <tbody>{offeringsTableData}</tbody>
      </table>
    </div>
    <button type="submit" className="btn" onClick={handleOfferingButton}> Add an offering </button>
    </div>
    {offeringForm ? (
      <form onSubmit={addOffering}>
        <br/>
        <div className="form-offering">
        <label> Service Type </label>
        <select className="form-input" value={offeringServiceType} onChange={(event) => setOfferingServiceType(event.target.value)}>  
        <option value="">Select a service</option>
        <option value="PACKAGED_MEAL_KIT"> Packaged Meal Kit</option>
        <option value="WATER"> Water </option>
        <option value="FIRST_AID_KIT"> First Aid Kit</option>
        <option value="BLANKET"> Blanket</option>
        <option value="PET_FOOD"> Pet Food </option>
        </select>
      </div>
      <br/>
      <div className="form-offering">
        <label>For number of people </label>
        <input type="text" className="form-input" value={offeringForNumPersons} onChange={(event) => setOfferingForNumPersons(event.target.value)} required/>
      </div>
      <br/>
      <div className="form-offering">
        <label> Date of availability </label>
        <input type="date" min="2021-01-01" max="2021-12-31" className="form-input" value={availableDate} onChange={(event) => setAvailableDate(event.target.value)} required/>
      </div>
      <button type="submit" className="btn"> Add </button>
      </form>
    ) : (null) }
    <br/>
       <div className="matchedrequests">
      <h6> Matched requests: </h6>
      <table className="matchedrequeststable">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Service Type</th>
            <th>For num persons</th>
          </tr>
        </thead>
        <tbody>{matchingRequestsTableData}</tbody>
      </table>
    </div>
    <br/>
       <div className="fulfilledrequests">
      <h6> Give feedback for fulfilled requests: </h6>
      <table className="fulfilledrequeststable">
        <thead>
          <tr>
            <th>Request ID</th>
            <th>Service Type</th>
          </tr>
        </thead>
        <tbody>{fulfilledRequestsTableData}</tbody>
      </table>
    </div>
    {feedbackForm ? (
      <form onSubmit={handleFeedbackResponse}>
        <br/>
        <div className="form-feedback">
        <label> Feedback Message</label>
        <input type="textarea" className="form-input" value={feedbackMessage} onChange={(event) => setFeedbackMessage(event.target.value)} required/>
      </div>
      <button type="submit" className="btn"> Submit </button> 
      </form>
    ): (null) }
    </React.Fragment>
  );
}


function RequestAccept(props){

  const {request_id, handleAcceptRequest, service_type, for_num_persons} = props;

  return (
    <React.Fragment>
    <tr key = {request_id}>
    <td>{request_id}</td>
    <td>{service_type} </td>
    <td> {for_num_persons}</td>
    <td> <button type="submit" className="btn" onClick={()=>handleAcceptRequest(request_id)}> Accept </button>
    </td>
  </tr>
  </React.Fragment>
  );
}

function RequestFeedback(props){

  const {request_id, handleRequestFeedbackBtn, service_type, disableBtn} = props;

  return (
    <React.Fragment>
    <tr key = {request_id}>
    <td>{request_id}</td>
    <td>{service_type} </td>
    <td> <button type="submit" className="btn" disabled={disableBtn} onClick={()=>handleRequestFeedbackBtn(request_id)}> Give Feedback </button>
    </td>
  </tr>
  </React.Fragment>
  );
}

function Loading() {
  return (
    <div className="loading-box">
      <img src="static/img/watermelon-loading.png" alt="" />
      <div>Loading...</div>
    </div>
  );
}

function MapExample() {
  const [mapData, setMapData] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  const [address, setAddress] = React.useState("");

  const mapElementRef = React.useRef();
  const googleMapRef = React.useRef();

  // React.useEffect(() => {
  //   setLoading(true);
  //   fetch("/api/map_data")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setMapData(data);
  //       setLoading(false);
  //     });
  // }, []);

  // React.useEffect(addMarkers, [mapData]);
  // React.useEffect(addMarkers, []);

  // function addMarkers() {
  //   const markers = [];
  //   for (const location of mapData) {
  //     markers.push(
  //       new google.maps.Marker({
  //         position: location.coords,
  //         title: location.name,
  //         map: googleMapRef.current,
  //       })
  //     );
  //   }

  //   for (const marker of markers) {
  //     const markerInfo = `
  //       <h1>${marker.title}</h1>
  //       <p>
  //         Located at: <code>${marker.position.lat()}</code>,
  //         <code>${marker.position.lng()}</code>
  //       </p>
  //     `;

  //     const infoWindow = new google.maps.InfoWindow({
  //       content: markerInfo,
  //       maxWidth: 200,
  //     });

  //     marker.addListener("click", () => {
  //       infoWindow.open(googleMapRef.current, marker);
  //     });
  //   }
  // }

  function submitAddress(event){
    event.preventDefault();
  }

  React.useEffect(() => {
    if (loading) {
      return;
    }
    if (!window.google) {
      // Create an html element with a script tag in the DOM
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=AIzaSyBovLMDLdlFjnutFmK7SgE9j87MzDmr3rE&libraries=places";
      document.head.append(script);
      script.addEventListener("load", () => {
        googleMapRef.current = new window.google.maps.Map(
          mapElementRef.current,
          {
            center: { lat: 37.601773, lng: -122.20287 },
            zoom: 11,
          }
        );
        return googleMapRef.current;
      });
      return () => script.removeEventListener("load");
    } else {
      // Initialize the map if a script element with google url is found
      googleMapRef.current = new window.google.maps.Map(mapElementRef.current, {
        center: { lat: 37.601773, lng: -122.20287 },
        zoom: 11,
      });
    }
  }, []); // add any dependencies (like things in props)

  // if custom styles needed, pass those as part of props also
  return (
    <React.Fragment>
    <div
      id="map-div"
      style={{
        height: 800,
        margin: "1em 0",
        borderRadius: "0.5em",
        width: 500,
      }}
      ref={mapElementRef}
    ></div>
    <form onSubmit={submitAddress}>
    <h3>Where do you reside? </h3>
   <div className="form-login">
     <label> Address </label> <br/>
     <input type="text" className="form-input" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Enter your address" required/>
   </div>
   <button type="submit" className="btn"> Submit </button> 
   </form>
 </React.Fragment>
  );

  // if (loading) {
  //   return <Loading />;
  // }
}