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
      <form onSubmit={registerUser}>
        <h3>Register</h3>

        <div className="form-register">
          <label>First Name </label> <br />
          <input
            type="text"
            className="form-input"
            value={firstname}
            onChange={(event) => setFirstname(event.target.value)}
            placeholder="First name"
            required
          />
        </div>

        <div className="form-register">
          <label>Last Name </label> <br />
          <input
            type="text"
            className="form-input"
            value={lastname}
            onChange={(event) => setLastname(event.target.value)}
            placeholder="Last name"
            required
          />
        </div>

        <div className="form-register">
          <label>User Name </label> <br />
          <input
            type="text"
            className="form-input"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="User name"
            required
          />
        </div>

        <div className="form-register">
          <label>Email </label> <br />
          <input
            type="email"
            className="form-input"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email"
            required
          />
        </div>

        <div className="form-register">
          <label>Password </label> <br />
          <input
            type="password"
            className="form-input"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <div className="form-register">
          <label> Phone Number </label> <br />
          <input
            type="text"
            className="form-input"
            value={phonenumber}
            onChange={(event) => {
              setPhonenumber(event.target.value);
              setPhoneValidated(false);
            }}
            placeholder="XXX-XXX-XXXX"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
          <button
            id="phoneValidate"
            type="button"
            disabled={phoneValidated === true}
            onClick={() => handlePhoneValidate()}
          >
            Verify Phone Number
          </button>
        </div>

        <div className="form-register">
          <label> Address </label> <br />
          <PlacesAutocomplete setAddress={setAddress} setZipcode={setZipcode} />
        </div>

        <div className="form-register">
          <label>Apt/Suite </label> <br />
          <input
            type="text"
            className="form-input"
            value={aptSuite}
            onChange={(event) => setAptSuite(event.target.value)}
            placeholder="Apt/Suite (Optional)"
          />
        </div>

        <button
          type="submit"
          className="btn"
          disabled={phoneValidated === false}
        >
          Register
        </button>
        <p className="forgot-password">
          <a href="/login"> Already registered? </a>
        </p>
      </form>
      {errormessage && (
        <form onSubmit={() => setErrormessage(true)}>
          <h6>
            Sorry the username is already registered with us. Please sign in.
          </h6>
        </form>
      )}
    </>
  );
}
  
