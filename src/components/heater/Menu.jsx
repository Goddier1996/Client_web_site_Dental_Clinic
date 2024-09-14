import "bootstrap/dist/css/bootstrap.css";
import { Nav, Navbar, Container, Button, Modal } from "react-bootstrap";
import React, { useState } from "react";
import "./menu.css";
import { useHistory, Link } from "react-router-dom";
import Sign_in from "../login/signIn/SignI_in";
import { logOutUser, sendUserToProfile } from "./function/FunctionsMenu";
import { ShowModelPopUp } from "../../customHook/showPopUp";
import LazyLoadImg from "../tools/lazyLoad/LazyLoadImg";
import DarkMode from "../tools/darkMode/DarkMode";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";


function Menu() {


  let storedTheme = localStorage.getItem("theme");
  let userData = JSON.parse(sessionStorage.getItem("user"));

  const history = useHistory();
  const location = useLocation();

  // show popup sign in custom Hook
  const { show, handleClose, handleShow } = ShowModelPopUp();

  const [clickToLogin, setClickToLogin] = useState(false);

  const openLoginPopUpSelectLine = () => {
    setClickToLogin(true);
    handleShow();
  };

  const closeLoginPopUpSelectLine = () => {
    setClickToLogin(false);
    handleClose();
  };



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
                className={location.pathname === "/" ? "selected" : "nav-links"}
                style={
                  storedTheme == "light"
                    ? { color: "white" }
                    : storedTheme == "dark"
                    ? { color: "#00000094" }
                    : ""
                }
                as={Link}
                to="/"
              >
                Home
              </Nav.Link>

              <Nav.Link
                className={
                  location.pathname === "/About" ? "selected" : "nav-links"
                }
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
                <div className="userOptions">
                  <Nav.Link
                    className={
                      location.pathname === `/Profile/${userData._id}`
                        ? "selected"
                        : "nav-links"
                    }
                    style={
                      storedTheme == "light"
                        ? { color: "white", fontSize: "14px" }
                        : storedTheme == "dark"
                        ? { color: "#00000094", fontSize: "14px" }
                        : ""
                    }
                    variant="outline"
                    onClick={() => sendUserToProfile(userData._id, history)}
                  >
                    Hello {userData.FirstName} (Profile)
                  </Nav.Link>

                  <div className="imgPrf">
                    <Button
                      variant="outline"
                      style={{ color: "red" }}
                      onClick={() => logOutUser(history)}
                    >
                      Log out
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <Nav.Link
                    className={
                      clickToLogin ? "selectedLoginOption" : "nav-links"
                    }
                    onClick={openLoginPopUpSelectLine}
                  >
                    Login
                  </Nav.Link>

                  <Nav.Link
                    className={
                      location.pathname === "/Register"
                        ? "selected"
                        : "nav-links"
                    }
                    as={Link}
                    to="/Register"
                  >
                    Register
                  </Nav.Link>
                </>
              )}
            </Navbar.Collapse>

            {/* active dark mode in heater */}
            <DarkMode />

            {/* model popup show Sign in */}
            <Modal show={show}>
              <Sign_in hideSignIn={closeLoginPopUpSelectLine} />
            </Modal>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}


export default Menu;