import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Forms.css";
import logo from './images/logo.png'

export default function Login(props) {
  const [username_or_email, setUsernameOrEmail] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errormessage, setErrormessage] = useState(false);

  let history = useHistory();

  const {username, setUsername} = props;

  function processUserLogin(event) {
    event.preventDefault();
    fetch("api/login-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username_or_email, password }),
    }).then((response) => {
      response.json().then((result) => {
        if (result.success === false) {
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
    <>
    <div className="bg-image">
    <div className="form-box">
    <img className="logo" src={logo} />
      <h2> WELCOME</h2> <br />
      <form onSubmit={processUserLogin}>
        <div className="form-login mb-2">
          <label htmlFor="loginInputEmail1" className="form-label">Username or Email </label> <br />
          <input
            type="text"
            className="form-input"
            id="loginInputEmmail1"
            value={username_or_email}
            onChange={(event) => setUsernameOrEmail(event.target.value)}
            placeholder="Username or Email"
            required
          />
        </div>

        <div className="form-login mb-2">
          <label htmlFor="loginInputPassword1" className="form-label">Password </label> <br />
          <input
            type="password"
            className="form-input"
            id="loginInputPassword1"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
          />
        </div>

          <div className="row mb-4">
            <div className="col d-flex justify-content-center">
            <div className="col">
              <a href="/reset-password">Reset password?</a>
          </div>
          </div>
            <div className="col">
              <a href="/forgot-password">Forgot password?</a>
            </div>
          </div>
        <div class="d-grid gap-2 col-6 mx-auto mb-2"> 
        <button type="submit" className="btn btn-dark mb-2">
          Log in
        </button>
        </div>
        <p className="forgot-password">
        Don't have an account?
          <a href="/join-us"> Join us </a>
        </p>
      </form>

      {errormessage && (
        <form onSubmit={() => setErrormessage(true)}>
          <div className="alert alert-warning" role="alert">
          Sorry the email and password do not match our records!
          </div>
        </form>
      )}
      </div>
      </div>
    </>
  );
}
