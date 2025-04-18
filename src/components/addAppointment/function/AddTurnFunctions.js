import Swal from 'sweetalert2';
import Cookies from 'js-cookie';
import { DeleteHour, UpdateDataUserAddTurn } from '../../../Api/DeleteUpdateDataFromApi';
import { GetDateWhenUserSaveTurn, IncrementDateLooUserTurn } from '../function/AlertUserHaveTurnToday';



let storedTheme = localStorage.getItem("theme");


export async function saveDateUserTurnDayAndHour(dataUser, capVal) {

    if (capVal) {

        // save info date today when user save new turn
        let DateWhenAddUserTurn = await GetDateWhenUserSaveTurn();

        // here we save date turn,for example user save turn to monday (and we save a date Mon Dec 09 2024)
        let IncrementDayDateTurnUser = await IncrementDateLooUserTurn(dataUser.idDay);

        await UpdateDataUserAddTurn(
            dataUser._id,
            dataUser.dayToday,
            dataUser.hourDayChoose,
            dataUser.idHour,
            DateWhenAddUserTurn,
            IncrementDayDateTurnUser,
            dataUser.Email
        );

        await DeleteHour(dataUser.idHour);

        await Swal.fire({
            title: `⬇️ Your appointment at ⬇️`,
            html: `<p>
            <b>Date: </b>${IncrementDayDateTurnUser}<br/>
            <b>Day: </b>${dataUser.dayToday}<br/>
            <b>Hour: </b>${dataUser.hourDayChoose}<br/>
            <br/>
            💡Check your <b>Mail</b> we send info about your appointment.
            </p>`,
            icon: 'success',
            position: "top-end",
            toast: true,
            showConfirmButton: false,
            timer: 3500,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.onmouseenter = Swal.stopTimer;
            toast.onmouseleave = Swal.resumeTimer;
            },
            background: `${(storedTheme === "light") ? "#373E44" :
                (storedTheme === "dark") ? "" : ""}`,
            color: `${(storedTheme === "light") ? "#ffffffab" :
                (storedTheme === "dark") ? "" : ""}`,
            buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                (storedTheme === "dark") ? "" : ""}`
        })

        
        // await sessionStorage.clear();
        Cookies.remove('user-data', { path: '/' });
        window.location.reload(false);
    }
}


// this function use in Home.jsx page
export async function CheckUserConnectedForAddTurn(handleShowModelAppointment) {

    // let userData = JSON.parse(sessionStorage.getItem("user"));
    let userData = Cookies.get('user-data') ? JSON.parse(Cookies.get('user-data')) : null;
    

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