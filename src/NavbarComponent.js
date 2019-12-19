import React from "react";
import { Route, Switch, Link, useParams, Redirect } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Button,
  Modal
} from "reactstrap";
import { throwStatement } from "@babel/types";

const NavbarComponent = props => (
  <div>
    <div>
      <Navbar className="mb-3 fixed-top" color="light" light expand="md">
        <Link
          style={{
            fontFamily: "Segoe UI",
            fontSize: "1rem",
            color: "rgba(0,0,0,.9)"
          }}
          to="/"
        >
          Nextagram
        </Link>

        {/* <Collapse isOpen={this.state.isOpen} navbar> */}

        <Nav className="ml-auto" navbar>
          <NavItem className="navbar navbar-light bg-light">
            <form className="form-inline">
              <input
                className="form-control mr-sm-2"
                type="search"
                placeholder="Type Username"
                aria-label="Search"
              ></input>
              <button
                className="btn btn-outline-primary my-2 my-sm-0"
                type="submit"
              >
                Search
              </button>
            </form>
          </NavItem>
          <NavItem className="navbar navbar-light bg-light">
            <NavLink href="/components/">Users</NavLink>
          </NavItem>
          <NavItem className="navbar navbar-light bg-light">
            <Link to="/Login" onClick={() => props.toggleLogin(true)}>
              Sign In
            </Link>
          </NavItem>
          {/* <NavItem className="navbar navbar-light bg-light">
            <Link to="/Login" onClick={() => props.toggleLogin(false)}>
              Sign Up
            </Link>
          </NavItem> */}
          <NavItem className="navbar navbar-light bg-light">
            <Link
              exact
              to="/"
              onClick={() => {
                sessionStorage.removeItem("userData");
                sessionStorage.removeItem("userToken");
              }}
            >
              Logout
            </Link>
          </NavItem>
          <NavItem className="navbar navbar-light bg-light">
            <Link
              to="/upload"
              style={{ color: "white", textDecoration: "none" }}
            >
              {" "}
              <Button className="btn btn-info" style={{ borderRadius: "50%" }}>
                ✚
              </Button>
            </Link>
          </NavItem>
        </Nav>
        {/* </Collapse> */}
      </Navbar>
    </div>
    <div className="mb-3" style={{ height: "5rem" }}></div>
  </div>
);

export default NavbarComponent;
