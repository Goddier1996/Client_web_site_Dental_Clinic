import React from 'react'
import '../../css/service.css'
import Swal from 'sweetalert2'
import { CheckIfUserAddLikeThisReview } from '../../Api/LoadDataFromApi'
import { RemoveReviewLike } from '../../Api/ConnectOrAddFromApi'
import { AddNewLikeReviews } from '../../Api/ConnectOrAddFromApi'



const AddReviewLike = ({ FirstName, id, CountLikes }) => {

    let userData = JSON.parse(sessionStorage.getItem("user"));
    let storedTheme = localStorage.getItem("theme");


    // check in this func  , if user have like in this review (remove),if dont have(add)
    const addReviewsLike = async (likeReview, Serial_code) => {


        if (userData != null) {

            await CheckIfUserAddLikeThisReview(Serial_code, userData._id);

            let getResultIfUserHaveLikeInThisReview = JSON.parse(sessionStorage.getItem("likeReview"));

            // if this review user have like remove like
            if (getResultIfUserHaveLikeInThisReview == true) {

                await RemoveReviewLike(Serial_code, userData._id);
                sessionStorage.removeItem("likeReview");

                Swal.fire({
                    position: "center",
                    background: "none",
                    showConfirmButton: false,
                    timer: 2200,
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
                    Count_likes: [likeReview]
                };

                await AddNewLikeReviews(user, Serial_code);
                sessionStorage.removeItem("likeReview");

                Swal.fire({
                    position: "center",
                    background: "none",
                    showConfirmButton: false,
                    timer: 2200,
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



    return (
        <>
            <button className="button-30" role="button"
                onClick={() => addReviewsLike(FirstName, id)}
            >
                <i className="far fa-thumbs-up"></i>{CountLikes.length}
            </button>
        </>
    )
}



export default AddReviewLike;