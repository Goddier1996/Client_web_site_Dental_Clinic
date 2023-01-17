import React from 'react'
import '../css/About.css'
import date1 from '../Json_date/date.json'
import { LoadCountDoctors, LoadCountUsers, LoadCountReviews } from '../Api/LoadDataFromApi'
import { useQuery } from 'react-query'


//show about clinic info
function About() {


    let storedTheme = localStorage.getItem("theme");


    const { isLoading: LoadingReviews, data: countReviews } = useQuery('CountReviews', () => {
        return LoadCountReviews();
    })


    const { isLoading: LoadingUsers, data: countUsers } = useQuery('CountUsers', () => {
        return LoadCountUsers();
    })


    const { isLoading: LoadingDoctors, data: countDoctors } = useQuery('CountDoctors', () => {
        return LoadCountDoctors();
    })


    const { isLoading: LoadingServiceOurWork, data: countServiceOurWork } = useQuery('CountServiceOurWork ', () => {
        return date1.work.length;
    })





    if (LoadingReviews || LoadingUsers || LoadingDoctors || LoadingServiceOurWork) {

        return (
            <div className='loadingCountPersonalClinic'>
                <img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!f305cw"></img>
            </div>
        )
    }



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
                                <p>{countDoctors}</p>
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
                                <p>{countServiceOurWork}</p>
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
                                <p>{countUsers}</p>
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
                                <p>{countReviews}</p>
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
                                <p>{countDoctors}</p>
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
                                <p>{countServiceOurWork}</p>
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
                                <p>{countUsers}</p>
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
                                <p>{countReviews}</p>
                            </div>
                        </div>
                    </div>

                </div>
            </>
        )
    }

}

export default About;