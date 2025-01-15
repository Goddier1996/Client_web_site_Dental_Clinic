import { API } from './API';
import axios from 'axios';
import Swal from "sweetalert2";
import Cookies from 'js-cookie';

let storedTheme = localStorage.getItem("theme");


export async function connectUserLogin(user) {

    // USE AXIOS
    const headers = {
        'Content-Type': 'application/json'
    }

    const res = await axios.post(API.USERS.LOGIN, user, { headers: headers })

    // sessionStorage.setItem("user", JSON.stringify(res.data));
    Cookies.set('user-data', JSON.stringify(res.data), { sameSite: 'strict' });

    let userInfo = Cookies.get('user-data') ? JSON.parse(Cookies.get('user-data')) : null;
    // let userData = JSON.parse(sessionStorage.getItem("user"));

    if (userInfo == null) {
        Swal.fire({
            icon: "warning",
            text: "Sorry dont have This user in Data Base , Try Again",
            toast: true,
            position: "top-end",
            confirmButtonColor: "green",
            background: `${storedTheme === "light" ? "#373E44" : storedTheme === "dark" ? "" : ""}`,
            color: `${storedTheme === "light"
                ? "#ffffffab"
                : storedTheme === "dark"
                    ? ""
                    : ""}`,
            buttonColor: `${storedTheme === "light" ? "#E96E00" : storedTheme === "dark" ? "" : ""}`,
        });
        // sessionStorage.clear();
        Cookies.remove('user-data', { path: '/' });          
        return;
    }
}


export async function DoctorAddMedicalFileUser(file) {

    // USE AXIOS
    const headers = {
        'Content-Type': 'application/json'
    }

    await axios.post(API.MEDICAL_FILE.ADD, file, { headers: headers })
}


export async function AddNewReviews(review) {

    // USE AXIOS
    const headers = {
        'Content-Type': 'application/json'
    }

    await axios.post(API.REVIEWS.ADD, review, { headers: headers })
}


export async function AddNewLikeReviews(like, Serial_code) {

    // USE AXIOS
    const headers = {
        'Content-Type': 'application/json'
    }

    await axios.patch(`${API.REVIEWS.GET}/${Serial_code}`, like, { headers: headers })
}


export async function RemoveReviewLike(id, PublishBy) {

    const headers = {
        'Content-Type': 'application/json'
    }

    await axios.patch(`${API.REVIEWS.PATCH}/${id}/${PublishBy}`, { headers: headers })
}


export async function AddNewUserRegester(newUser) {

    // USE AXIOS
    const headers = {
        'Content-Type': 'application/json'
    }

    const resFindLogin = await axios.post(`${API.USERS.GET}/findLogin`, newUser, { headers: headers });
    sessionStorage.setItem("userFindLogin", JSON.stringify(resFindLogin.data));
    let userDataLogin = JSON.parse(sessionStorage.getItem("userFindLogin"));

    const resFindEmail = await axios.post(`${API.USERS.GET}/findEmail`, newUser, { headers: headers });
    sessionStorage.setItem("userFindEmail", JSON.stringify(resFindEmail.data));
    let userDataEmail = JSON.parse(sessionStorage.getItem("userFindEmail"));


    // show message have login in data base
    if (userDataLogin != null) {
        Swal.fire({
            icon: "warning",
            text: "Sorry have This Login in Data Base , Try Again",
            toast: true,
            position: "top-end",
            confirmButtonColor: "green",
            background: `${storedTheme === "light" ? "#373E44" : storedTheme === "dark" ? "" : ""}`,
            color: `${storedTheme === "light"
                ? "#ffffffab"
                : storedTheme === "dark"
                    ? ""
                    : ""}`,
            buttonColor: `${storedTheme === "light" ? "#E96E00" : storedTheme === "dark" ? "" : ""}`,
        });
        // sessionStorage.clear();
        return;
    }

    // show message have email in data base
    if (userDataEmail != null) {
        Swal.fire({
            icon: "warning",
            text: "Sorry have This Email in Data Base , Try Again",
            toast: true,
            position: "top-end",
            confirmButtonColor: "green",
            background: `${storedTheme === "light" ? "#373E44" : storedTheme === "dark" ? "" : ""}`,
            color: `${storedTheme === "light"
                ? "#ffffffab"
                : storedTheme === "dark"
                    ? ""
                    : ""}`,
            buttonColor: `${storedTheme === "light" ? "#E96E00" : storedTheme === "dark" ? "" : ""}`,
        });
        // sessionStorage.clear();
        return;
    }

    // here register new user
    else {
        await axios.post(API.USERS.ADD, newUser, { headers: headers })
    }
}


export async function sendGmailUserNeedPayToClinic(user) {

    await axios.post(`${API.MEDICAL_FILE.GET}/showHowNeedPaySendMail/${user._id}`, user);
}


export async function sendMailAboutCloseUserTurn(user) {

    await axios.post(`${API.USERS.GET}/sendMailAboutCloseYourTurn/${user._id}`, user);
}


export async function sendGmailDeleteAccountMessage(user) {

    await axios.post(`${API.USERS.GET}/sendGmailDeleteAccountMessage/${user.code}`, user);
}
