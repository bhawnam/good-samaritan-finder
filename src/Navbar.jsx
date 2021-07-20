import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import logoPath from "./images/logo.png";

export default function Navbar(props) {
  const { logo, brand, isLogged, setIsLogged} = props;

  let history = useHistory();

  function handleLogout(){
    localStorage.removeItem("user")
    setIsLogged(false);
    history.push("/");
  }

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand d-flex justify-content-center">
        <img src={logoPath} height="30" alt="logo" />
        <span> {brand} </span>
      </Link>

      <section className="d-flex justify-content-end">
        <NavLink
          to="/be-a-volunteer"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Be a Volunteer
        </NavLink>
        <NavLink
          to="/be-a-beneficiary"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Be a Beneficiary
        </NavLink>
        <NavLink
          to="/contact"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Get in touch
        </NavLink>
        <NavLink
          to="/about-us"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          About Us
        </NavLink>
        {isLogged ? (
          <NavLink
          to="#" 
          onClick = {handleLogout}
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Log Out
        </NavLink>
        ) : (
        <NavLink
          to="/login"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Log In
        </NavLink>
        )}
      </section>
    </nav>
  );
}
