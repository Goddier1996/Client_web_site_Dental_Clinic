import Swal from 'sweetalert2'
import { DoctorAddMedicalFileUser } from "../../../../Api/ConnectOrAddFromApi";
import {
    UpdateDataUserRemoveTurn,
    ActiveHourInDataBase,
} from "../../../../Api/DeleteUpdateDataFromApi";


let storedTheme = localStorage.getItem("theme");



export function updateDayHourClinic(data, handleShow) {

    let date = new Date();
    let takeDay = date.getDay();
    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let todayDay = weekday[takeDay];


    if (todayDay == data.Day) {

        let dataSend =
        {
            User_code: data.User_code,
            FirstName: data.FirstName,
            Email: data.Email,
            CodeHour: data.codeHour
        }

        sessionStorage.setItem("userDateMedical", JSON.stringify(dataSend))
        //show popup send a file medical to user
        handleShow();
    }

    else {

        Swal.fire({
            title: `Can't Send File Pay`,
            icon: 'warning',
            text: `${data.FirstName} Turn at Day ${data.Day} , And You Can't send Pay FIle !`,
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
        return;
    }
}


// input value doctor to file send user pay

export function checkInputFileDoctor(inputValue) {

    let check = checkUrlLinkFIle(inputValue.File_user);

    if (
        inputValue.textDoctor == "" ||
        inputValue.priceSevice == "" ||
        isNaN(inputValue.priceSevice) ||
        check == false
    ) {
        Swal.fire({
            icon: "warning",
            text:
                "input please value Or Price in Not number Or in not url link image !",
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
        return;
    } else {
        doctorAddMedicalFileToPayUser(inputValue);
    }
}


export function checkUrlLinkFIle(urlString) {

    let urlPattern = new RegExp("(jpg|jpeg|png|webp|avif|gif|svg)");
    return !!urlPattern.test(urlString);
}


export async function doctorAddMedicalFileToPayUser(inputValue) {

    let date = JSON.parse(sessionStorage.getItem("userDateMedical"));

    let d = new Date();

    let File = {
        name: date.FirstName,
        email: date.Email,
        Publish_by: date.User_code,
        Date_published: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
        File_user: inputValue.File_user,
        textDoctor: inputValue.textDoctor,
        priceSevice: inputValue.priceSevice,
        IsActive: "1",
    };

    await ActiveHourInDataBase(date.CodeHour);

    await DoctorAddMedicalFileUser(File);

    await UpdateDataUserRemoveTurn(date.User_code);

    Swal.fire({
        title: "success",
        icon: "success",
        toast: true,
        position: "top-end",
        confirmButtonColor: "green",
        background: `${storedTheme === "light" ? "#373E44" : storedTheme === "dark" ? "" : ""
            }`,
        color: `${storedTheme === "light" ? "#ffffffab" : storedTheme === "dark" ? "" : ""
            }`,
        buttonColor: `${storedTheme === "light" ? "#E96E00" : storedTheme === "dark" ? "" : ""
            }`,
        timer: 1000,
    });
    sessionStorage.removeItem("userDateMedical");
    window.location.reload(false);
}