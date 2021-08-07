import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Forms.css";

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
    <div className="form-box">
      <h2> WELCOME</h2> <br />
      <form onSubmit={processUserLogin}>
        <div className="form-login mb-2">
          <label htmlFor="loginInputEmail1" class="form-label">Username or Email </label> <br />
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
          <label htmlFor="loginInputPassword1" class="form-label">Password </label> <br />
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
          <div class="row mb-4">
            <div class="col d-flex justify-content-center">
            <div class="col">
              <a href="/reset-password">Reset password?</a>
          </div>
          </div>
            <div class="col">
              <a href="/forgot-password">Forgot password?</a>
            </div>
          </div>
        <button type="submit" className="btn btn-primary btn-block mb-4">
          Log in
        </button>
      </form>
      {errormessage && (
        <form onSubmit={() => setErrormessage(true)}>
          <div class="alert alert-warning" role="alert">
          Sorry the email and password do not match our records!
          </div>
        </form>
      )}
      </div>
    </>
  );
}
