import Swal from 'sweetalert2'


let storedTheme = localStorage.getItem("theme");



export async function popErrorRegisterUser() {

    Swal.fire({
        icon: 'error',
        title: 'Please Check',
        toast: true,
        confirmButtonColor: "green",
        html: `(1) Password NOT Equals ! <br/>
             (2) Check if your Email was Good`,
        position: 'top-end',
        background: `${(storedTheme === "light") ? "#373E44" :
            (storedTheme === "dark") ? "" : ""}`,
        color: `${(storedTheme === "light") ? "#ffffffab" :
            (storedTheme === "dark") ? "" : ""}`,
        buttonColor: `${(storedTheme === "light") ? "#E96E00" :
            (storedTheme === "dark") ? "" : ""}`
    })
}


export async function popUserRegister(history) {

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