import React, { useState } from "react";
import { useHistory } from "react-router-dom";

export default function GetInTouch() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [comments, setComments] = useState("");

  let history = useHistory();

  function getInTouchRequest(event) {
    event.preventDefault();
    fetch("api/get-in-touch", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fullname, email, phoneNumber, comments }),
    }).then((response) => {
      response.json().then((jsonResponse) => {
        if (jsonResponse.success === false) {
          swal.fire("Please use a valid email.");
        } else {
          swal.fire({
            text: 'Thank you for contacting us! We will be in touch with you shortly.',
            showConfirmButton: true,
            confirmButtonText: `Okay`,
          }).then((result) => {
            if (result.isConfirmed) {
              history.push("/about-us");
            }
          })
        }
      });
    });
  }
  return (
    <div>
      <>
        <form onSubmit={getInTouchRequest}>
          <h4>
            Your suggestions and feedback are important to us. Please get in
            touch
          </h4>
          <div className="form-register">
            <label>Full Name * </label> <br />
            <input
              type="text"
              className="form-input"
              value={fullname}
              onChange={(event) => setFullname(event.target.value)}
              placeholder="Full name"
              required
            />
          </div>

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

          <div className="form-register">
            <label> Phone Number </label> <br />
            <input
              type="text"
              className="form-input"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="Phone number (Optional)"
            />
          </div>

          <div className="form-register">
            <label> Suggestions/Feedback* </label> <br />
            <textarea
              className="form-input"
              value={comments}
              onChange={(event) => setComments(event.target.value)}
              placeholder="Suggestions/Feedback"
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
