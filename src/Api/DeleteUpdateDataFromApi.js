import { API } from './API';
import axios from 'axios';



export async function DeleteUser(Id) {

    // USE FETCH
    // await fetch(`${API.USERS.GET}/NotActive/${Id}`,
    //     { method: 'PATCH' }
    // );


    // USE AXIOS
    await axios.patch(`${API.USERS.GET}/NotActive/${Id}`);
}



export async function DeleteReview(Id) {

    // USE FETCH
    // await fetch(`${API.REVIEWS.GET}/delete/${Id}`,
    //     { method: 'DELETE' }
    // );


    // USE AXIOS
    await axios.delete(`${API.REVIEWS.GET}/delete/${Id}`);
}



export async function DeleteHour(Id) {

    // USE FETCH
    // await fetch(`${API.HOURS.GET}/NotActive/${Id}`,
    //     { method: 'PATCH' }
    // );


    // USE AXIOS
    await axios.patch(`${API.HOURS.GET}/NotActive/${Id}`);
}



export async function UpdateDataUser(id, user) {

    const headers = {
        'Content-Type': 'application/json'
    }

    await axios.put(`${API.USERS.GET}/${id}`, user, { headers });
}



export async function UpdateDataUserRemoveTurn(codeUser) {

    // USE FETCH
    // try {

    // let user = {
    //     Day_date: null,
    //     Hour_day: null,
    //     Serial_codeHour: null
    // }

    //     await fetch(`${API.USERS.GET}/${codeUser}`, {
    //         method: 'PATCH',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(user)
    //     });

    // } catch (error) {
    //     console.log(error)
    // }


    // USE AXIOS
    let user = {
        Day_date: null,
        Hour_day: null,
        Serial_codeHour: null,
        DateWhenAddUserTurn: null,
        DateUserTurn: null
    };

    const headers = {
        'Content-Type': 'application/json'
    }

    await axios.patch(`${API.USERS.GET}/${codeUser}`, user, { headers: headers });
}



export async function UpdateDataUserAddTurn(id, dayLocal, hourLocal, serial_code, DateWhenAddUserTurn, DateUserTurn) {

    // USE FETCH
    // try {

    // let user = {
    //     FirstName: userData.FirstName,
    //     User_Login: userData.User_Login,
    //     Birthday: userData.Birthday,
    //     Email: userData.Email,
    //     User_password: userData.User_password,
    //     UserType_code: "1",
    //     Confirm_password: userData.Confirm_password,
    //     Day_date: dayLocal,
    //     Hour_day: hourLocal,
    //     Serial_codeHour: serial_code
    // }

    //     await fetch(`${API.USERS.GET}/${id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(user)
    //     });

    // } catch (error) {
    //     console.log(error)
    // }


    // USE AXIOS
    let user = {
        Day_date: dayLocal,
        Hour_day: hourLocal,
        Serial_codeHour: serial_code,
        DateWhenAddUserTurn: DateWhenAddUserTurn,
        DateUserTurn: DateUserTurn
    };

    // const headers = {
    //     'Content-Type': 'application/json'
    // }

    await axios.patch(`${API.USERS.GET}/${id}`, user);
}



export async function ActiveHourInDataBase(codeHour) {

    // USE FETCH
    // await fetch(`${API.HOURS.GET}/active/${codeHour}`, { method: 'PATCH' });


    // USE AXIOS
    await axios.patch(`${API.HOURS.GET}/active/${codeHour}`);
}



export async function ActiveUserInDataBase(Id) {

    // USE FETCH
    // await fetch(`${API.USERS.GET}/active/${Id}`, { method: 'PATCH' });


    // USE AXIOS
    await axios.patch(`${API.USERS.GET}/active/${Id}`);
}



export async function DeletePayFile(Id) {

    // USE FETCH
    // await fetch(`${API.MEDICAL_FILE.GET}/delete/${Id}`, { method: 'PATCH' });


    // USE AXIOS
    await axios.patch(`${API.MEDICAL_FILE.GET}/delete/${Id}`);
}



export async function ForgetPasswordUpdate(Id, user) {

    // USE FETCH
    // try {

    //     await fetch(`${API.USERS.GET}/${Id}`, {
    //         method: 'PATCH',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(user)
    //     });

    // } catch (error) {
    //     console.log(error)
    // }


    // USE AXIOS
    const headers = {
        'Content-Type': 'application/json'
    }

    await axios.patch(`${API.USERS.GET}/${Id}`, user, { headers: headers });
}