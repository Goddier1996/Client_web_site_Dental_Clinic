import { useMutation, useQuery, useQueryClient } from 'react-query'

// API Function
import { DeleteReview, DeletePayFile } from "../Api/DeleteUpdateDataFromApi"
import { AddNewUserRegester, connectUserLogin } from '../Api/ConnectOrAddFromApi'

// COMPONENTS Function
import { popUpUserDeleteReviewId, userPayTurnSuccessful } from "../components/profile/userService/function/UserProfileFunction";
import { popUserRegister } from "../components/register/function/RegisterUser";
import { openSwalWhenLoginShowTypeUser } from "../components/login/function/SignInUser"



// use in Review , when user add new review or like/dislike we see in live what add and what like user.
export const useQueryDataLoadingRefetchAutoData = (typeData, pageNumber, LoadDataFromApi) => {

    return useQuery(
        [typeData, pageNumber], () => {
            return LoadDataFromApi(pageNumber);
        },
        {
            refetchOnWindowFocus: true,
            refetchInterval: 1000,
        }
    )
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