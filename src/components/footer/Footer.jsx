import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './footer.css'


function Footer() {

    let storedTheme = localStorage.getItem("theme");

    return (
            <footer  className='Fotr'>

                <div className={(storedTheme === "light") ? "text-center text-white fotrIconFirst" : (storedTheme === "dark") ? "text-center text-white fotrIcon" : ""}>

                    <div className='container p-4 pb-0'>
                        <section className='mb-4'>
                            <a
                                className='btn btn-primary btn-floating m-1'
                                style={{ backgroundColor: '#3b5998', border: "none" }}
                                href='https://www.facebook.com/profile.php?id=100007268836178'
                                role='button'
                            >
                                <i className="bi bi-facebook"></i>
                            </a>

                            <a
                                className='btn btn-primary btn-floating m-1'
                                style={{ backgroundColor: '#ac2bac', border: "none" }}
                                href='https://www.instagram.com/artem_kot96'
                                role='button'
                            >
                                <i className="bi bi-instagram"></i>
                            </a>

                            <a
                                className='btn btn-primary btn-floating m-1'
                                style={{ backgroundColor: '#0077b5', border: "none" }}
                                href='https://www.linkedin.com/in/artem-kot96'
                                role='button'
                            >
                                <i className="bi bi-linkedin"></i>
                            </a>

                        </section>
                    </div>

                    <div className={(storedTheme === "light") ? "text-center p-3 endDark" : (storedTheme === "dark") ? "text-center p-3 end" : ""} >
                        <p>© Create and Style Artem Kot</p>
                    </div>
                </div>
            </footer >
    )
}


export default Footer;