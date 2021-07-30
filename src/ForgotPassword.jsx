import React, { useState } from "react";
import { useHistory } from "react-router-dom";

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
    <div>
      <>
        <form onSubmit={forgotPasswordRequest}>
          <h4>Please enter your registered email address.</h4>

          <div className="form-register">
            <label>Email * </label> <br />
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="Email"
              required
            />
          </div>

          <button type="submit" className="btn">
            Submit
          </button>
          <div>
            <p>(*) are required fields</p>
          </div>
        </form>
      </>
    </div>
  );
}
