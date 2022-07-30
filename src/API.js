import { Config } from "./config";


//here we take all function from Node Js use config import

export const API = {

    USERS: {

        GET: `${Config.API.BASE}/api/users`,
        GET_COUNT_DOCTOR: `${Config.API.BASE}/api/users/CountDoctors`,
        GET_COUNT_USERS: `${Config.API.BASE}/api/users/CountUsers`,
        GET_DOCTORS: `${Config.API.BASE}/api/Doctors`,
        GETActiveQueuesUsers: `${Config.API.BASE}/api/users/users_Active_queues`,
        GETBlockedUsers: `${Config.API.BASE}/api/users/blocked_users`,
        ADD: `${Config.API.BASE}/api/users/add`,
        LOGIN: `${Config.API.BASE}/api/users/login`,
        UPDATE: `${Config.API.BASE}/api/users/update`,
        UPDATE_PASSWORD: `${Config.API.BASE}/api/users/updatePassword`,
        UPDATE_DAY_HOUR: `${Config.API.BASE}/api/users/updateDayHour`,
        FORGET: `${Config.API.BASE}/api/users/forget`,
        DELETE: `${Config.API.BASE}/api/users/delete`,
        REACTIVE: `${Config.API.BASE}/api/users/reactivate`
    },

    REVIEWS: {

        GET: `${Config.API.BASE}/api/reviews`,
        GET_COUNT_REVIEWS: `${Config.API.BASE}/api/reviews/CountReviews`,
        ADD: `${Config.API.BASE}/api/reviews/add`,
        ADD_LIKE: `${Config.API.BASE}/api/reviews/addLike`,
        DELETE: `${Config.API.BASE}/api/reviews/delete`
    },

    HOURS: {

        GET: `${Config.API.BASE}/api/hours`,
        DELETE: `${Config.API.BASE}/api/hours/delete`,
        REACTIVATE: `${Config.API.BASE}/api/hours/reactivate`
    },

    DAYS: {

        GET: `${Config.API.BASE}/api/day`,
    }
    ,

    MEDICAL_FILE: {

        GET: `${Config.API.BASE}/api/medicalFile`,
        DELETE: `${Config.API.BASE}/api/medicalFile/delete`,
        GET_ISACTIVE_NOT_FILE: `${Config.API.BASE}/api/medicalFile/MedicalFileNotActive`,
        ADD: `${Config.API.BASE}/api/medicalFile/add`
    }
}