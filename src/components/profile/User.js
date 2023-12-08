import React from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import '../../css/profile.css'
import { LoadMedicalFileUser, showAllMyReview, LoadMedicalFileUserIsNotActive } from '../../Api/LoadDataFromApi'
import { useQueryOnlyLoadingData, useQueryDataLoadingRefetchAutoData } from "../../customHook/customQueryHook"
import NotFoundPage from '../tools/NotFoundPage'
import { motion as m } from "framer-motion/dist/framer-motion"
import LoadingUserData from "../loading/LoadingUserData"
import UserQueues from './userService/tabs/UserQueues';
import HistoryMedicalFile from './userService/tabs/HistoryMedicalFile';
import MyComments from './userService/tabs/MyComments';
import PersonalData from './userService/tabs/PersonalData';
import MedicalFilesUser from './userService/tabs/MedicalFilesUser';



//data_user - take all data user from Page Profile (user)
function User({ data_user }) {


    let storedTheme = localStorage.getItem("theme");


    // useQuery
    const { isLoading: MyReview, data: myReview, isError: ErrorMyReview } =
        useQueryDataLoadingRefetchAutoData('myReview', null, showAllMyReview, data_user.code);

    const { isLoading: Medical_File, data: medical_File, isError: ErrorMedical_File } =
        useQueryOnlyLoadingData('medical_File', LoadMedicalFileUser, data_user.code);

    const { isLoading: Medical_File_Is_Not_Active, data: medical_File_Is_Not_Active, isError: ErrorMedical_File_Is_Not_Active } =
        useQueryOnlyLoadingData('medical_File_Is_Not_Active', LoadMedicalFileUserIsNotActive, data_user.code);



    return (
        <>
            {(MyReview || Medical_File || Medical_File_Is_Not_Active) ?
                <LoadingUserData />
                :
                (ErrorMyReview || ErrorMedical_File || ErrorMedical_File_Is_Not_Active) ?
                    <NotFoundPage />
                    :
                    <m.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.75, ease: "easeOut" }}>
                        <div className={(storedTheme === "light") ? "" : (storedTheme === "dark") ? "bg-white" : ""}>

                            <Tabs id="controlled-tab-example" className={(storedTheme === "light") ? "mb-3 tabsChioseDark" : (storedTheme === "dark") ? "mb-3 tabsChiose" : ""} >

                                <Tab eventKey="My queues" title="My queues" className={(storedTheme === "light") ? "QueuesDark" : (storedTheme === "dark") ? "Queues" : ""}>

                                    <UserQueues day={data_user.day} data_user={data_user} />

                                </Tab>


                                <Tab eventKey="medical File" title="Medical File + Pay service" className='Medical'>

                                    <MedicalFilesUser medical_File={medical_File} />

                                </Tab>


                                <Tab eventKey="History (medical File)" title="History (Medical File)" className='HistoryMedical'>

                                    <HistoryMedicalFile medical_File_Is_Not_Active={medical_File_Is_Not_Active} />

                                </Tab>


                                <Tab eventKey="My Comments" title="My Comments (Reviews)" className='Comments'>

                                    <MyComments myReview={myReview} />

                                </Tab>


                                <Tab eventKey="personal data" title="Personal Data (Update)" className='updateDateUser'>

                                    <PersonalData data_user={data_user} />

                                </Tab>

                            </Tabs>
                        </div>
                    </m.div>
            }
        </>
    )

}


export default User;