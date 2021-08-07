import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Forms.css";

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
      <>
      <section>
        <h4>Your suggestions and feedback are very important to us!</h4>
        <p>
          We at Good Samaritan Finder are always looking for ways to make the
          website better and more accessible. We will continue to offer our
          services free of cost. If you wish to join us in the effort to help
          us develop this website, please do not hesitate to reach out to us.
          Thank you once again for your time! We will get back to you if we
          need more information.
        </p>
      </section>
      <div className="form-box">
        <h2> Get In Touch</h2>
        <form onSubmit={getInTouchRequest}>
          <div className="form-contact mb-2">
            <label htmlFor="contactInputName1" className="form-label">Full Name * </label> <br />
            <input
              type="text"
              className="form-input"
              id="contactInputName1"
              value={fullname}
              onChange={(event) => setFullname(event.target.value)}
              placeholder="John Doe"
              required
            />
          </div>
          <div className="form-contact mb-2">
            <label htmlFor="contactInputEmail1" className="form-label">Email * </label> <br />
            <input
              type="email"
              className="form-input"
              id="contactInputEmail1"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="example@xyz.com"
              required
            />
          </div>
          <div className="form-contact mb-2">
            <label htmlFor="contactInputNumber1" className="form-label"> Phone Number </label> <br />
            <input
              type="text"
              className="form-input"
              id="contactInputNumber1"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event.target.value)}
              placeholder="xxx-xxx-xxxx"
            />
          </div>
          <div className="form-contact mb-2">
            <label htmlFor="contactInputMessage1" className="form-label"> Suggestions/Feedback* </label> <br />
            <textarea
              className="form-input"
              id="contactInputMessage1"
              value={comments}
              onChange={(event) => setComments(event.target.value)}
              placeholder="What's on your mind?"
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
