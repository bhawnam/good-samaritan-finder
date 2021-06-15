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
        <img src={logo} alt="GSF" height="30" />
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
  
  function handleSubmit(event){
    event.preventDefault();
    setPassword("");
    setEmail("");
    setUsername("");
  }
  
  function processUserLogin(){ 
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

    <form onSubmit = {handleSubmit}>
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

      <button type="submit" className="btn" onClick={processUserLogin}>Sign in</button>
      <p className="forgot-password">
        <a href="#">Forgot password?</a>
      </p>
    </form>
  );
}


function Register(){
  return (
    <form>
      <h3>Register</h3>

      <div className="form-register">
        <label>First Name </label> <br/>
        <input type="text" className="form-input" name="first_name" placeholder="First name" />
      </div>

      <div className="form-register">
        <label>Last Name </label> <br/>
        <input type="text" className="form-input" name="last_name" placeholder="Last name" />
      </div>

      <div className="form-register">
        <label>User Name </label> <br/>
        <input type="text" className="form-input" name="user_name" placeholder="User name" />
      </div>

      <div className="form-register">
        <label>Email </label> <br/>
        <input type="email" className="form-input" name="email" placeholder="Enter email" />
      </div>

      <div className="form-register">
        <label>Password </label> <br/>
        <input type="password" className="form-input" name="password" placeholder="Enter password" />
      </div>

      <div className="form-register">
        <label> Phone Number </label> <br/>
        <input type="text" className="form-input" name="phone_number" placeholder="Phone number" />
      </div>

      <div className="form-register">
        <label> Address </label> <br/>
        <input type="text" className="form-input" name="address" placeholder="Street" />
      </div>

      <div className="form-register">
        <label>Zipcode </label> <br/>
        <input type="text" className="form-input" name="zipcode" placeholder="Zipcode" />
      </div>

      <button type="submit" className="btn">Register</button>
      <p className="forgot-password">
        <a href="#"> Already registered? </a>
      </p>
  </form>
  );
}