import { API } from './API';
import axios from 'axios';
import { ActiveDay, DeleteDay } from './DeleteUpdateDataFromApi';
import { GetTime } from '../components/addAppointment/function/AlertUserHaveTurnToday';


// ALL REVIEWS THIS CLINIC

export async function LoadReviews(pageNumber, sortReview) {

    // USE AXIOS
    const response = await axios.get(`${API.REVIEWS.GET}?p=${pageNumber}`);

    switch (sortReview) {
        case 'Default':
            return response.data;
        case 'High Like':
            return response.data.sort((a, b) => (b.Count_likes.length - a.Count_likes.length));
        case 'Low like':
            return response.data.sort((a, b) => (a.Count_likes.length - b.Count_likes.length));
        default:
            return response.data;
    }

    return response.data;
}


export async function CheckIfUserAddLikeThisReview(id, publishByLike) {

    const response = await axios.get(`${API.REVIEWS.GET}/showReviewCheckUserLike/${id}/${publishByLike}`);

    if (response.data) {
        sessionStorage.setItem("likeReview", true);
    }
    else {
        sessionStorage.setItem("likeReview", false);
    }
}



// ABOUT THIS CLINIC COUNT DETAILS

export async function LoadCountDoctors() {

    // USE AXIOS
    const response = await axios.get(`${API.USERS.GET}/countDoctors`);
    return response.data;
}


export async function LoadCountUsers() {

    // USE AXIOS
    const response = await axios.get(`${API.USERS.GET}/countUsers`);
    return response.data;
}


export async function LoadCountReviews() {

    // USE AXIOS
    const response = await axios.get(`${API.REVIEWS.GET}/countReviews`);
    return response.data;
}



// ADMIN WORK

export async function LoadAllUsers() {

    // USE AXIOS
    const response = await axios.get(API.USERS.GET);
    return response.data;
}


export async function LoadAllUsersBlocked() {

    // USE AXIOS
    const response = await axios.get(`${API.USERS.GET}/BlockUsers`);
    return response.data;
}


export async function LoadAllDoctors() {

    // USE AXIOS
    const response = await axios.get(`${API.USERS.GET}/showDoctors`);
    return response.data;
}


export async function LoadAllReviews() {

    // USE AXIOS
    const response = await axios.get(API.REVIEWS.GET);
    return response.data;
}




// USER DATA

export async function LoadMedicalFileUser(code) {

    // USE AXIOS
    const response = await axios.get(`${API.MEDICAL_FILE.GET}/${code}`);
    return response.data;
}


export async function showAllMyReview(code) {

    // USE AXIOS
    const response = await axios.get(`${API.REVIEWS.GET}/${code}`);
    return response.data;
}


export async function LoadMedicalFileUserIsNotActive(code) {

    // USE AXIOS
    const response = await axios.get(`${API.MEDICAL_FILE.GET}/showHistoryFiles/${code}`);
    return response.data;
}



// DOCTOR WORK

export async function LoadUsersActive_queues() {

    // USE AXIOS
    const response = await axios.get(`${API.USERS.GET}/showTurnUsers`);
    return response.data;
}


export async function LoadMedicalFileAllUsersHowNeedPay() {

    // USE AXIOS
    const response = await axios.get(`${API.MEDICAL_FILE.GET}/showHowNeedPay`);
    return response.data;
}



// APPOINTMENT

export async function LoadDays() {

    // USE AXIOS
    const response = await axios.get(API.DAYS.GET);

    return response.data;
}



export async function NotActiveDays() {

    let response = await LoadDays();
    let date = new Date();
    let Day = date.getDay();
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let getDayToday = weekday[Day];
    let getIndexDayToday = weekday.indexOf(getDayToday)
    let indexDayToday = getIndexDayToday + 1;

    let hoursAndMinutes = GetTime(new Date());

    // if day today Saturday and time 23:00 (this end week),
    // active all days to new week(for users can save new turn)
    if (getDayToday == "Saturday" && hoursAndMinutes == "23:00") {

        for (let i = 0; i < response.length; i++) {
            await ActiveDay(response[i]._id);
        }
        return;
    }

    else {
        for (let i = 0; i < response.length; i++) {
            // if Serial_code day from database small indexDayToday not active(2) day
            if (response[i].Serial_code < indexDayToday) {
                await DeleteDay(response[i]._id);
            }
        }
        return;
    }
}


export async function LoadHour(id) {

    // USE AXIOS
    let response = await axios.get(`${API.HOURS.GET}/${id}`);
    return response.data;
}