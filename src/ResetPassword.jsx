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
    <div>
      <>
        <form onSubmit={resetPasswordRequest}>
          <h4>Please enter your registered email address, current password and new password.</h4>

          <div className="form-register">
            <label>Email * </label> <br />
            <input
              type="email"
              className="form-input"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@xyz.com"
              required
            />
          </div>
          <div className="form-register">
            <label>Current Password * </label> <br />
            <input
              type="password"
              className="form-input"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              placeholder="Old password"
              required
            />
          </div>
          <div className="form-register">
            <label>New Password * </label> <br />
            <input
              type="password"
              className="form-input"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="New password"
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
        <p className="forgot-password">
          <a href="/forgot-password">Forgot password?</a>
        </p>
      </>
    </div>
  );
}
