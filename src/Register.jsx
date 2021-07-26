import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Modal from "react-modal";

export default function Register() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phonenumber, setPhonenumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipcode, setZipcode] = useState("");
  const [errormessage, setErrormessage] = useState(false);
  const history = useHistory();

  const [isOpen, setIsOpen] = useState(false);
  
  function toggleModal() {
      setIsOpen(!isOpen);

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
        } else {
          history.push("/login");
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
            onChange={(event) => setPhonenumber(event.target.value)}
            placeholder="Phone number"
            pattern="[0-9]{3}-[0-9]{3}-[0-9]{4}"
            required
          />
        </div>

        <div className="form-register">
          <label> Address </label> <br />
          <input
            type="text"
            className="form-input"
            value={address}
            onChange={(event) => setAddress(event.target.value)}
            placeholder="Street"
            required
          />
        </div>

        <div className="form-register">
          <label>Zipcode </label> <br />
          <input
            type="text"
            className="form-input"
            value={zipcode}
            onChange={(event) => setZipcode(event.target.value)}
            placeholder="Zipcode"
            pattern="[0-9]*"
            required
          />
        </div>

        <button type="submit" className="btn">
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
          <div className="App">
      <button onClick={toggleModal}>Open modal</button>

      <Modal
        isOpen={isOpen}
        onRequestClose={toggleModal}
        contentLabel="My dialog"
      >
        <div>My modal dialog.</div>
        <button onClick={toggleModal}>Close modal</button>
      </Modal>
    </div>
    </>
  );
}
  
