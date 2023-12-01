import React from 'react'
import Admin from '../components/profile/Admin'
import Doctor from '../components/profile/Doctor'
import User from '../components/profile/User'



// profile page , open profile page as per UserType_code from data base , user-admin-doctor
function Profile() {


    let userData = JSON.parse(sessionStorage.getItem("user"));


    //save in object all data user from session storage "user"
    const obj = {
        code: userData._id,
        name: userData.FirstName,
        login: userData.User_Login,
        email: userData.Email,
        birthday: userData.Birthday,
        password: userData.User_password,
        confirm_password: userData.ConfirmPassword,
        day: userData.Day_date,
        hour: userData.Hour_day,
        codeHour: userData.Serial_codeHour
    }



    //user page
    if (userData.UserType_code == 1) {

        return (
            <User data_user={obj} />
        )
    }


    //doctor page
    if (userData.UserType_code == 2) {

        return (
            <Doctor code_doctor={obj} />
        )
    }


    //admin page
    if (userData.UserType_code == 3) {

        return (
            <Admin />
        )
    }

}


export default Profile;