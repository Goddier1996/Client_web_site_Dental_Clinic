import Swal from 'sweetalert2'
import { send } from "emailjs-com";


let storedTheme = localStorage.getItem("theme");


export async function userSendMessage(userDataInput, setCapVal) {

    let mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


    if (userDataInput.reply_to == '' || userDataInput.message == '' || mailformat.test(userDataInput.reply_to) == false) {


        Swal.fire({
            position: 'top',
            confirmButtonColor: 'green',
            icon: 'error',
            title: 'you can`t send message<br/>1) please input all value<br/>2) check if your Email was Good !  ',
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

    else {
        send(
            process.env.REACT_APP_SERVICE_KEY,
            process.env.REACT_APP_TEMPLATE,
            userDataInput,
            process.env.REACT_APP_PASSWORD
        )
            .then((response) => {

                Swal.fire({
                    title: 'has been sent successfully',
                    text: 'Wait for the webmaster`s response',
                    icon: 'success',
                    confirmButtonColor: "green",
                    background: `${(storedTheme === "light") ? "#373E44" :
                        (storedTheme === "dark") ? "" : ""}`,
                    color: `${(storedTheme === "light") ? "#ffffffab" :
                        (storedTheme === "dark") ? "" : ""}`,
                    buttonColor: `${(storedTheme === "light") ? "#E96E00" :
                        (storedTheme === "dark") ? "" : ""}`
                }).then((result) => {
                    if (result.isConfirmed) {
                        setCapVal();
                        window.location.reload(false);
                    }
                })
            })
            .catch((err) => {
                console.log('FAILED...', err);
            });
    }
}