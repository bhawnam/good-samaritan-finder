import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function ResetPassword() {
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const history = useHistory();

  function resetPasswordRequest(event) {
    event.preventDefault();
    fetch("api/reset-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, currentPassword, newPassword }),
    }).then((response) => {
      response.json().then((jsonResponse) => {
        if (jsonResponse.success === false) {
          swal.fire({
            text: "The provided email address and password do not match.",
            showConfirmButton: true,
            confirmButtonText: `Okay`,
          });
        } else {
          swal
            .fire({
              text: "Your password has been reset!",
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
      <h5>Please enter your registered email address, current password and new password.</h5> 
        <form onSubmit={resetPasswordRequest}>
          <div className="form-register mb-2">
            <label htmlFor="resetInputEmail1" className="form-label">Email * </label> <br />
            <input
              type="email"
              className="form-input"
              id="resetInputEmail1"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@xyz.com"
              required
            />
          </div>
          <div className="form-register mb-2">
            <label htmlFor="resetInputOldPassword1" className="form-label">Current Password * </label> <br />
            <input
              type="password"
              className="form-input"
              id="resetInputOldPassword1"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              required
            />
          </div>
          <div className="form-register mb-3">
            <label htmlFor="resetInputNewPassword1" className="form-label">New Password * </label> <br />
            <input
              type="password"
              className="form-input"
              id="resetInputNewPassword1"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
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
