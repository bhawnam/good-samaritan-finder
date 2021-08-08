import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Forms.css";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");

  const history = useHistory();

  function forgotPasswordRequest(event) {
    event.preventDefault();
    fetch("api/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    }).then((response) => {
      response.json().then((jsonResponse) => {
        if (jsonResponse.success === false) {
          swal.fire({
            text: "The provided email address cannot be found in the database.",
            showConfirmButton: true,
            confirmButtonText: `Okay`,
          });
        } else {
          swal
            .fire({
              text: "A temporary password has been sent to the registered email",
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
      <div className="form-box">
      <h5>Please enter your registered email address.</h5>
        <form onSubmit={forgotPasswordRequest}>
          <div className="form-register mb-4">
            <label htmlFor="forgotInputEmail1" className="form-label">Email * </label> <br />
            <input
              type="email"
              className="form-input"
              id="forgotInputEmail1"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@xyz.com"
              required
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
          <div>
            (*) are required fields
          </div>
        </form>
        </div>
      </>
  );
}
