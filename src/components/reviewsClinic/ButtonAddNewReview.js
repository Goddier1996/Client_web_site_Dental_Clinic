import React from 'react'


const ButtonAddNewReview = ({ CheckUserConnected }) => {

    let storedTheme = localStorage.getItem("theme");


    return (
        <div className="d-grid gap-2 addReviews" >
            <button className={(storedTheme === "light") ? "button-55Dark" : (storedTheme === "dark") ? "button-55" : ""}
                role="button"
                onClick={CheckUserConnected}>
                Add new Review
            </button>
        </div>
    )
}

export default ButtonAddNewReview