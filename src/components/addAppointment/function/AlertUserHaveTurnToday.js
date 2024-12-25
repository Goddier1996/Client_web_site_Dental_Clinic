import Swal from 'sweetalert2'
import { ActiveHourInDataBase, UpdateDataUserRemoveTurn } from '../../../Api/DeleteUpdateDataFromApi'
import { sendMailAboutCloseUserTurn } from '../../../Api/ConnectOrAddFromApi';


export function GetTime(date) {

    let hours = date.getHours();
    hours = hours ? hours : 12; // the hour '0' should be '12'
    hours = hours < 10 ? '0' + hours : hours;
    // appending zero in the start if hours less than 10
    return hours + ':' + '00';
}


export function GetDayWeekFromArray(date) {

    let Day = date.getDay();
    let weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return weekday[Day];
}


export function GetDateWhenUserSaveTurn() {

    const today = new Date();

    const formattedDate = today.toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });

    return formattedDate;
}


export function ShowStartAndEndDateWork() {

    let curr = new Date(); // get current date
    let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    let last = first + 5; // last day is the first day + 5

    // show sun to fri date !

    let firstday = new Date(curr.setDate(first)).toDateString();
    let lastday = new Date(curr.setDate(last)).toDateString();

    return firstday + " - " + lastday;
}


export function IncrementDateLooUserTurn(idDay) {

    let idDayFromDataBase = idDay - 1;

    let curr = new Date(); // get current date
    let first = curr.getDate() - curr.getDay(); // First day is the day of the month - the day of the week
    let showMonthNow = new Date().getMonth() + 1;
    let showYearNow = new Date().getFullYear()

    return idDayFromDataBase + first + " - " + showMonthNow + " - " + showYearNow;
}


export async function alertPopUpIfUserHaveTodayTurn(day, storedTheme, hour, codeHour, code) {


    const hoursAndMinutes = GetTime(new Date);
    const dayFromArray = GetDayWeekFromArray(new Date);

    if (day == dayFromArray) {

        if (hour <= hoursAndMinutes) {

            Swal.fire({
                html: `<div class="alertUserHaveTodayTurn">
                    <h4>You didn't make it to the Queue Today at ${hour} !</h4>
                    <br/>
                    <p>Send Message in Contact Page , why you don't come today</p>
                    <p>Click Ok (and your turn Cancel)</p>
                    </div>`,
                icon: 'warning',
                position: 'center',
                allowOutsideClick: false,
                confirmButtonColor: "green",
                background: `${(storedTheme === "light") ? "#373E44" :
                    (storedTheme === "dark") ? "" : ""}`,
                color: `${(storedTheme === "light") ? "#ffffffab" :
                    (storedTheme === "dark") ? "" : ""}`,
                buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                    (storedTheme === "dark") ? "" : ""}`

            }).then(async (result) => {

                if (result.isConfirmed) {

                    let userData = JSON.parse(sessionStorage.getItem("user"));

                    await ActiveHourInDataBase(codeHour);
                    await UpdateDataUserRemoveTurn(code);
                    await sendMailAboutCloseUserTurn(userData);

                    const obj = {
                        _id: userData._id,
                        FirstName: userData.FirstName,
                        User_Login: userData.User_Login,
                        Email: userData.Email,
                        Birthday: userData.Birthday,
                        User_password: userData.User_password,
                        ConfirmPassword: userData.ConfirmPassword,
                        Day_date: null,
                        Hour_day: null,
                        Serial_codeHour: null,
                        IsActive: userData.IsActive,
                        UserType_code: userData.UserType_code
                    }

                    sessionStorage.setItem("user", JSON.stringify(obj));
                    await window.location.reload(false);
                }
            })
        }

        else {
            Swal.fire({
                html: `<div class="alertUserHaveTodayTurn"><h4>you have turn today at ${hour}</h4>
                        <p>* if you don't need this turn please cancel</p>
                        </div>`,
                icon: 'warning',
                showConfirmButton: false,
                timer: 2500,
                position: 'center',
                allowOutsideClick: false,
                background: `${(storedTheme === "light") ? "#373E44" :
                    (storedTheme === "dark") ? "" : ""}`,
                color: `${(storedTheme === "light") ? "#ffffffab" :
                    (storedTheme === "dark") ? "" : ""}`,
                buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                    (storedTheme === "dark") ? "" : ""}`
            })
        }
    }
}
