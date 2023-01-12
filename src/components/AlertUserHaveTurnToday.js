import Swal from 'sweetalert2'
import { ActiveHourInDataBase, UpdateDataUserRemoveTurn } from '../Api/DeleteUpdateDataFromApi'


export async function alertPopUpIfUserHaveTodayTurn(day, storedTheme, hour, codeHour, code) {

    let date = new Date();

    let takeDay = date.getDay();

    const hoursAndMinutes = date.getHours() + ':' + '00';

    const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    let dayFromArray = weekday[takeDay];


    if (day == dayFromArray) {


        if (storedTheme === "dark") {

            Swal.fire({
                html: `<div class="alertUserHaveTodayTurn"><h4>you have turn today at ${hour}</h4>
                    <p>* if you don't need this turn please cancel</p>
                    </div>`,
                icon: 'warning',
                showConfirmButton: false,
                timer: 2500,
                position: 'center',
                allowOutsideClick: false
            })


            if (hour < hoursAndMinutes) {

                Swal.fire({
                    html: `<div class="alertUserHaveTodayTurn">
                    <h4>You didn't make it to the Queue Today at ${hour} !</h4>
                    <p>Send Message in Contact Page , why you don't come today</p>
                    <p>Click Ok (and your turn Cancel)</p>
                    </div>`,
                    icon: 'warning',
                    position: 'center',
                    allowOutsideClick: false,
                    confirmButtonColor: "green"

                }).then(async (result) => {

                    if (result.isConfirmed) {
                        await ActiveHourInDataBase(codeHour);
                        await UpdateDataUserRemoveTurn(code);
                        sessionStorage.clear('user');
                        window.location.reload(false);
                    }
                })
            }
        }


        if (storedTheme === "light") {

            Swal.fire({
                html: `<div class="alertUserHaveTodayTurn"><h4>you have turn today at ${hour}</h4>
                    <p>* if you don't need this turn please cancel</p>
                    </div>`,
                icon: 'warning',
                showConfirmButton: false,
                timer: 2500,
                position: 'center',
                allowOutsideClick: false,
                background: '#373E44',
                color: '#ffffffab'
            })


            if (hour < hoursAndMinutes) {

                Swal.fire({
                    html: `<div class="alertUserHaveTodayTurn">
                    <h4>You didn't make it to the Queue Today at ${hour} !</h4>
                    <p>Send Message in Contact Page , why you don't come today</p>
                    <p>Click Ok (and your turn Cancel)</p>
                    </div>`,
                    icon: 'warning',
                    position: 'center',
                    allowOutsideClick: false,
                    confirmButtonColor: "green",
                    background: '#373E44',
                    color: '#ffffffab'
                }).then(async (result) => {

                    if (result.isConfirmed) {
                        await ActiveHourInDataBase(codeHour);
                        await UpdateDataUserRemoveTurn(code);
                        sessionStorage.clear('user');
                        window.location.reload(false);
                    }
                })
            }
        }

    }

}