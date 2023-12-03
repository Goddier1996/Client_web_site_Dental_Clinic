import { useQuery } from 'react-query'



export const useQueryDataLoadingRefetchAutoData = (typeData, pageNumber, LoadDataFromApi, id) => {

    return useQuery(
        [typeData, pageNumber], () => {
            return LoadDataFromApi(id, pageNumber);
        },
        {
            // use This useQuery in Appointment show hours , add option refresh because updated hours was active now!
            // and use in Review , when user add new review or like/dislike we see in live what add and what like user.
            refetchOnWindowFocus: true,
            refetchInterval: 1000,
        }
    )
}



export const useQueryOnlyLoadingData = (typeData, LoadDataFromApi, id) => {

    return useQuery(
        typeData, () => {
            return LoadDataFromApi(id);
        }
    )
}
