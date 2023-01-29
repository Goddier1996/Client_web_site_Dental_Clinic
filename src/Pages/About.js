import React from 'react'
import '../css/About.css'
import date1 from '../Json_date/date.json'
import { LoadCountDoctors, LoadCountUsers, LoadCountReviews } from '../Api/LoadDataFromApi'
import NotFoundPage from '../components/NotFoundPage'
import { useQueryOnlyLoadingData } from "../customHook/customQueryHook"
import { motion as m } from "framer-motion/dist/framer-motion"
import { container, item } from "../styleComponents/StyleAnimation"



//show about clinic info
function About() {


    let storedTheme = localStorage.getItem("theme");


    const getLengthDataOurWorkFromJsonFile = () => {

        return date1.work.length;
    }



    // use custom hook , useQuery
    const { isLoading: LoadingReviews, data: countReviews, isError: ErrorReviews } =
        useQueryOnlyLoadingData('CountReviews', LoadCountReviews, null);

    const { isLoading: LoadingUsers, data: countUsers, isError: ErrorUsers } =
        useQueryOnlyLoadingData('CountUsers', LoadCountUsers, null);

    const { isLoading: LoadingDoctors, data: countDoctors, isError: ErrorDoctors } =
        useQueryOnlyLoadingData('CountDoctors', LoadCountDoctors, null);

    const { isLoading: LoadingServiceOurWork, data: countServiceOurWork, isError: ErrorOurWork } =
        useQueryOnlyLoadingData('CountServiceOurWork', getLengthDataOurWorkFromJsonFile, null);




    return (

        <>
            {/* show Loading */}
            {(LoadingReviews || LoadingUsers || LoadingDoctors || LoadingServiceOurWork) ?
                <div className='loadingCountPersonalClinic'>
                    <img src="https://img.pikbest.com/png-images/20190918/cartoon-snail-loading-loading-gif-animation_2734139.png!f305cw" />
                </div>
                :
                (ErrorReviews || ErrorUsers || ErrorDoctors || ErrorOurWork) ?
                    <>
                        <NotFoundPage />
                    </>
                    :
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        // initial={{ y: "100%" }}
                        // animate={{ y: "0%" }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.75, ease: "easeOut" }}
                        style={{ paddingBottom: "1.8%" }}
                    >

                        <m.div variants={container} initial="hidden" animate="show"
                            className={(storedTheme === "light") ? "titleAboutDark" : (storedTheme === "dark") ? "titleAbout" : ""}>
                            <br />
                            <h1 >About Dental Care Clinic</h1>
                            <m.p variants={item}>(1) This Clinic was Number one in Kfar-Yona City</m.p>
                            <m.p variants={item}>(2) Have a Good Location Clinic and Contact - <a href='/Location'>See Location</a></m.p>
                            <m.p variants={item}>(3) See Customer reviews - <a href='/Service'>See Review's</a></m.p>
                            <m.p variants={item}>(4) We provide excellent customer service and also a good attitude towards our customers</m.p>
                            <m.p variants={item}>(5) We handle every area related to dental care , Read more about our service - <a href='/OurWork'>Click Me</a></m.p>
                        </m.div>

                        <br />

                        <div className='cardsInfoAbout' >

                            <div className="a-box">
                                <div className="img">
                                    <div className="img-inner">
                                        <div className="inner-skew">
                                            <img src="https://i.postimg.cc/TP3RsfDx/12.png" alt="icon" />
                                        </div>
                                    </div>
                                </div>

                                <div className={(storedTheme === "light") ? "textDark" : (storedTheme === "dark") ? "text" : ""}>
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
                                            <img src="https://i.postimg.cc/R0hBRdkV/ourworkservice.png" alt="icon" />
                                        </div>
                                    </div>
                                </div>

                                <div className={(storedTheme === "light") ? "textDark" : (storedTheme === "dark") ? "text" : ""}>
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
                                            <img src="https://i.postimg.cc/nVBt0CP7/users.png" alt="icon" />
                                        </div>
                                    </div>
                                </div>

                                <div className={(storedTheme === "light") ? "textDark" : (storedTheme === "dark") ? "text" : ""}>
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
                                            <img src="https://i.postimg.cc/rm47nPQc/reviewuser.png" alt="icon" />
                                        </div>
                                    </div>
                                </div>

                                <div className={(storedTheme === "light") ? "textDark" : (storedTheme === "dark") ? "text" : ""}>
                                    <h3>Customer Review's :</h3>
                                    <div>
                                        <p>{countReviews}</p>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </m.div>
            }
        </>
    )

}

export default About;