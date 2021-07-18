import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function Login(props) {
  const [username_or_email, setUsernameOrEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[errormessage, setErrormessage] = useState(false);

  let history = useHistory();

  const {username, setUsername} = props;

  function processUserLogin(event){
    event.preventDefault();
    fetch("/api/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({username_or_email, password}),}).then((response) => {
      response.json().then((result) => {
        if ((result.success) === false){
          setErrormessage(true);
          setPassword("");
          setUsernameOrEmail("");
        } else {
          setEmail(result.email);
          setUsername(result.username);
          history.push("/welcome-user");
        }
      });
    });
  }

  return (
    <div id="home-banner" className="row">
      <React.Fragment>
        <form onSubmit={processUserLogin}>
          <h3>Log in</h3>
          <div className="form-login">
            <label>Username or Email </label> <br />
            <input type="text" className="form-input" value={username_or_email} onChange={(event) => setUsernameOrEmail(event.target.value)} placeholder="Enter username or email" required/>
          </div>

          <div className="form-login">
            <label>Password </label> <br />
            <input type="password" className="form-input" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Enter password" required/>
          </div>

          <button type="submit" className="btn">Sign in</button>
          <p className="forgot-password">
            <a href="#">Forgot password?</a>
          </p>
        </form>
        {errormessage && < form onSubmit={() => setErrormessage(true)}>
          <h6> Sorry the email and password do not match our records! </h6>
        </form>}
      </React.Fragment>
    </div>
  );
}