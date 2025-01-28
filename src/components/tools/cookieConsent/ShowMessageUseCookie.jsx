import React from "react";
import CookieConsent from "react-cookie-consent";
import "./styleCookieMessage.css";


const ShowMessageUseCookie = () => {

  return (
    <div className="cookieMessageStyle">
      <CookieConsent
        location="bottom"
        buttonText="Ok"
        cookieName="myAppCookieConsent"
        containerClasses="cookie-consent-container"
        style={{
          background: "#2e9def",
          borderTopRightRadius: "30px",
          color: "#fff",
          width: "auto",
        }}
        buttonStyle={{
          fontSize: "15px",
          background: "#fff",
          color: "#4a4a4a",
          borderRadius: "30px",
          border: "none",
          width: "100px",
        }}
      >
        ⚠️ <span className="messageInfoCookies">Important message</span> ⚠️
        <br />
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </div>
  );
};


export default ShowMessageUseCookie;