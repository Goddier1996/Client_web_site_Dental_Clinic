import Swal from 'sweetalert2'
import { DeletePayFile, UpdateDataUserRemoveTurn, ActiveHourInDataBase, UpdateDataUser, DeleteReview } from '../../../../Api/DeleteUpdateDataFromApi'


let storedTheme = localStorage.getItem("theme");

// Pay Function

export async function userPayTurn(dataUser) {

    let PayDetails = JSON.parse(sessionStorage.getItem("PayDetails"));


    if (dataUser.CardNumber != '' && dataUser.CardNumber.length === 16 &&
        dataUser.Expiration != '' && dataUser.Expiration.length === 4 &&
        dataUser.Cvv != '' && dataUser.Cvv.length === 3 &&
        dataUser.CardholderName != '' && PayDetails.userName == dataUser.CardholderName) {

        await DeletePayFile(PayDetails.Serial_code);

        await Swal.fire({
            title: 'the payment was successful 🙂',
            icon: 'success',
            position: 'top-end',
            showConfirmButton: false,
            timer: 2500,
            toast: true,
            background: `${(storedTheme === "light") ? "#373E44" :
                (storedTheme === "dark") ? "" : ""}`,
            color: `${(storedTheme === "light") ? "#ffffffab" :
                (storedTheme === "dark") ? "" : ""}`,
            buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                (storedTheme === "dark") ? "" : ""}`
        })
        sessionStorage.removeItem('PayDetails');
        window.location.reload(false);
    }

    else {
        Swal.fire({
            title: `1) input please All place<br/>2) check if First Name Not suitable<br/>3) check if Date (length 6) or Cvv (length 3) or number Card (length 16) `,
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
    }
}


export async function hideModelPayService() {

    sessionStorage.removeItem("PayDetails");
    window.location.reload(false);
}



// User Queues

export async function ActiveHourDontNeedTurn(codeHour, history, codeUser) {

    Swal.fire({
        title: 'Are you sure you want to cancel the queue?',
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

            ActiveHourInDataBase(codeHour);
            saveDateUserCancelTheTurn(codeUser, history);
        }

        else if (result.isDenied) {
            window.location.reload(false);
        }
    })
}


export async function saveDateUserCancelTheTurn(codeUser, history) {

    await UpdateDataUserRemoveTurn(codeUser);

    // clear session storage after delete a hour day and serial code hour
    sessionStorage.clear();
    history.push("/");
    window.location.reload(false);
}


// Update Data User

export async function CheckInputValueUpdateDataUser(dataUser, loginCheck, userCode, history) {

    // demo user cant update data
    if (loginCheck == "User") {

        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            html: 'Demo User Can t Update data !',
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


    // check value
    if (dataUser.Password != dataUser.ConfirmPassword || dataUser.Password.length < 6 &&
        dataUser.ConfirmPassword.length <= 6 || dataUser.Password == '' || dataUser.ConfirmPassword == '' ||
        dataUser.Login == '' || dataUser.FirstName == '' || dataUser.Email == '' || dataUser.Birthday == '') {

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            html: '(1) you need input all value(Incorrect input) ! <br/> (2) Or Password NOT Equals ! <br/>(3) Or enter a password with 6 or more digits or letters !',
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


    // update data
    else {

        await UpdateDataUser(userCode, dataUser);

        await Swal.fire({
            position: "center",
            background: "none",
            showConfirmButton: false,
            timer: 1000,
            allowOutsideClick: false,
            html: '<div class="ShowImageWhenRegister"><img src="https://i.postimg.cc/X7RTsp8v/pantsbear-goodjob.gif"> </div>',
        });

        await sessionStorage.clear();
        history.push("/");
        window.location.reload(false);
    }
}


// Review user

export async function userDeleteReview(Id) {

    await Swal.fire({
        title: 'you delete this Review',
        icon: 'success',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        position: 'top-end',
        background: `${(storedTheme === "light") ? "#373E44" :
            (storedTheme === "dark") ? "" : ""}`,
        color: `${(storedTheme === "light") ? "#ffffffab" :
            (storedTheme === "dark") ? "" : ""}`,
        buttonColor: `${(storedTheme === "light") ? "#E96E00" :
            (storedTheme === "dark") ? "" : ""}`
    })

    await DeleteReview(Id);
    window.location.reload(false);
}