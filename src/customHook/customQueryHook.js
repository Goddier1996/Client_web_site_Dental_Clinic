import { useMutation, useQuery, useQueryClient } from 'react-query'
import Cookies from 'js-cookie';

// API Function
import { DeleteReview, DeletePayFile } from "../Api/DeleteUpdateDataFromApi"
import { AddNewUserRegester, connectUserLogin, AddNewReviews, sendGmailUserNeedPayToClinic } from '../Api/ConnectOrAddFromApi'
import { LoadReviews } from "../Api/LoadDataFromApi";

// COMPONENTS Function
import { deleteUserAccount, popUpUserDeleteAccount, popUpUserDeleteReviewId, userPayTurnSuccessful } from "../components/profile/userService/function/UserProfileFunction";
import { popUserRegister } from "../components/register/function/RegisterUser";
import { openSwalWhenLoginShowTypeUser } from "../components/login/function/SignInUser"
import { userAddReviewsLike, userAddReviewSuccess } from "../components/reviewsClinic/function/AddReviewAndLike";
import { doctorAddMedicalFileToPayUser, sendEmailToUserPayDebt } from "../components/profile/doctorService/function/DoctorFunctionService"



export const useQueryLoadingAllReviewClinic = (typeData, pageNumber, order) => {

    return useQuery(
        [typeData, pageNumber, order], () => {
            return LoadReviews(pageNumber, order);
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
            let userDataLogin = JSON.parse(sessionStorage.getItem("userFindLogin"));
            let userDataEmail = JSON.parse(sessionStorage.getItem("userFindEmail"));

            if (userDataLogin == null && userDataEmail == null) {
                sessionStorage.clear();
                popUserRegister(history);
            }
            queryClient.invalidateQueries({
                queryKey: ["user_register"]
            })
        },
        onError: (err) => console.log(err.message),
    })
}


export const LoginUser = (hideSignIn, locationPathname, history) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: connectUserLogin,
        onSuccess: () => {
            // let userData = JSON.parse(sessionStorage.getItem("user"));
            let userData = Cookies.get('user-data') ? JSON.parse(Cookies.get('user-data')) : null;
            
            // close pop login if user connect to clinic
            hideSignIn();
            openSwalWhenLoginShowTypeUser(userData.FirstName, userData.UserType_code, locationPathname, history);

            queryClient.invalidateQueries({
                queryKey: ["login_user"]
            })
        },
        onError: (err) => console.log(err.message),
    })
}


export const doctorSendMedicalFile = (hideModelMedicalFile) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: doctorAddMedicalFileToPayUser,
        onSuccess: () => {
            hideModelMedicalFile()
            queryClient.invalidateQueries({
                queryKey: ["Active_queues"]
            })
        },
        onError: (err) => console.log(err.message),
    })
}


export const doctorSendMailToUser = () => {

    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: sendGmailUserNeedPayToClinic,
        onSuccess: () => {
            sendEmailToUserPayDebt();
            queryClient.invalidateQueries({
                queryKey: ["Send_mail"]
            })
        },
        onError: (err) => console.log(err.message),
    })
}


export const deleteAccountUser = (history) => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteUserAccount,
        onSuccess: () => {

            // if (JSON.parse(sessionStorage.getItem("user") == null)) {
            if (Cookies.get('user-data') == null) {
                popUpUserDeleteAccount(history);
            }
            queryClient.invalidateQueries({
                queryKey: ["delete_account"]
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