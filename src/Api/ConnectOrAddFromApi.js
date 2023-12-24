import { API } from './API';
import axios from 'axios';
import Swal from "sweetalert2";

let storedTheme = localStorage.getItem("theme");


export async function connectUserLogin(user) {

    // USE FETCH
    // try {

    //     let res = await fetch(API.USERS.LOGIN, {
    //         method: 'POST',
    // headers: {
    //     "Content-Type": "application/json"
    // },
    //         body: JSON.stringify(user)
    //     });

    //     let data = await res.json();

    //     sessionStorage.setItem("user", JSON.stringify(data));

    // } catch (error) {
    //     console.log(error);
    // }


    // USE AXIOS
    const headers = {
        'Content-Type': 'application/json'
    }

    const res = await axios.post(API.USERS.LOGIN, user, { headers: headers })

    sessionStorage.setItem("user", JSON.stringify(res.data));

    let userData = JSON.parse(sessionStorage.getItem("user"));

    if (userData == null) {
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
        sessionStorage.clear();
        return;
    }
}



export async function DoctorAddMedicalFileUser(file) {

    // USE FETCH
    // try {
    //     await fetch(API.MEDICAL_FILE.ADD, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(file)
    //     });


    // } catch (error) {
    //     console.log(error);
    // }


    // USE AXIOS
    const headers = {
        'Content-Type': 'application/json'
    }

    await axios.post(API.MEDICAL_FILE.ADD, file, { headers: headers })
}



export async function AddNewReviews(review) {

    // USE FETCH
    // try {

    //     await fetch(API.REVIEWS.ADD, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(review)
    //     });

    // } catch (error) {
    //     console.log(error);
    // }


    // USE AXIOS
    const headers = {
        'Content-Type': 'application/json'
    }

    await axios.post(API.REVIEWS.ADD, review, { headers: headers })
}



export async function AddNewLikeReviews(like, Serial_code) {

    // USE FETCH
    // try {
    //     await fetch(`${API.REVIEWS.GET}/${Serial_code}`, {
    //         method: 'PATCH',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(like)
    //     });

    // } catch (error) {
    //     console.log(error)
    // }


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

    // USE FETCH
    // try {
    //     await fetch(API.USERS.ADD, {
    //         method: 'POST',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(user)
    //     });


    // } catch (error) {
    //     console.log(error);
    // }


    // USE AXIOS
    const headers = {
        'Content-Type': 'application/json'
    }

    await axios.post(API.USERS.ADD, newUser, { headers: headers })
}