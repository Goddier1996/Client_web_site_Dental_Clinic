import { API } from './API';



export async function DeleteUser(Id) {

    await fetch(`${API.USERS.GET}/NotActive/${Id}`,
        { method: 'PATCH' }
    );
    window.location.reload(false);
}



export async function DeleteReview(Id) {

    await fetch(`${API.REVIEWS.GET}/delete/${Id}`,
        { method: 'DELETE' }
    );
    window.location.reload(false);
}



export async function DeleteHour(Id) {

    await fetch(`${API.HOURS.GET}/NotActive/${Id}`, { method: 'PATCH' });
}



export async function UpdateDataUserRemoveTurn(codeUser) {

    try {

        let user = {
            Day_date: null,
            Hour_day: null,
            Serial_codeHour: null
        }

        await fetch(`${API.USERS.GET}/${codeUser}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

    } catch (error) {
        console.log(error)
    }
}



export async function UpdateDataUserAddTurn(id, userData, dayLocal, hourLocal, serial_code) {

    try {

        let user = {
            FirstName: userData.FirstName,
            User_Login: userData.User_Login,
            Birthday: userData.Birthday,
            Email: userData.Email,
            User_password: userData.User_password,
            UserType_code: "1",
            Confirm_password: userData.Confirm_password,
            Day_date: dayLocal,
            Hour_day: hourLocal,
            Serial_codeHour: serial_code
        }

        await fetch(`${API.USERS.GET}/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

    } catch (error) {
        console.log(error)
    }
}



export async function ActiveHourInDataBase(codeHour) {

    fetch(`${API.HOURS.GET}/active/${codeHour}`, { method: 'PATCH' });
}



export async function ActiveUserInDataBase(Id) {

    await fetch(`${API.USERS.GET}/active/${Id}`, { method: 'PATCH' });
}



export async function DeletePayFile(Id) {

    await fetch(`${API.MEDICAL_FILE.GET}/delete/${Id}`, { method: 'PATCH' });
}



export async function ForgetPasswordUpdate(Id, user) {

    try {

        await fetch(`${API.USERS.GET}/${Id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        });

    } catch (error) {
        console.log(error)
    }
}