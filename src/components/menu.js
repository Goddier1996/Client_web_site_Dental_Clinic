import 'bootstrap/dist/css/bootstrap.css'
import { Nav, Navbar, Container, Button, Modal } from 'react-bootstrap'
import React, { useState } from 'react'
import '../css/menu.css'
import "../css/login.css"
import { useHistory, Link } from 'react-router-dom';
import Swal from 'sweetalert2'
import Sign_in from '../components/SignI_in'


function Menu() {

    // default localStorage theme
    // localStorage.setItem("theme", "dark");



    let storedTheme = localStorage.getItem("theme");
    let userData = JSON.parse(sessionStorage.getItem("user"));

    const defaultDark =
    storedTheme === "dark" || (storedTheme === null);


  if (defaultDark) {
    localStorage.setItem("theme", "dark");
    document.documentElement.setAttribute("data-theme", "dark");
  }


    const history = useHistory()

    // pop up sign in
    const [showModelSignIn, setShowModelSignIn] = useState(false);
    const handleCloseModelSignIn = () => setShowModelSignIn(false);
    const handleShowModelSignIn = () => setShowModelSignIn(true);



    const sendUserToProfile = () => {

        history.push(`/Profile/${userData._id}`);
    }



    const LogOutUser = () => {

        Swal.fire({
            title: 'Are you sure you want to leave?',
            icon: 'question',
            toast: true,
            position: 'top-end',
            showDenyButton: true,
            confirmButtonText: 'yes',
            denyButtonText: `no`,
            confirmButtonColor: "green",
            background: `${(storedTheme === "light") ? "#373E44" :
                (storedTheme === "dark") ? "" : ""}`,
            color: `${(storedTheme === "light") ? "#ffffffab" :
                (storedTheme === "dark") ? "" : ""}`,
            buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                (storedTheme === "dark") ? "" : ""}`
        }).then((result) => {

            if (result.isConfirmed) {

                sessionStorage.clear('user');
                history.push("/");
                window.location.reload(false);
            }
        })
    }



    // send this function to Sign_In component
    const hideModelSignIn = () => {

        setShowModelSignIn(false);
    }




    return (
        <>
            <div className={(storedTheme == "light") ? "menuDark" : (storedTheme == "dark") ? "menu" : ""}>
                <Navbar collapseOnSelect expand="sm" >
                    <Container>

                        <Link to='/'><Navbar.Brand ><img src={require("../images/z1z.png")} alt="icon"></img></Navbar.Brand></Link>

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
                                            onClick={sendUserToProfile}>
                                            Hello {userData.FirstName} (Profile)
                                        </Button>

                                        <br />

                                        <Button variant="outline-danger"
                                            onClick={LogOutUser}>
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
                            <Modal show={showModelSignIn} onHide={handleCloseModelSignIn} >
                                <Sign_in hideSignIn={hideModelSignIn} />
                            </Modal>

                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        </>
    );
}


export default Menu;