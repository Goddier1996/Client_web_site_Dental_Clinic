import Swal from "sweetalert2";
import videoBg from "../../../images/video11.mp4";


let storedTheme = localStorage.getItem("theme");


export async function openSwalWhenLoginShowTypeUser(nameUser, UserType_code) {

    await Swal.fire({
        title: `Hello ${nameUser}`,
        icon: "success",
        html: `${UserType_code == 1
            ? "You can now use a variety of actions on our site."
            : UserType_code == 2
                ? "Let`s work :)"
                : UserType_code == 3
                    ? "Let`s Control This Web Side"
                    : ""
            }`,
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1200,
        background: `${storedTheme === "light" ? "#373E44" : storedTheme === "dark" ? "" : ""
            }`,
        color: `${storedTheme === "light" ? "#ffffffab" : storedTheme === "dark" ? "" : ""
            }`,
        buttonColor: `${storedTheme === "light" ? "#E96E00" : storedTheme === "dark" ? "" : ""
            }`,
    });  
}



export function AdminInfoVideo() {

    Swal.fire({
        html: `<div class="styleVideoAdmin"><video controls autoplay loop muted playsinline src=${videoBg}></video></div>`,
        confirmButtonText: "Wow",
        confirmButtonColor: "green",
        background: `${storedTheme === "light"
            ? "#373e44c8"
            : storedTheme === "dark"
                ? "#ffffff8c"
                : ""
            }`,
    });
}