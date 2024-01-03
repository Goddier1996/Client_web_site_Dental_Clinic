import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, Container, Button, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import './menu.css'
import { useHistory, Link } from 'react-router-dom';
import Sign_in from '../login/signIn/SignI_in'
import {logOutUser,sendUserToProfile} from "./function/FunctionsMenu"


function Menu() {


    localStorage.setItem("theme", "dark");

    let storedTheme = localStorage.getItem("theme");
    let userData = JSON.parse(sessionStorage.getItem("user"));

        
    const defaultDark = storedTheme === "dark" || (storedTheme === null);

    if (defaultDark) {
        localStorage.setItem("theme", "dark");
        document.documentElement.setAttribute("data-theme", "dark");
    }

    const history = useHistory()

    // pop up sign in
    const [showModelSignIn, setShowModelSignIn] = useState(false);
    const handleCloseModelSignIn = () => setShowModelSignIn(false);
    const handleShowModelSignIn = () => setShowModelSignIn(true);


    return (
        <>
            <div className={(storedTheme == "light") ? "menuDark" : (storedTheme == "dark") ? "menu" : ""}>
                <Navbar collapseOnSelect expand="sm" >
                    <Container>

                        <Link to='/'><Navbar.Brand ><img src="https://i.postimg.cc/QxRznyxx/44.webp" alt="icon" /></Navbar.Brand></Link>

                        <Navbar.Toggle aria-controls="responsive-navbar-nav" style={(storedTheme == "light") ? { border: "1px solid gray", background: "#424242" } :
                            (storedTheme == "dark") ? {} : ""} />

                        <Navbar.Collapse id="responsive-navbar-nav">

                            <Nav className="me-auto">
                                <Nav.Link style={(storedTheme == "light") ? { color: "white", fontWeight: "600" } :
                                    (storedTheme == "dark") ? { color: "#00000094", fontWeight: "600" } : ""}
                                    as={Link} to="/">Home</Nav.Link>
                                <Nav.Link style={(storedTheme == "light") ? { color: "white" } :
                                    (storedTheme == "dark") ? { color: "#00000094" } : ""}
                                    as={Link} to="/About">About</Nav.Link>
                            </Nav>


                            <Navbar.Collapse className="justify-content-end link">
                                {userData != null ?

                                    <div className='imgPrf'>
                                        <Button variant={(storedTheme == "light") ? "outline-light" :
                                            (storedTheme == "dark") ? "outline-secondary" : ""}
                                            onClick={()=>sendUserToProfile(userData._id,history)}>
                                            Hello {userData.FirstName} (Profile)
                                        </Button>

                                        <br />

                                        <Button variant="outline-danger"
                                            onClick={()=>logOutUser(history)}>
                                            Log out
                                        </Button>
                                    </div>
                                    :
                                    <>
                                        <Nav.Link onClick={handleShowModelSignIn}>Login</Nav.Link>
                                        <Nav.Link as={Link} to='/Register'>Register</Nav.Link>
                                    </>
                                }
                            </Navbar.Collapse>


                            {/* model popup show Sign in */}
                            <Modal show={showModelSignIn} >
                                <Sign_in hideSignIn={handleCloseModelSignIn} />
                            </Modal>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}


export default Menu;