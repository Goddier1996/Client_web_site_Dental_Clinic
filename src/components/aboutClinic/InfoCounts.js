import React from 'react'


const InfoCounts = ({ type, count, img }) => {

    let storedTheme = localStorage.getItem("theme");

    return (

        <div className="a-box">
            <div className="img">
                <div className="img-inner">
                    <div className="inner-skew">
                        <img src={img} alt="icon" />
                    </div>
                </div>
            </div>

            <div className={(storedTheme === "light") ? "textDark" : (storedTheme === "dark") ? "text" : ""}>
                <h3>{type} :</h3>
                <div>
                    <p>{count}</p>
                </div>
            </div>
        </div>
    )
}

export default InfoCounts;