import React, { useState, useEffect } from 'react'
import '../css/About.css'
import Swal from 'sweetalert2'
import date1 from '../Json_date/date.json'
import { LoadCountDoctors, LoadCountUsers, LoadCountReviews } from '../Api/LoadDataFromApi'


//show about clinic info
function About() {


    const [ShowCountDoctor, SetShowCountDoctor] = useState([]);
    const [ShowCountUsers, SetShowCountUsers] = useState([]);
    const [ShowCountReviews, SetShowCountReviews] = useState([]);
    const [ShowCountServiceOurWork, SetShowCountServiceOurWork] = useState('');


    let storedTheme = localStorage.getItem("theme");



    // load data from LoadDataFromApi component
    const LoadCountDetailsFromApi = async () => {

        SetShowCountDoctor(await LoadCountDoctors())
        SetShowCountUsers(await LoadCountUsers())
        SetShowCountReviews(await LoadCountReviews())
    }



    //long(count) service our work , from fle Json date1.work
    const LoadCountServiceOurWork = () => {

        let longeur = date1.work.length;

        SetShowCountServiceOurWork(longeur)
    }




    useEffect(() => {

        LoadCountDetailsFromApi()
        LoadCountServiceOurWork();

        Swal.fire({
            background: 'none',
            showConfirmButton: false,
            timer: 1000,
            html: '<div class="loader"></div>'
        })
    }, [])




    if (storedTheme === "dark") {

        return (

            <>
                <div className='titleAbout'>
                    <h1>About Dental Care Clinic</h1>
                    <br />
                    <p>(1) This Clinic was Number one in Kfar-Yona City.</p>
                    <p>(2) We provide excellent customer service and also a good attitude towards our customers.</p>
                    <p>(3) We handle every area related to dental care , Read more about our service - <a href='/OurWork'>Click Me</a>.</p>
                    <p>(4) Have a Good Location Clinic and Contact - <a href='/Location'>See Location</a>.</p>
                    <p>(5) See Customer reviews - <a href='/Service'>See Review's</a>.</p>

                </div>


                <div className='cardsInfoAbout' >

                    <div className="a-box">
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/12.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="text">
                            <h3>Doctor's :</h3>
                            <div>
                                <p>{ShowCountDoctor}</p>
                            </div>
                        </div>
                    </div>


                    <div className="a-box" >
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/ourworkservice.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="text">
                            <h3>Types Of Dental Care Service :</h3>
                            <div>
                                <p>{ShowCountServiceOurWork}</p>
                            </div>
                        </div>
                    </div>


                    <div className="a-box">
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/users.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="text">
                            <h3>Our Customer's :</h3>
                            <div>
                                <p>{ShowCountUsers}</p>
                            </div>
                        </div>
                    </div>


                    <div className="a-box" >
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/reviewuser.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="text">
                            <h3>Customer Review's :</h3>
                            <div>
                                <p>{ShowCountReviews}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }




    if (storedTheme === "light") {

        return (

            <>
                <div className='titleAboutDark'>
                    <h1>About Dental Care Clinic</h1>
                    <br />
                    <p>(1) This Clinic was Number one in Kfar-Yona City.</p>
                    <p>(2) We provide excellent customer service and also a good attitude towards our customers.</p>
                    <p>(3) We handle every area related to dental care , Read more about our service - <a href='/OurWork'>Click Me</a>.</p>
                    <p>(4) Have a Good Location Clinic and Contact - <a href='/Location'>See Location</a>.</p>
                    <p>(5) See Customer reviews - <a href='/Service'>See Review's</a>.</p>
                </div>


                <div className='cardsInfoAbout' >

                    <div className="a-box">
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/12.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="textDark">
                            <h3>Doctor's :</h3>
                            <div>
                                <p>{ShowCountDoctor}</p>
                            </div>
                        </div>
                    </div>


                    <div className="a-box" >
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/ourworkservice.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="textDark">
                            <h3>Types Of Dental Care Service :</h3>
                            <div>
                                <p>{ShowCountServiceOurWork}</p>
                            </div>
                        </div>
                    </div>


                    <div className="a-box">
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/users.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="textDark">
                            <h3>Our Customer's :</h3>
                            <div>
                                <p>{ShowCountUsers}</p>
                            </div>
                        </div>
                    </div>



                    <div className="a-box" >
                        <div className="img">
                            <div className="img-inner">
                                <div className="inner-skew">
                                    <img src={require("../images/reviewuser.png")} alt="icon" />
                                </div>
                            </div>
                        </div>
                        <div className="textDark">
                            <h3>Customer Review's :</h3>
                            <div>
                                <p>{ShowCountReviews}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }

}

export default About;