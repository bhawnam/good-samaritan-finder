import React from "react";
import { Link, NavLink } from "react-router-dom";
import logoPath from "./images/logo.png";

export default function Navbar() {
  return (
    <nav>
      <Link to="/" className="navbar-brand d-flex justify-content-center">
        <img src={logoPath} height="30" alt="logo" />
        <span>Good Samaritan Finder</span>
      </Link>

      <section className="d-flex justify-content-end">
        <NavLink
          to="/map"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Be a Volunteer
        </NavLink>
        <NavLink
          to="/map"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Be a Beneficiary
        </NavLink>
        <NavLink
          to="/map"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Get in touch
        </NavLink>
        <NavLink
          to="/map"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          About Us
        </NavLink>
        <NavLink
          to="/login"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Log In
        </NavLink>
      </section>
    </nav>
  );
}
