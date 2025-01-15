import Swal from 'sweetalert2'
import { DoctorAddMedicalFileUser } from "../../../../Api/ConnectOrAddFromApi";
import {
    UpdateDataUserRemoveTurn,
    ActiveHourInDataBase,
} from "../../../../Api/DeleteUpdateDataFromApi";


let storedTheme = localStorage.getItem("theme");


// Function to compare dates
export function compareDates(a, b) {

    const dateA = new Date(a.Date_published || a.DatePublished);
    const dateB = new Date(b.Date_published || b.DatePublished);
    return dateB - dateA;
}


export function returnBoolResultIfDayTurnToday(data) {

    let date = new Date();
    let takeDay = date.getDay();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let todayDay = weekday[takeDay];

    if (todayDay == data.Day_date) {
        return true;
    }
    else {
        return false;
    }
}


export function showPopUpTodayDoctorCantSendFile(data) {

    Swal.fire({
        title: `Can't Send File Pay`,
        icon: 'warning',
        html: `${data.FirstName} Turn at Day ${data.Day_date}<br/>You Can't send Pay FIle !
        <br/>After Turn Can send file Pay.
        `,
        toast: true,
        position: 'top-end',
        confirmButtonColor: "green",
        background: `${(storedTheme === "light") ? "#373E44" :
            (storedTheme === "dark") ? "" : ""}`,
        color: `${(storedTheme === "light") ? "#ffffffab" :
            (storedTheme === "dark") ? "" : ""}`,
        buttonColor: `${(storedTheme === "light") ? "#E96E00" :
            (storedTheme === "dark") ? "" : ""}`
    })
}


export function checkUrlLinkFIle(urlString) {

    let urlPattern = new RegExp("(jpg|jpeg|png|webp|avif|gif|svg)");
    return !!urlPattern.test(urlString);
}


export function checkInputFileDoctorShowErrorMessage() {

    Swal.fire({
        icon: "warning",
        text: "Url link Not Good !",
        toast: true,
        position: "top-end",
        confirmButtonColor: "green",
        background: `${storedTheme === "light" ? "#373E44" : storedTheme === "dark" ? "" : ""
            }`,
        color: `${storedTheme === "light"
            ? "#ffffffab"
            : storedTheme === "dark"
                ? ""
                : ""
            }`,
        buttonColor: `${storedTheme === "light" ? "#E96E00" : storedTheme === "dark" ? "" : ""
            }`,
    });
}


export async function doctorAddMedicalFileToPayUser(dataUser) {

    await ActiveHourInDataBase(dataUser.CodeHour);

    await DoctorAddMedicalFileUser(dataUser);

    await UpdateDataUserRemoveTurn(dataUser.Publish_by);

    await Swal.fire({
        title: "success",
        icon: "success",
        html: `You send Medical File to ${dataUser.name}`,
        toast: true,
        position: "top-end",
        confirmButtonColor: "green",
        background: `${storedTheme === "light" ? "#373E44" : storedTheme === "dark" ? "" : ""
            }`,
        color: `${storedTheme === "light" ? "#ffffffab" : storedTheme === "dark" ? "" : ""
            }`,
        buttonColor: `${storedTheme === "light" ? "#E96E00" : storedTheme === "dark" ? "" : ""
            }`,
        timer: 1100,
    });
}


// Function to send email to user to pay debt
export function sendEmailToUserPayDebt() {

    Swal.fire({
        icon: "success",
        text: "Email reminder to pay debt, successfully sent",
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
}