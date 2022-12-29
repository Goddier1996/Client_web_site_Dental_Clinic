import { API } from './API';



// ALL REVIEWS THIS CLINIC

export async function LoadReviews() {

    let res = await fetch(API.REVIEWS.GET, { method: 'GET' });
    let data = await res.json();
    return data;
}



// ADOUT THIS CLINIC COUNT DETAILS

export async function LoadCountDoctors() {

    let res = await fetch(`${API.USERS.GET}/countDoctors`, { method: 'GET' });
    let data = await res.json();
    return data;
}


export async function LoadCountUsers() {

    let res = await fetch(`${API.USERS.GET}/countUsers`, { method: 'GET' });
    let data = await res.json();
    return data;
}


export async function LoadCountReviews() {

    let res = await fetch(`${API.REVIEWS.GET}/countReviews`, { method: 'GET' });
    let data = await res.json();
    return data;
}



// ADMIN WORK

export async function LoadAllUsers() {

    let res = await fetch(`${API.USERS.GET}`, { method: 'GET' });
    let data = await res.json();
    return data;
}


export async function LoadAllUsersBlocked() {

    let res = await fetch(`${API.USERS.GET}/BlockUsers`, { method: 'GET' });
    let data = await res.json();
    return data;
}


export async function LoadAllDoctors() {

    let res = await fetch(`${API.USERS.GET}/showDoctors`, { method: 'GET' });
    let data = await res.json();
    return data;
}


export async function LoadAllReviews() {

    let res = await fetch(API.REVIEWS.GET, { method: 'GET' });
    let data = await res.json();
    return data;
}




// USER DATA

export async function LoadMedicalFileUser(code) {

    let res = await fetch(`${API.MEDICAL_FILE.GET}/${code}`, { method: 'GET' });
    let data = await res.json();
    return data;
}


export async function showAllMyReview(code) {

    let res = await fetch(`${API.REVIEWS.GET}/${code}`, { method: 'GET' });
    let data = await res.json();
    return data;;
}


export async function LoadMedicalFileUserIsNotActive(code) {

    let res = await fetch(`${API.MEDICAL_FILE.GET}/showHistoryFiles/${code}`, { method: 'GET' });
    let data = await res.json();
    return data;;
}



// DOCTOR WORK

export async function LoadUsersActive_queues() {

    let res = await fetch(`${API.USERS.GET}/showTurnUsers`, { method: 'GET' });

    let data = await res.json();
    return data;
}


export async function LoadMedicalFileAllUsersHowNeedPay() {

    let res = await fetch(`${API.MEDICAL_FILE.GET}/showHowNeedPay`, { method: 'GET' });

    let data = await res.json();
    return data;
}



// APPOINTMENT

export async function LoadDays() { // 1

    let res = await fetch(API.DAYS.GET, { method: 'GET' });
    let data = await res.json();
    return data;
}