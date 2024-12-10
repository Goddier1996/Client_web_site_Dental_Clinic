import { API } from './API';
import axios from 'axios';
import { DeleteDay } from './DeleteUpdateDataFromApi';


// ALL REVIEWS THIS CLINIC

export async function LoadReviews(pageNumber, sortReview) {

    // USE FETCH
    // let res = await fetch(API.REVIEWS.GET, { method: 'GET' });
    // let data = await res.json();
    // return data;

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

    // USE FETCH
    // let res = await fetch(`${API.USERS.GET}/countDoctors`, { method: 'GET' });
    // let data = await res.json();
    // return data;

    // USE AXIOS
    const response = await axios.get(`${API.USERS.GET}/countDoctors`);
    return response.data;
}


export async function LoadCountUsers() {

    // USE FETCH
    // let res = await fetch(`${API.USERS.GET}/countUsers`, { method: 'GET' });
    // let data = await res.json();
    // return data;

    // USE AXIOS
    const response = await axios.get(`${API.USERS.GET}/countUsers`);
    return response.data;
}


export async function LoadCountReviews() {

    // USE FETCH
    // let res = await fetch(`${API.REVIEWS.GET}/countReviews`, { method: 'GET' });
    // let data = await res.json();
    // return data;

    // USE AXIOS
    const response = await axios.get(`${API.REVIEWS.GET}/countReviews`);
    return response.data;
}



// ADMIN WORK

export async function LoadAllUsers() {

    // USE FETCH
    // let res = await fetch(`${API.USERS.GET}`, { method: 'GET' });
    // let data = await res.json();
    // return data;

    // USE AXIOS
    const response = await axios.get(API.USERS.GET);
    return response.data;
}


export async function LoadAllUsersBlocked() {

    // USE FETCH
    // let res = await fetch(`${API.USERS.GET}/BlockUsers`, { method: 'GET' });
    // let data = await res.json();
    // return data;

    // USE AXIOS
    const response = await axios.get(`${API.USERS.GET}/BlockUsers`);
    return response.data;
}


export async function LoadAllDoctors() {

    // USE FETCH
    // let res = await fetch(`${API.USERS.GET}/showDoctors`, { method: 'GET' });
    // let data = await res.json();
    // return data;

    // USE AXIOS
    const response = await axios.get(`${API.USERS.GET}/showDoctors`);
    return response.data;
}


export async function LoadAllReviews() {

    // USE FETCH
    // let res = await fetch(API.REVIEWS.GET, { method: 'GET' });
    // let data = await res.json();
    // return data;

    // USE AXIOS
    const response = await axios.get(API.REVIEWS.GET);
    return response.data;
}




// USER DATA

export async function LoadMedicalFileUser(code) {

    // USE FETCH
    // let res = await fetch(`${API.MEDICAL_FILE.GET}/${code}`, { method: 'GET' });
    // let data = await res.json();
    // return data;

    // USE AXIOS
    const response = await axios.get(`${API.MEDICAL_FILE.GET}/${code}`);
    return response.data;
}


export async function showAllMyReview(code) {

    // USE FETCH
    // let res = await fetch(`${API.REVIEWS.GET}/${code}`, { method: 'GET' });
    // let data = await res.json();
    // return data;

    // USE AXIOS
    const response = await axios.get(`${API.REVIEWS.GET}/${code}`);
    return response.data;
}


export async function LoadMedicalFileUserIsNotActive(code) {

    // USE FETCH
    // let res = await fetch(`${API.MEDICAL_FILE.GET}/showHistoryFiles/${code}`, { method: 'GET' });
    // let data = await res.json();
    // return data;

    // USE AXIOS
    const response = await axios.get(`${API.MEDICAL_FILE.GET}/showHistoryFiles/${code}`);
    return response.data;
}



// DOCTOR WORK

export async function LoadUsersActive_queues() {

    // USE FETCH
    // let res = await fetch(`${API.USERS.GET}/showTurnUsers`, { method: 'GET' });
    // let data = await res.json();
    // return data;

    // USE AXIOS
    const response = await axios.get(`${API.USERS.GET}/showTurnUsers`);
    return response.data;
}


export async function LoadMedicalFileAllUsersHowNeedPay() {

    // USE FETCH
    // let res = await fetch(`${API.MEDICAL_FILE.GET}/showHowNeedPay`, { method: 'GET' });
    // let data = await res.json();
    // return data;

    // USE AXIOS
    const response = await axios.get(`${API.MEDICAL_FILE.GET}/showHowNeedPay`);
    return response.data;
}



// APPOINTMENT

export async function LoadDays() {

    // USE FETCH
    // let res = await fetch(API.DAYS.GET, { method: 'GET' });
    // let data = await res.json();
    // return data;

    // USE AXIOS
    const response = await axios.get(API.DAYS.GET);


    let date = new Date();
    let Day = date.getDay();
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let x = weekday[Day];
    let y = weekday.indexOf(x)
    let p = y + 1;

    for (let i = 0; i < response.data.length; i++) {

        if (response.data[i].Serial_code < p) {
            // alert(response.data[i].Serial_code)
            // to do not active(2) day 
            await DeleteDay(response.data[i]._id);
        }
    }

    return response.data;
}


export async function LoadHour(id) {

    // USE FETCH
    // let res = await fetch(`${API.HOURS.GET}/${Serial_code}`, { method: 'GET' });
    // let data = await res.json();

    // USE AXIOS
    let response = await axios.get(`${API.HOURS.GET}/${id}`);
    return response.data;
}