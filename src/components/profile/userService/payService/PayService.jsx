import React, { useState } from "react";
import "./payService.css";
import Button from "react-bootstrap/Button";
import { userPayTurn } from "../function/UserProfileFunction";
import {hideModelPayService} from "../function/UserProfileFunction"

//this component user in User component - when user need to pay a service
function PayService() {


  const [CardNumber, setCardNumber] = useState("");
  const [CardholderName, setCardholderName] = useState("");
  const [Expiration, setExpiration] = useState("");
  const [Cvv, setCvv] = useState("");

    
  let PayDetails = JSON.parse(sessionStorage.getItem("PayDetails"));

  let storedTheme = localStorage.getItem("theme");

    
  const Pay = async () => {
    
    let useDataPay = {
      CardNumber: CardNumber,
      CardholderName: CardholderName,
      Expiration: Expiration,
      Cvv: Cvv,
    };

    userPayTurn(useDataPay);
  };

    
  return (
    <>
      <div className="container mt-4 d-flex justify-content-center main">
        <div
          className={
            storedTheme === "light"
              ? "cardPayDark"
              : storedTheme === "dark"
              ? "cardPay"
              : ""
          }
        >
          <div className="d-flex justify-content-between px-3 pt-4">
            <span
              className={
                storedTheme === "light"
                  ? "payDark"
                  : storedTheme === "dark"
                  ? "pay"
                  : ""
              }
            >
              Pay amount
            </span>

            <div className="amount">
              <div className="inner">
                <span className="total">{PayDetails.priceSevice}</span>
                <span className="dollar">$</span>
              </div>
            </div>
          </div>

          <div className="px-3 pt-3">
            <label
              htmlFor="cardPay number"
              className="d-flex justify-content-between"
            >
              <span className="labeltxt">CARD NUMBER</span>
              <img
                src="https://i.postimg.cc/Znm2kbrb/download-4.png"
                height="25"
                className="imagePay"
              />
            </label>

            <input
              type="number"
              name="number"
              className="form-control inputtxt"
              placeholder="8881 2545 2545 2245"
              size="17"
              minLength="16"
              maxLength="16"
              value={CardNumber}
              onChange={(event) => setCardNumber(event.target.value)}
            />

            <label
              htmlFor="cardPay number"
              className="d-flex justify-content-between"
            >
              <span className="labeltxt">CARDHOLDER'S NAME</span>
            </label>

            <input
              type="text"
              name="text"
              className="form-control inputtxt"
              placeholder={PayDetails.userName}
              value={CardholderName}
              onChange={(event) => setCardholderName(event.target.value)}
            />
          </div>

          <div className="d-flex justify-content-between px-3 pt-4">
            <div>
              <label htmlFor="date" className="exptxt">
                Expiry
              </label>
              <input
                type="text"
                name="number"
                className="form-control expiry"
                placeholder="MM / YY"
                size="4"
                minLength="4"
                maxLength="4"
                value={Expiration}
                onChange={(event) => setExpiration(event.target.value)}
              />
            </div>

            <div>
              <label htmlFor="cvv" className="cvvtxt">
                CVV / CVC
              </label>
              <input
                type="password"
                name="number"
                className="form-control cvv"
                placeholder="123"
                size="4"
                minLength="3"
                maxLength="3"
                value={Cvv}
                onChange={(event) => setCvv(event.target.value)}
              />
            </div>
          </div>

          {/* here buttom close or pay */}
          <div className="d-flex align-items-center justify-content-between px-3 py-4">
            <div>
              <Button variant="danger" onClick={()=>hideModelPayService()}>
                Close
              </Button>
            </div>

            <div>
              <Button variant="success" onClick={Pay}>
                Make Payment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}


export default PayService;