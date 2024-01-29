import Swal from "sweetalert2";
import { ForgetPasswordUpdate } from '../../../Api/DeleteUpdateDataFromApi'
import { API } from "../../../Api/API";


let storedTheme = localStorage.getItem("theme");


// here search email user if in database move to input new data, if no show error alert!
export async function searchEmailFromDataBase(Email, handleShowNewPassword, setLoading) {

    if (Email < 1) {
        Swal.fire({
            text: 'please input your Email ',
            icon: 'warning',
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
        setLoading(false);
    }
    else {
        try {
            let user =
            {
                Email: Email
            };

            let res = await fetch(API.USERS.FORGET, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(user)
            });

            let data = await res.json();

            if (data) {
                Swal.fire({
                    title: `${data.FirstName} We found you. Let's change a new password`,
                    icon: 'info',
                    toast: true,
                    position: 'top-end',
                    confirmButtonColor: "green",
                    background: `${(storedTheme === "light") ? "#373E44" :
                        (storedTheme === "dark") ? "" : ""}`,
                    color: `${(storedTheme === "light") ? "#ffffffab" :
                        (storedTheme === "dark") ? "" : ""}`,
                    buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                        (storedTheme === "dark") ? "" : ""}`
                }).then((result) => {
                    if (result.isConfirmed) {
                        setLoading(false);
                        sessionStorage.setItem("userForgetPassword", JSON.stringify(data));
                        handleShowNewPassword() // show pop up change password
                    }
                })
            }

            else {
                Swal.fire({
                    text: `Don't Have This Email in Database try again`,
                    icon: 'warning',
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
                setLoading(false);
            }


        } catch (error) {
            console.log(error);
        }
    }
}


export function checkValueInput(User_password, Confirm_password, setLoading) {

    if (User_password == '' || Confirm_password == '') {
        Swal.fire({
            text: 'Please Input your new Password!',
            icon: 'error',
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
        setLoading(false);
    }

    else if (User_password === Confirm_password) {
        ForgetPassword(User_password, Confirm_password);
        setLoading(false);
    }

    else {
        Swal.fire({
            text: 'Password NOT Equals!',
            icon: 'error',
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
        setLoading(false);
    }
}


export async function ForgetPassword(User_password, Confirm_password) {

    let user = {
        User_password: User_password,
        ConfirmPassword: Confirm_password
    }

    let userForget = JSON.parse(sessionStorage.getItem("userForgetPassword"));

    await ForgetPasswordUpdate(userForget._id, user);

    await Swal.fire({
        icon: 'success',
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        toast: true,
        background: `${(storedTheme === "light") ? "#373E44" :
            (storedTheme === "dark") ? "" : ""}`,
        color: `${(storedTheme === "light") ? "#ffffffab" :
            (storedTheme === "dark") ? "" : ""}`,
        buttonColor: `${(storedTheme === "light") ? "#E96E00" :
            (storedTheme === "dark") ? "" : ""}`
    })

    sessionStorage.clear('userForgetPassword');
    window.location.reload(false);
}


export function closePopUpForgetPassword() {

    Swal.fire({
        title: 'Are you sure don`t change Password?',
        icon: 'question',
        showDenyButton: true,
        confirmButtonText: 'yes',
        denyButtonText: `no`,
        toast: true,
        position: 'top-end',
        confirmButtonColor: "green",
        background: `${(storedTheme === "light") ? "#373E44" :
            (storedTheme === "dark") ? "" : ""}`,
        color: `${(storedTheme === "light") ? "#ffffffab" :
            (storedTheme === "dark") ? "" : ""}`,
        buttonColor: `${(storedTheme === "light") ? "#E96E00" :
            (storedTheme === "dark") ? "" : ""}`
    }).then((result) => {

        if (result.isConfirmed) {
            sessionStorage.clear('userForgetPassword');
            window.location.reload(false);
        }
    })
}