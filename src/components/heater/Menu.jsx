import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, Container, Button, Modal } from "react-bootstrap";
import React from "react";
import "./menu.css";
import { useHistory, Link } from "react-router-dom";
import Sign_in from "../login/signIn/SignI_in";
import { logOutUser, sendUserToProfile } from "./function/FunctionsMenu";
import { ShowModelPopUp } from "../../customHook/showPopUp";
import LazyLoadImg from "../tools/lazyLoad/LazyLoadImg";
import DarkMode from "../tools/darkMode/DarkMode";



function Menu() {


  let storedTheme = localStorage.getItem("theme");
  let userData = JSON.parse(sessionStorage.getItem("user"));

  const history = useHistory();

  // show popup sign in custom Hook
  const { show, handleClose, handleShow } = ShowModelPopUp();



  return (
    <div
      className={
        storedTheme == "light"
          ? "menuDark"
          : storedTheme == "dark"
          ? "menu"
          : ""
      }
    >
      <Navbar collapseOnSelect expand="sm">
        <Container>
          <Link to="/">
            <Navbar.Brand>
              <LazyLoadImg
                type=""
                img="https://i.postimg.cc/QxRznyxx/44.webp"
                width=""
                height="65"
                alt="logo"
              />
            </Navbar.Brand>
          </Link>

          {/* show navbar button responsive screen */}
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={
              storedTheme == "light"
                ? { border: "1px solid gray", background: "#424242" }
                : storedTheme == "dark"
                ? {}
                : ""
            }
          />

          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link
                className="nav-links"
                style={
                  storedTheme == "light"
                    ? { color: "white", fontWeight: "600" }
                    : storedTheme == "dark"
                    ? { color: "#00000094", fontWeight: "600" }
                    : ""
                }
                as={Link}
                to="/"
              >
                Home
              </Nav.Link>

              <Nav.Link
                className="nav-links"
                style={
                  storedTheme == "light"
                    ? { color: "white" }
                    : storedTheme == "dark"
                    ? { color: "#00000094" }
                    : ""
                }
                as={Link}
                to="/About"
              >
                About
              </Nav.Link>
            </Nav>

            <Navbar.Collapse className="justify-content-end link">
              {userData != null ? (
                // show option profile user and log out
                <div className="imgPrf">
                  <Button
                    style={
                      storedTheme == "light"
                        ? { color: "white" }
                        : storedTheme == "dark"
                        ? { color: "#00000094" }
                        : ""
                    }
                    variant="outline"
                    onClick={() => sendUserToProfile(userData._id, history)}
                  >
                    Hello {userData.FirstName} (Profile)
                  </Button>

                  <Button
                    variant="outline"
                    style={{ color: "red" }}
                    onClick={() => logOutUser(history)}
                  >
                    Log out
                  </Button>
                </div>
              ) : (
                <>
                  <Nav.Link className="nav-links" onClick={handleShow}>
                    Login
                  </Nav.Link>

                  <Nav.Link className="nav-links" as={Link} to="/Register">
                    Register
                  </Nav.Link>
                </>
              )}
            </Navbar.Collapse>

            {/* active dark mode in heater */}
            <DarkMode />

            {/* model popup show Sign in */}
            <Modal show={show}>
              <Sign_in hideSignIn={handleClose} />
            </Modal>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}


export default Menu;