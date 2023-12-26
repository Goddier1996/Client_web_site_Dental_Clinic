import { useMutation, useQuery, useQueryClient } from 'react-query'

// API Function
import { DeleteReview, DeletePayFile } from "../Api/DeleteUpdateDataFromApi"
import { AddNewUserRegester, connectUserLogin, AddNewReviews } from '../Api/ConnectOrAddFromApi'
import { LoadReviews } from "../Api/LoadDataFromApi";

// COMPONENTS Function
import { popUpUserDeleteReviewId, userPayTurnSuccessful } from "../components/profile/userService/function/UserProfileFunction";
import { popUserRegister } from "../components/register/function/RegisterUser";
import { openSwalWhenLoginShowTypeUser } from "../components/login/function/SignInUser"
import { userAddReviewsLike, userAddReviewSuccess } from "../components/reviewsClinic/function/AddReviewAndLike";




export const useQueryLoadingAllReviewClinic = (typeData, pageNumber) => {

    return useQuery(
        [typeData, pageNumber], () => {
            return LoadReviews(pageNumber);
        }
    )
}



export const userLikeOrDesLikeReview = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: userAddReviewsLike,
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["reviews"]
            })
        },
        onError: (err) => console.log(err.message),
    })
}



export const userAddNewReview = (closePopUp) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: AddNewReviews,
        onSuccess: () => {
            closePopUp()
            userAddReviewSuccess()

            queryClient.invalidateQueries({
                queryKey: ["reviews"]
            })
        },
        onError: (err) => console.log(err.message),
    })
}



export const useQueryLoadingAllData = (typeData, LoadDataFromApi) => {

    return useQuery(
        typeData, () => {
            return LoadDataFromApi();
        }
    )
}



export const useQueryLoadingDataID = (typeData, LoadDataFromApi, id) => {

    return useQuery(
        [typeData, id], () => {
            return LoadDataFromApi(id);
        }
    )
}



export const deleteIdReviewUser = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: DeleteReview,
        onSuccess: () => {
            popUpUserDeleteReviewId()

            queryClient.invalidateQueries({
                queryKey: ["myReview"]
            })
        },
        onError: (err) => console.log(err.message),
    })
}



export const userPayService = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: DeletePayFile,
        onSuccess: () => {
            userPayTurnSuccessful()

            queryClient.invalidateQueries({
                queryKey: ["medical_File"]
            })
        },
        onError: (err) => console.log(err.message),
    })
}



export const newUserRegister = (history) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: AddNewUserRegester,
        onSuccess: () => {
            popUserRegister(history);

            queryClient.invalidateQueries({
                queryKey: ["user_register"]
            })
        },
        onError: (err) => console.log(err.message),
    })
}



export const LoginUser = (hideSignIn) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: connectUserLogin,
        onSuccess: () => {
            let userData = JSON.parse(sessionStorage.getItem("user"));

            // close pop login if user connect to clinic
            hideSignIn();
            openSwalWhenLoginShowTypeUser(userData.FirstName, userData.UserType_code);

            queryClient.invalidateQueries({
                queryKey: ["login_user"]
            })
        },
        onError: (err) => console.log(err.message),
    })
}








// here option updated data every 1s , but network every time working !
// export const useQueryDataLoadingRefetchAutoData = (typeData, pageNumber, LoadDataFromApi) => {

//     return useQuery(
//         [typeData, pageNumber], () => {
//             return LoadDataFromApi(pageNumber);
//         },
//         {
//             refetchOnWindowFocus: true,
//             refetchInterval: 1000,
//         }
//     )
// }