import Swal from 'sweetalert2'
import { DeleteHour, UpdateDataUserAddTurn } from '../../../Api/DeleteUpdateDataFromApi'


let storedTheme = localStorage.getItem("theme");


export async function saveDateUserTurnDayAndHour(dataUser, capVal) {

    if (capVal) {

        await UpdateDataUserAddTurn(dataUser._id, dataUser.dayToday, dataUser.hourDayChoose, dataUser.idHour);
        await DeleteHour(dataUser.idHour);

        await Swal.fire({
            title: `Youre making an appointment`,
            text: `${dataUser.dayToday} ${dataUser.hourDayChoose}`,
            icon: 'success',
            position: "top-end",
            toast: true,
            showConfirmButton: false,
            timer: 1400,
            background: `${(storedTheme === "light") ? "#373E44" :
                (storedTheme === "dark") ? "" : ""}`,
            color: `${(storedTheme === "light") ? "#ffffffab" :
                (storedTheme === "dark") ? "" : ""}`,
            buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                (storedTheme === "dark") ? "" : ""}`
        })
        await sessionStorage.clear();
        window.location.reload(false);
    }
}


// this function use in Home.jsx page
export async function CheckUserConnectedForAddTurn(handleShowModelAppointment) {

    let userData = JSON.parse(sessionStorage.getItem("user"));

    if (
        userData != null &&
        userData.Day_date == null &&
        userData.UserType_code == 1
    ) {
        // show popup,Appointment
        handleShowModelAppointment();
    }
    else {
        Swal.fire({
            icon: "warning",
            html: `${userData == null
                ? "You need to LogIn / Register, and you should book an appointment"
                : userData.Day_date != null
                    ? "You have an Appointment, Cancel it and book a new Appointment"
                    : userData.UserType_code == 2
                        ? "you are Doctor (You can not book an appointment) !"
                        : userData.UserType_code == 3
                            ? "you are Admin (You can not book an appointment) !"
                            : ""
                }`,
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
    }
}