import Swal from "sweetalert2";
import videoBg from "../../../images/video11.mp4";
import {
    connectUserLogin,
    connectDemoUserShow,
    connectDemoDoctorShow,
} from "../../../Api/ConnectOrAddFromApi";


let storedTheme = localStorage.getItem("theme");


export function CheckValueInput(Login, Password, signInUser) {

    if (Login == "" || Password == "") {
        Swal.fire({
            icon: "warning",
            text: "input please value !",
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
    } else {
        signInUser();
    }

}


export async function loginUser(user, stopLoading) {

    await connectUserLogin(user);

    let userData = JSON.parse(sessionStorage.getItem("user"));

    if (userData != null) {
        openSwalWhenLoginShowTypeUser(userData.FirstName, userData.UserType_code);
    } else {

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
        stopLoading();
    }
}


export async function connectDemoUser() {

    await connectDemoUserShow();

    let userData = JSON.parse(sessionStorage.getItem("user"));
    openSwalWhenLoginShowTypeUser(userData.FirstName, userData.UserType_code);
}


export async function connectDemoDoctor() {

    await connectDemoDoctorShow();

    let userData = JSON.parse(sessionStorage.getItem("user"));
    openSwalWhenLoginShowTypeUser(userData.FirstName, userData.UserType_code);
}


export async function openSwalWhenLoginShowTypeUser(nameUser, UserType_code) {

    await Swal.fire({
        title: `Hello ${nameUser}`,
        icon: "success",
        html: `${UserType_code == 1
            ? "You can now use a variety of actions on our site."
            : UserType_code == 2
                ? "Let`s work :)"
                : UserType_code == 3
                    ? "Let`s Control This Web Side"
                    : ""
            }`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1500,
        background: `${storedTheme === "light" ? "#373E44" : storedTheme === "dark" ? "" : ""
            }`,
        color: `${storedTheme === "light" ? "#ffffffab" : storedTheme === "dark" ? "" : ""
            }`,
        buttonColor: `${storedTheme === "light" ? "#E96E00" : storedTheme === "dark" ? "" : ""
            }`,
    });
    window.location.reload(false);

}


export function AdminInfoVideo() {

    Swal.fire({
        html: `<div class="styleVideoAdmin"><video controls autoplay loop muted playsinline src=${videoBg}></video></div>`,
        confirmButtonText: "Wow",
        confirmButtonColor: "green",
        background: `${storedTheme === "light"
            ? "#373e44c8"
            : storedTheme === "dark"
                ? "#ffffff8c"
                : ""
            }`,
    });

}