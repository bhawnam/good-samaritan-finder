import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { PlacesAutocomplete } from "./Autocomplete";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [phoneValidated, setPhoneValidated] = useState(true);
  const [emailValidated, setEmailValidated] = useState(true);
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [aptSuite, setAptSuite] = useState("");
  const [errormessage, setErrormessage] = useState(false);
  const history = useHistory();

  function handlePhoneValidate() {
    const otp = Math.floor(Math.random() * 300000).toString();

    fetch("/api/send-otp-sms", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        otp,
        phonenumber,
      }),
    }).then((response) => {
      response.json().then((jsonResponse) => {
        swal.fire({
            title: "Validate Phone Number",
            input: "text",
            inputLabel: "Please enter the validation code",
            inputPlaceholder: "Enter code",
            showConfirmButton: true,
            confirmButtonText: `Okay`,
          })
          .then((result) => {
            if (result.value === otp) {
              setPhoneValidated(true);
              swal.fire({
                text: "Thank you for verifying the phone number!",
                timer: 2000,
              });
            } else {
              setPhoneValidated(false);
              swal.fire({
                text: "Incorrect validation code. Please re-validate phone number.",
                showConfirmButton: true,
                confirmButtonText: `Okay`,
              });
            }
          });
      });
    });
  }

  function handleEmailValidate() {
    const verificationCode = Math.floor(Math.random() * 300000).toString();

    fetch("/api/send-code-email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        verificationCode,
        email,
      }),
    }).then((response) => {
      response.json().then((jsonResponse) => {
        swal.fire({
            title: "Validate Email",
            input: "text",
            inputLabel: "Please enter the verification code",
            inputPlaceholder: "Enter code",
            showConfirmButton: true,
            confirmButtonText: `Okay`,
          })
          .then((result) => {
            if (result.value === verificationCode) {
              setEmailValidated(true);
              swal.fire({
                text: "Thank you for verifying the email address!",
                timer: 2000,
              });
            } else {
              setEmailValidated(false);
              swal.fire({
                text: "Incorrect verification code. Please re-validate email address.",
                showConfirmButton: true,
                confirmButtonText: `Okay`,
              });
            }
          });
      });
    });
  }

  function registerUser(event) {
    event.preventDefault();
    fetch("api/register-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname,
        lastname,
        username,
        email,
        password,
        phonenumber,
        address,
        zipcode,
        aptSuite,
      }),
    }).then((response) => {
      response.json().then((jsonResponse) => {
        if (jsonResponse.success === false) {
          setErrormessage(true);
          setEmail("");
          setPassword("");
          setUsername("");
          setFirstname("");
          setLastname("");
          setPhonenumber("");
          setAddress("");
          setZipcode("");
          setAptSuite("");
        } else {
          swal
            .fire({
              text: "Thank you for registering with us. You will now be redirected to the login page.",
              showConfirmButton: true,
              confirmButtonText: `Okay`,
            })
            .then((result) => {
              if (result.isConfirmed) {
                history.push("/login");
              }
            });
        }
      });
    });
  }

  return (
    <>
    <div className="bg-image">
    <div className="form-box">
    <img className="logo" src="src/images/logo.png" />
    <h2> JOIN US </h2> <br />
      <form onSubmit={registerUser}>
        <div className="form-register row mb-2">
          <div className="col">
          <label htmlFor="registerInputFirstName1" className="form-label">First Name </label> <br/>
          <input
            type="text"
            className="form-input"
            id="registerInputFirstName1"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
            placeholder="John"
            required
          />
        </div>
          <div className="col">
          <label htmlFor="registerInputLastName1" className="form-label">Last Name </label> <br />
          <input
            type="text"
            className="form-input"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            placeholder="Doe"
            required
          />
          </div>
        </div>
        <div className="form-register mb-2">
          <label htmlFor="registerInputUserName1" className="form-label">User Name </label> <br />
          <input
            type="text"
            className="form-input"
            id="registerInputUserName1"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="johnDoe"
            required
          />
        </div>

        <div className="form-register row mb-2">
          <label htmlFor="registerInputEmail1" className="form-label">Email </label> <br />
          <div className="col">
          <input
            type="email"
            className="form-input"
            id="registerInputEmail1"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setEmailValidated(false);
            }}
            placeholder="example@xyz.com"
            required
          />
          </div>
          <div className="col">
            <button
            type="button"
            disabled={emailValidated === true}
            onClick={() => handleEmailValidate()}
          >
            Validate Email
          </button>
        </div>
        </div>

        <div className="form-register mb-2">
          <label htmlFor="registerInputPassword1" className="form-label" aria-describedby="passwordHelpBlock">Password </label> <br />
          <input
            type="password"
            className="form-input"
            id="registerInputPassword1"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
          />
          <div id="passwordHelpBlock" class="form-text">
            Your password must be 8-20 characters long, and must not contain spaces, special characters, or emoji.
          </div>
          </div>

        <div className="form-register row mb-2">
          <label htmlFor="registerInputPhoneNumber1" className="form-label"> Phone Number </label> <br />
          <div className="col">
          <input
            type="text"
            className="form-input"
            id="registerInputPhoneNumber1"
            value={phonenumber}
            onChange={(event) => {
              setPhonenumber(event.target.value);
              setPhoneValidated(false);
            }}
            placeholder="xxx-xxx-xxxx"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
          </div>
          <div className="col">
          <button
            type="button"
            disabled={phoneValidated === true}
            onClick={() => handlePhoneValidate()}
          >
            Verify Phone Number
          </button>
        </div>
        </div>

        <div className="form-register mb-2">
          <label htmlFor="registerInputAddress1" className="form-label"> Address </label> <br />
          <PlacesAutocomplete setAddress={setAddress} setZipcode={setZipcode} />
        </div>

        <div className="form-register mb-3">
          <label htmlFor="registerInputtApt1" className="form-label">Apt/Suite </label> <br />
          <input
            type="text"
            className="form-input"
            id="registerInputApt1"
            value={aptSuite}
            onChange={(event) => setAptSuite(event.target.value)}
            placeholder="Apt/Suite (Optional)"
          />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" class="form-check-input" id="registerInputCheck1" />
          <label className="form-check-label" htmlfor="registerInputCheck1">
              I agree all statements in <a href="/terms-of-service">Terms of service</a>
          </label>
        </div>      
        <button
          type="submit"
          className="btn btn-primary"
          disabled={phoneValidated === false}
        >
          Join Us
        </button>
        <p className="forgot-password">
        Already registered?
          <a href="/login"> Log In </a>
        </p>
      </form>
      {errormessage && (
        <form onSubmit={() => setErrormessage(true)}>
          <div className="alert alert-warning" role="alert">
          Sorry the username is already registered with us. Please sign in.
          </div>
        </form>
      )}
      </div>
      </div>
    </>
  );
}
  
