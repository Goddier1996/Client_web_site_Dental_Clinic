import React from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import '../../css/profile.css';
import { LoadUsersActive_queues, LoadMedicalFileAllUsersHowNeedPay } from '../../Api/LoadDataFromApi'
import NotFoundPage from '../tools/NotFoundPage'
import { useQueryOnlyLoadingData } from "../../customHook/customQueryHook"
import { motion as m } from "framer-motion/dist/framer-motion"
import LoadingDoctorData from "../loading/LoadingDoctorData"
import ActiveQueues from './doctorService/tabs/ActiveQueues';
import WhoShouldPay from './doctorService/tabs/WhoShouldPay';


//here component Doctor we to do what doctor can do = this component use in profile
//take props doctor user code to show data doctor in profile doctor
function Doctor({ code_doctor }) {


    let storedTheme = localStorage.getItem("theme");


    // use custom hook , useQuery
    const { isLoading: UsersActive_queues, data: usersActive_queues, isError: ErrorActive_queues } =
        useQueryOnlyLoadingData('Active_queues', LoadUsersActive_queues, null);

    const { isLoading: Medical_File_All_users, data: medical_File_All_users, isError: ErrorFile_All_users } =
        useQueryOnlyLoadingData('medical_FileUsers', LoadMedicalFileAllUsersHowNeedPay, null);



    return (

        <>
            {(UsersActive_queues || Medical_File_All_users) ?
                <LoadingDoctorData />
                :
                (ErrorActive_queues || ErrorFile_All_users) ?
                    <NotFoundPage />
                    :
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.75, ease: "easeOut" }}>
                        <div className={(storedTheme === "light") ? "" : (storedTheme === "dark") ? "bg-white" : ""}>

                            <div className="profile">
                                <div className="profile-headerDoctor">
                                    <div className="profile-header-cover"></div>

                                    <div className="profile-header-content">
                                        <div className="profile-header-info">
                                            <h4 className="m-t-10 m-b-5">Hello {code_doctor.name} </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <Tabs id="controlled-tab-example" className={(storedTheme === "light") ? "mb-3 tabsChioseDark" : (storedTheme === "dark") ? "mb-3 tabsChiose" : ""} >

                                <Tab eventKey="Active queues (customers)" title="Active queues (customers)" className='ActiveQueues'>

                                    <ActiveQueues usersActive_queues={usersActive_queues} />

                                </Tab>


                                <Tab eventKey="Who should pay" title="Who should pay (users)" className='shouldPay'>

                                    <WhoShouldPay medical_File_All_users={medical_File_All_users} />

                                </Tab>
                            </Tabs>
                        </div>
                    </m.div>
            }
        </>
    )

}


export default Doctor;