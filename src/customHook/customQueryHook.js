import { useQuery } from 'react-query'


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