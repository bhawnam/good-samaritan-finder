function Homepage() {
  return (
    <div id="home-banner">
        <h1>Good Samaritan Finder</h1>
        <p className="lead">Welcome to our site!</p>
    </div>
  );
}


function Navbar(props) {
  const { logo, brand, children, className } = props;

  const navLinks = children.map((el, i) => {
    return (
      <div key={i} className="nav-item">
        {el}
      </div>
    );
  });

  return (
    <nav className="navbar">
      <ReactRouterDOM.Link
        to="/" className="navbar-brand">
        <img src={logo} alt="GSF" height="25" />
        <span>{brand}</span>
      </ReactRouterDOM.Link>

      <section className="nav-item">{navLinks}</section>
    </nav>
  );
}


function Login(){

  const [username, setUsername] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  

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
        alert("Welcome!")
      });
    });
  }

  return(

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
  );
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
        alert("User Registration!")
      });
    });
  }
  return (
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
        <input type="text" className="form-input" value={phonenumber} onChange={(event) => setPhonenumber(event.target.value)} placeholder="Phone number" required/>
      </div>

      <div className="form-register">
        <label> Address </label> <br/>
        <input type="text" className="form-input" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="Street" required/>
      </div>

      <div className="form-register">
        <label>Zipcode </label> <br/>
        <input type="text" className="form-input" value={zipcode} onChange={(event)=> setZipcode(event.target.value)} placeholder="Zipcode" required/>
      </div>

      <button type="submit" className="btn" >Register</button>
      <p className="forgot-password">
        <a href="#"> Already registered? </a>
      </p>
  </form>
  );
}