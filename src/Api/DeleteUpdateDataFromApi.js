import { API } from './API';
import axios from 'axios';



export async function DeleteUser(Id) {

    // USE AXIOS
    await axios.patch(`${API.USERS.GET}/NotActive/${Id}`);
}



export async function DeleteReview(Id) {

    // USE AXIOS
    await axios.delete(`${API.REVIEWS.GET}/delete/${Id}`);
}



export async function DeleteHour(Id) {

    // USE AXIOS
    await axios.patch(`${API.HOURS.GET}/NotActive/${Id}`);
}


export async function DeleteDay(Id) {

    // USE AXIOS
    await axios.patch(`${API.DAYS.GET}/NotActive/${Id}`);
}



export async function ActiveDay(Id) {

    // USE AXIOS
    await axios.patch(`${API.DAYS.GET}/active/${Id}`);
}




export async function UpdateDataUser(id, user) {

    const headers = {
        'Content-Type': 'application/json'
    }

    await axios.put(`${API.USERS.GET}/${id}`, user, { headers });
}



export async function UpdateDataUserRemoveTurn(codeUser) {

    // USE AXIOS
    let user = {
        Day_date: null,
        Hour_day: null,
        Serial_codeHour: null,
        DateWhenAddUserTurn: null,
        DateUserTurn: null,
        sendEmailHaveTurn: null
    };

    const headers = {
        'Content-Type': 'application/json'
    }

    await axios.patch(`${API.USERS.GET}/${codeUser}`, user, { headers: headers });
}



export async function UpdateDataUserAddTurn(id, dayLocal, hourLocal, serial_code, DateWhenAddUserTurn, DateUserTurn) {

    // USE AXIOS
    let user = {
        Day_date: dayLocal,
        Hour_day: hourLocal,
        Serial_codeHour: serial_code,
        DateWhenAddUserTurn: DateWhenAddUserTurn,
        DateUserTurn: DateUserTurn
    };

    await axios.patch(`${API.USERS.GET}/${id}`, user);
}



export async function ActiveHourInDataBase(codeHour) {

    // USE AXIOS
    await axios.patch(`${API.HOURS.GET}/active/${codeHour}`);
}



export async function ActiveUserInDataBase(Id) {

    // USE AXIOS
    await axios.patch(`${API.USERS.GET}/active/${Id}`);
}



export async function DeletePayFile(Id) {

    // USE AXIOS
    await axios.patch(`${API.MEDICAL_FILE.GET}/delete/${Id}`);
}



export async function ForgetPasswordUpdate(Id, user) {

    // USE AXIOS
    const headers = {
        'Content-Type': 'application/json'
    }

    await axios.patch(`${API.USERS.GET}/${Id}`, user, { headers: headers });
}