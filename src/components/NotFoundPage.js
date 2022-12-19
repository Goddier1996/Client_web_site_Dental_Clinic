import React from 'react'
import { Button } from 'react-bootstrap'
import '../css/NotFoundPage.css'


// here create page Not Found active this component in App.js
export default function NotFoundPage() {


    return (

        <div className='notFoundPage'>

            <p className="zoom-area"><b>Oh no!!</b><br />You’re either misspelling the URL or requesting a page that's no longer here.</p>

            <section className="error-show">
                <span className="four"><span className="screen-reader-text">4</span></span>
                <span className="zero"><span className="screen-reader-text">0</span></span>
                <span className="four"><span className="screen-reader-text">4</span></span>
            </section>

            <div className="link-show">
                <Button className="more-link" variant="success" size="sm" href="/" >
                    Back To Home Page
                </Button>
            </div>

        </div>
    )
}