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