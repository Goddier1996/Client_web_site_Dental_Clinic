import { useQuery } from 'react-query'


export const useQueryDataLoadingRefetchAutoData = (typeData, LoadDataFromApi, id) => {

    return useQuery(
        typeData, () => {
            return LoadDataFromApi(id);
        },
        {
            // when add new item refersh 1 secound auto
            refetchInterval: 1000,
            refetchIntervalInBackground: true
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
