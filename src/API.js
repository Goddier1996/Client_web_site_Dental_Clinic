import { Config } from "./config";


//here we take all function from Node Js use config import

export const API = {

    USERS: {

        GET: `${Config.API.BASE}/api/users`,
        FORGET: `${Config.API.BASE}/api/users/findUser`,
        ADD: `${Config.API.BASE}/api/users`,
        LOGIN: `${Config.API.BASE}/api/users/login`,
        PUT: `${Config.API.BASE}/api/users`,
    },

    REVIEWS: {

        GET: `${Config.API.BASE}/api/reviews`,
        ADD: `${Config.API.BASE}/api/reviews`,
    },

    HOURS: {

        GET: `${Config.API.BASE}/api/hours`,
        DELETE: `${Config.API.BASE}/api/hours/reactive`,
        ACTIVE: `${Config.API.BASE}/api/hours/active`,

    },

    DAYS: {

        GET: `${Config.API.BASE}/api/days`,
    },

    MEDICAL_FILE: {

        GET: `${Config.API.BASE}/api/medical`,
        ADD: `${Config.API.BASE}/api/medical`
    }
}

























        // DELETE: `${Config.API.BASE}/api/medical/delete`,
        // GET_ISACTIVE_NOT_FILE: `${Config.API.BASE}/api/medical/MedicalFileNotActive`,

        // GET: `${Config.API.BASE}/api/day`,

        // ACTIVE:`${Config.API.BASE}/api/hours/active`

        // DELETE: `${Config.API.BASE}/api/hours/delete`,
        // REACTIVATE: `${Config.API.BASE}/api/hours/reactivate`,


         // ADD_LIKE: `${Config.API.BASE}/api/reviews/addLike`,
        // DELETE: `${Config.API.BASE}/api/reviews/delete`,

        // UPDATE: `${Config.API.BASE}/api/reviews`,
        // GET_COUNT_REVIEWS: `${Config.API.BASE}/api/reviews/countReviews`,

        // DELETE: `${Config.API.BASE}/api/users/delete`,
        // REACTIVE: `${Config.API.BASE}/api/users/active`,
        // GET_COUNT_DOCTOR: `${Config.API.BASE}/api/users/countDoctors`,
        // GET_COUNT_USERS: `${Config.API.BASE}/api/users/countUsers`,
        // GET_DOCTORS: `${Config.API.BASE}/api/showDoctors`,
        // GETActiveQueuesUsers: `${Config.API.BASE}/api/users/users_Active_queues`,
        // GETBlockedUsers: `${Config.API.BASE}/api/users/reactive`,
        // ADD: `${Config.API.BASE}/api/users/add`,
        // LOGIN: `${Config.API.BASE}/api/users/login`,
        // UPDATE: `${Config.API.BASE}/api/users/update`,
        // UPDATE_PASSWORD: `${Config.API.BASE}/api/users/updatePassword`,
        // UPDATE_DAY_HOUR: `${Config.API.BASE}/api/users/updateDayHour`,

