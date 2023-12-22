import Swal from 'sweetalert2'
import { AddNewUserRegester } from '../../../Api/ConnectOrAddFromApi'


let storedTheme = localStorage.getItem("theme");



export async function checkValueInput(userDataInput, setLoadingRegister, history) {

    let mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (userDataInput.Password != userDataInput.ConfirmPassword ||
        userDataInput.Password.length < 6 && userDataInput.ConfirmPassword.length <= 6 ||
        userDataInput.User_Login == '' ||
        userDataInput.FirstName == '' ||
        userDataInput.Email == '' ||
        userDataInput.Password == '' ||
        userDataInput.ConfirmPassword == '' ||
        mailFormat.test(userDataInput.Email) == false) {

        Swal.fire({
            icon: 'error',
            title: 'Please Check',
            toast: true,
            confirmButtonColor: "green",
            html: `(1) input all value(Incorrect input) ! <br/>
             (2) Password NOT Equals ! <br/>
             (3) Password with 6 or more digits or letters ! <br/>
             (4) Check if your Email was Good`,
            position: 'top-end',
            background: `${(storedTheme === "light") ? "#373E44" :
                (storedTheme === "dark") ? "" : ""}`,
            color: `${(storedTheme === "light") ? "#ffffffab" :
                (storedTheme === "dark") ? "" : ""}`,
            buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                (storedTheme === "dark") ? "" : ""}`
        })
        return;
    }

    else {
        setLoadingRegister();
        await registerUser(userDataInput, history);

    }
}


export async function registerUser(userDataInput, history) {

    let user = {
        name: userDataInput.FirstName,
        User_Login: userDataInput.User_Login,
        Birthday: userDataInput.Birthday,
        Email: userDataInput.Email,
        User_password: userDataInput.Password,
        UserType_code: "1",
        ConfirmPassword: userDataInput.ConfirmPassword,
        Day_date: null,
        Hour_day: null,
        Serial_codeHour: null,
        IsActive: "1"
    };

    await AddNewUserRegester(user);

    await Swal.fire({
        position: "center",
        background: "none",
        showConfirmButton: false,
        timer: 4000,
        allowOutsideClick: false,
        html: '<div class="ShowImageWhenRegister"><img src="https://i.postimg.cc/MZP7Xzk6/cute-penguin.gif"> </div>',
    });

    history.push("/")
}