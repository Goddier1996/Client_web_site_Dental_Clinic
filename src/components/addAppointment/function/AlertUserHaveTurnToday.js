import Swal from 'sweetalert2'
import { ActiveHourInDataBase, UpdateDataUserRemoveTurn } from '../../../Api/DeleteUpdateDataFromApi'


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


export async function alertPopUpIfUserHaveTodayTurn(day, storedTheme, hour, codeHour, code) {


    const hoursAndMinutes = GetTime(new Date);
    const dayFromArray = GetDayWeekFromArray(new Date);

    if (day == dayFromArray) {

        if (hour < hoursAndMinutes) {

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