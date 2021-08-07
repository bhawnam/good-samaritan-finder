import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import Navbar from 'react-bootstrap/Navbar';

export default function Footer() {
  return (
      <>
 <div className="position-relative">
      <Navbar expand="lg" fixed="bottom" sticky="top" className="footer">
        <div className="foot-item">
          <Link to="/be-a-beneficiary" className="foot-link">
            <b> Be a beneficiary </b> <br />
            How it works <br />
            Services Offered <br />
          </Link>
          <Link to="/be-a-volunteer" className="foot-link">
            <b> Be a Volunteer </b> <br />
            How it works <br />
          </Link>
          <Link to="/about-us" className="foot-link">
            <b> Company </b> <br />
            About Us <br />
          </Link>
          <Link to="/get-in-touch" className="foot-link">
            <b> Get in touch </b> <br />
            Contact Us <br />
          </Link>
          <Link to="/#" className="foot-link">
            <b>Follow Us</b> <br />
            Facebook <br />
            Instagram <br />
            Twitter
          </Link>
          <Link to="/terms-of-service" className="foot-link">
            <b> Terms of Service </b>
          </Link>
        </div>
      </Navbar>
    </div>
      </>
  );
}
