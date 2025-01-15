import Swal from 'sweetalert2'
import Cookies from 'js-cookie';


let storedTheme = localStorage.getItem("theme");


export async function sendUserToProfile(idUser, history) {

    history.push(`/Profile/${idUser}`);
}



export async function logOutUser(history) {

    Swal.fire({
        title: 'Are you sure you want to leave?',
        icon: 'question',
        toast: true,
        position: 'top-end',
        showDenyButton: true,
        confirmButtonText: 'yes',
        denyButtonText: `no`,
        confirmButtonColor: "green",
        background: `${(storedTheme === "light") ? "#373E44" :
            (storedTheme === "dark") ? "" : ""}`,
        color: `${(storedTheme === "light") ? "#ffffffab" :
            (storedTheme === "dark") ? "" : ""}`,
        buttonColor: `${(storedTheme === "light") ? "#E96E00" :
            (storedTheme === "dark") ? "" : ""}`
    }).then((result) => {

        if (result.isConfirmed) {

            // sessionStorage.clear('user');
            Cookies.remove('user-data', { path: '/' })            
            history.push("/");
            window.location.reload(false);
        }
    })
}