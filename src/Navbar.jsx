import React from "react";
import { Container } from "react-bootstrap";
import { Link, NavLink } from "react-router-dom";
import { useHistory } from "react-router-dom";
import logoPath from "./images/logo.png";
import Navbar from 'react-bootstrap/Navbar';
import SideBar from "./SideBar";

export default function Nav(props) {
  const { logo, brand, isLogged, setIsLogged} = props;

  let history = useHistory();

  function handleLogout() {
    localStorage.removeItem("user");
    setIsLogged(false);
    history.push("/");
  }

  return (
    <Navbar collapseOnSelect expand="lg" fixed="top" className="navbar" >
      <Container>
      <Navbar.Brand href="/" className="d-inline-block align-top">
        <img src={logoPath} height="40" alt={brand} />
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <section className="d-flex justify-content-end">
      <Navbar.Collapse id="responsive-navbar-nav">
        {!isLogged && (
        <NavLink
          to="/be-a-volunteer"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Be a Volunteer
        </NavLink>
        )}
        {!isLogged && (
        <NavLink
          to="/be-a-beneficiary"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Be a Beneficiary
        </NavLink>
        )}
        {isLogged && (
          <Link to="#" className="nav-link nav-item">
            <SideBar isLogged={isLogged}/>
          </Link>
        )}
        {isLogged && (
          <NavLink to="/welcome-user" className="nav-link nav-item">
            My Dashboard
          </NavLink>
        )}
        {!isLogged && (
        <NavLink
          to="/get-in-touch"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          Get in touch
        </NavLink>
        )}
        {!isLogged && (
        <NavLink
          to="/about-us"
          activeClassName="navlink-active"
          className="nav-link nav-item"
        >
          About Us
        </NavLink>
        )}
        {isLogged ? (
          <Link
            to="/#"
            onClick={handleLogout}
            className="nav-link nav-item"
          >
            Log Out
          </Link>
        ) : (
          <Link
            to="/login"
            className="nav-link nav-item"
          >
            Log In
          </Link>
        )} 
      </Navbar.Collapse>
      </section>
      </Container>
    </Navbar>
  );
}
