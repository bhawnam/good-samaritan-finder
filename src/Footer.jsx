import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
      <>
    <div className="container">
      <footer className="row row-cols-7 py-5 my-5 border-top">
      <div className="col">
        <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
        <img className="logo" src="src/images/logo.png" />
        </a>
        <p className="text-muted">© 2021</p>
      </div>

    <div className="col">
      <h5> <b> Be a Beneficiary </b></h5>
          <Link to="/be-a-beneficiary" className="foot-link">
            How it works <br />
            Services Offered <br />
          </Link>
    </div>

    <div className="col">
      <h5> <b> Be a Volunteer </b></h5>
          <Link to="/be-a-volunteer" className="foot-link">
            How it works <br />
          </Link>
    </div>

    <div className="col">
      <h5> <b>Company </b></h5>
           <Link to="/about-us" className="foot-link">
            About Us <br />
          </Link>
    </div>

    <div className="col">
      <h5> <b>Get in Touch </b></h5>
          <Link to="/get-in-touch" className="foot-link">
            Contact Us <br />
          </Link>
    </div>

    <div className="col">
    <h5> <b>Follow Us </b></h5>
           <Link to="/#" className="foot-link">
            Facebook <br />
            Instagram <br />
            Twitter
          </Link>
    </div>

    <div className="col">
          <Link to="/terms-of-service" className="foot-link">
            <b> Terms of Service </b>
          </Link>
    </div>
  </footer>
  </div>
      </>
  );
}
