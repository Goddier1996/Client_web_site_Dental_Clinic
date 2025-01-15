import React from 'react'
import Admin from '../components/profile/Admin.jsx'
import Doctor from '../components/profile/Doctor.jsx'
import User from '../components/profile/User.jsx'
import Cookies from 'js-cookie';


// profile page , user-admin-doctor
function Profile() {

    // let userData = JSON.parse(sessionStorage.getItem("user"));
    let userData = Cookies.get('user-data') ? JSON.parse(Cookies.get('user-data')) : null;
    
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


    return (
        <>
            {
                userData.UserType_code == 1 ?
                    <User data_user={obj} /> :
                    
                    userData.UserType_code == 2 ?
                        <Doctor code_doctor={obj} /> :

                        userData.UserType_code == 3 ?
                            <Admin />
                            : ""
            }
        </>
    )

}


export default Profile;