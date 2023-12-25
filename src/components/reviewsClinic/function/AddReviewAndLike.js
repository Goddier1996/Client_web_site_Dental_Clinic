import Swal from 'sweetalert2'
import { AddNewReviews, AddNewLikeReviews, RemoveReviewLike } from "../../../Api/ConnectOrAddFromApi";
import { CheckIfUserAddLikeThisReview } from '../../../Api/LoadDataFromApi'


let storedTheme = localStorage.getItem("theme");


export async function userAddReview(textReviews, closePopUp, setTextReviews, setCapVal) {

    let userData = JSON.parse(sessionStorage.getItem("user"));

    if (textReviews < 1) {
        Swal.fire({
            icon: "error",
            title: "Oops...you don`t input Reviews!",
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

    else {
        let Publish_by = userData._id;
        let FirstName = userData.FirstName;
        let User_Login = userData.User_Login;

        let d = new Date();

        let user = {
            textReviews,
            DatePublished: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
            Publish_by,
            FirstName,
            User_Login,
            IsActive: "1",
            Count_likes: [],
        };

        await AddNewReviews(user);

        await Swal.fire({
            title: "Added a comment successfully",
            icon: "success",
            toast: true,
            position: "top-end",
            showConfirmButton: false,
            timer: 1500,
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
        closePopUp();
        setTextReviews("");
        setCapVal();
    }
}



export function checkUserConnectedForAddReview(handleShowAddReviews) {

    let userData = JSON.parse(sessionStorage.getItem("user"));

    if (userData == null) {

        Swal.fire({
            icon: 'warning',
            title: 'Login / Register',
            html: 'You need to log in or register, you should add a comment',
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


    if (userData != null) {
        handleShowAddReviews();
    }
}



export async function userAddReviewsLike(dataLike) {

    let userData = JSON.parse(sessionStorage.getItem("user"));

    if (userData != null) {

        await CheckIfUserAddLikeThisReview(dataLike.Serial_code, userData._id);

        let getResultIfUserHaveLikeInThisReview = JSON.parse(sessionStorage.getItem("likeReview"));

        // if this review user have like remove dis like
        if (getResultIfUserHaveLikeInThisReview == true) {

            await RemoveReviewLike(dataLike.Serial_code, userData._id);
            sessionStorage.removeItem("likeReview");

            Swal.fire({
                position: "center",
                background: "none",
                showConfirmButton: false,
                timer: 2000,
                allowOutsideClick: false,
                html: '<div class="loadingReview"> <img src="https://i.postimg.cc/qvz9yCqh/desLike.gif"> </div>'
            });
        }

        // else user don't have like in this review add Like
        else {

            let Publish_by = userData._id;
            let FirstName = userData.FirstName;
            let User_Login = userData.User_Login;

            let d = new Date();

            let user = {
                DatePublished: `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`,
                Publish_by,
                FirstName,
                User_Login,
                IsActive: "1",
                Count_likes: [dataLike.likeReview]
            };

            await AddNewLikeReviews(user, dataLike.Serial_code);
            sessionStorage.removeItem("likeReview");

            Swal.fire({
                position: "center",
                background: "none",
                showConfirmButton: false,
                timer: 2000,
                allowOutsideClick: false,
                html: '<div class="loadingReview"> <img src="https://i.postimg.cc/3w0nJXR1/likeGif.gif"> </div>'
            });
        }
    }

    else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...Please connect and you can add like (:',
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
}
