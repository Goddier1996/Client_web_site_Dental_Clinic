import React, { useState, useEffect } from 'react'
import { Tabs, Tab } from 'react-bootstrap';
import '../../css/profile.css'
import Swal from 'sweetalert2'
import { LoadAllUsers, LoadAllUsersBlocked, LoadAllDoctors, LoadAllReviews } from '../../Api/LoadDataFromApi'
import { DeleteUser, DeleteReview, ActiveUserInDataBase } from '../../Api/DeleteUpdateDataFromApi'
import ShowAllUsers from './adminService/tabs/ShowAllUsers';
import ShowAllUsersBlocked from './adminService/tabs/ShowAllUsersBlocked';
import ShowAllDoctors from './adminService/tabs/ShowAllDoctors';
import AddNewDoctor from './adminService/tabs/AddNewDoctor';
import ShowAllReviews from './adminService/tabs/ShowAllReviews';



//here component Admin we to do what admin can do = this component use in profile
function Admin() {


    const [Users, SetUsers] = useState([])
    const [UsersBlocked, SetUsersBlocked] = useState([])
    const [Doctors, SetDoctors] = useState([])
    const [Reviews, SetReviews] = useState([])



    //  take all func from LoadDataFromApi component
    const LoadDetailsFromApi = async () => {

        SetUsers(await LoadAllUsers())
        SetUsersBlocked(await LoadAllUsersBlocked())
        SetDoctors(await LoadAllDoctors())
        SetReviews(await LoadAllReviews())
    }



    const DeleteItemsFromDataApi = async (Id, item) => {

        if (item == "review") {

            await DeleteReview(Id);
            window.location.reload(false);
        }

        if (item == "user") {

            await DeleteUser(Id);
            window.location.reload(false);
        }
    }


    //active all users how was block
    const ActiveUser = async (Id) => {

        await ActiveUserInDataBase(Id);
        window.location.reload(false);
    }



    useEffect(() => {

        LoadDetailsFromApi();

        Swal.fire({
            background: 'none',
            width: 400,
            showConfirmButton: false,
            timer: 2100,
            html: '<img src="https://i.postimg.cc/KzypDw9n/admin.png" height="200"></img>'
        })
    }, [])



    return (

        <>
            <Tabs id="controlled-tab-example" className="mb-3 tabsChiose " >

                <Tab eventKey="show all users" title="All Users" className='AllUsers'>

                    <ShowAllUsers Users={Users} DeleteItemsFromDataApi={DeleteItemsFromDataApi} />

                </Tab>


                <Tab eventKey="show all users blocked" title="All Users Blocked" className='AllUsersBlocked'>

                    <ShowAllUsersBlocked UsersBlocked={UsersBlocked} ActiveUser={ActiveUser} />

                </Tab>


                <Tab eventKey="show all Doctors" title="All Doctors" className='AllDoctors'>

                    <ShowAllDoctors Doctors={Doctors} DeleteItemsFromDataApi={DeleteItemsFromDataApi} />

                </Tab>


                <Tab eventKey="add new doctor" title="Add new Doctor" className='NewDoctor'>

                    <AddNewDoctor />

                </Tab>


                <Tab eventKey="show all Reviews" title="All Reviews" className='AllReviews'>

                    <ShowAllReviews Reviews={Reviews} DeleteItemsFromDataApi={DeleteItemsFromDataApi} />

                </Tab>

            </Tabs>
        </>
    )

}


export default Admin;