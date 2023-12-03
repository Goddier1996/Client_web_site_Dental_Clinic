import React from 'react'
import '../css/About.css'
import date1 from '../Json_date/date.json'
import { LoadCountDoctors, LoadCountUsers, LoadCountReviews } from '../Api/LoadDataFromApi'
import NotFoundPage from '../components/tools/NotFoundPage'
import { useQueryOnlyLoadingData } from "../customHook/customQueryHook"
import { motion as m } from "framer-motion/dist/framer-motion"
import { container, item } from "../styleComponents/StyleAnimation"
import LoadingCountPersonalClinic from "../components/loading/LoadingCountPersonalClinic"
import InfoCounts from '../components/aboutClinic/InfoCounts'


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
                <LoadingCountPersonalClinic />
                :
                (ErrorReviews || ErrorUsers || ErrorDoctors || ErrorOurWork) ?
                    <NotFoundPage />
                    :
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
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

                        {/* here show count */}
                        <div className='cardsInfoAbout' >
                            <InfoCounts type={"Doctor's"} count={countDoctors} img={"https://i.postimg.cc/TP3RsfDx/12.png"} />
                            <InfoCounts type={"Types Of Dental Care Service"} count={countServiceOurWork} img={"https://i.postimg.cc/R0hBRdkV/ourworkservice.png"} />
                            <InfoCounts type={"Our Customer's"} count={countUsers} img={"https://i.postimg.cc/nVBt0CP7/users.png"} />
                            <InfoCounts type={"Customer Review's"} count={countReviews} img={"https://i.postimg.cc/rm47nPQc/reviewuser.png"} />
                        </div>
                    </m.div>
            }
        </>
    )

}

export default About;