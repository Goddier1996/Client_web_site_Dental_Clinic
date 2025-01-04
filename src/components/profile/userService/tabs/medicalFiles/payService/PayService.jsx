import React from "react";
import { useForm } from "react-hook-form";
import "./payService.css";
import { userPayService } from "../../../../../../customHook/customQueryHook";
import { Form, Button, Spinner } from "react-bootstrap";
import { userPayTurnNotSuccessful } from "../../../function/UserProfileFunction";



function PayService({ dataUserPay, closePopUp }) {


  let storedTheme = localStorage.getItem("theme");

  const { register, handleSubmit } = useForm();

  const { mutate, isLoading: isPaying } = userPayService();


  const onSubmit = (data) => {
    let userData = JSON.parse(sessionStorage.getItem("user"));

    if (
      userData.FirstName != data.CardholderName ||
      isNaN(data.CardNumber) ||
      isNaN(data.Expiration) ||
      isNaN(data.Cvv)
    ) {
      userPayTurnNotSuccessful();
    } else {
      // send to useQuery hook function data
      mutate(dataUserPay);
    }
  };

  const onError = (errors) => {
    console.log(errors);
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
                <span className="total">{dataUserPay.priceSevice}</span>
                <span className="dollar">$</span>
              </div>
            </div>
          </div>

          <Form onSubmit={handleSubmit(onSubmit, onError)}>
            <div className="px-3 pt-3">
              <Form.Label
                htmlFor="cardPay number"
                className="d-flex justify-content-between labeltxt"
              >
                CARD NUMBER
                <img
                  src="https://i.postimg.cc/Znm2kbrb/download-4.png"
                  height="25"
                  className="imagePay"
                />
              </Form.Label>
              <Form.Control
                type="tell"
                maxLength="16"
                className="form-control inputtxt"
                placeholder="8881 2545 2545 2245"
                {...register("CardNumber", {
                  required: true,
                  minLength: {
                    value: 16,
                    valueAsNumber: true,
                  },
                })}
              />

              <Form.Label
                htmlFor="cardPay number"
                className="d-flex justify-content-between labeltxt"
              >
                CARDHOLDER'S NAME
              </Form.Label>
              <Form.Control
                type="text"
                name="text"
                className="form-control inputtxt"
                placeholder={dataUserPay.name}
                {...register("CardholderName", {
                  required: true,
                })}
              />
            </div>

            <div className="d-flex justify-content-between px-3 pt-4">
              <div>
                <Form.Label htmlFor="date" className="exptxt">
                  Expiry
                </Form.Label>
                <Form.Control
                  type="tel"
                  maxLength="4"
                  name="number"
                  className="form-control expiry"
                  placeholder="MM / YY"
                  {...register("Expiration", {
                    required: true,
                    minLength: {
                      value: 4,
                    },
                  })}
                />
              </div>

              <div>
                <Form.Label htmlFor="cvv" className="cvvtxt">
                  CVV / CVC
                </Form.Label>
                <Form.Control
                  type="password"
                  maxLength="3"
                  name="number"
                  className="form-control cvv"
                  placeholder="CVV"
                  {...register("Cvv", {
                    required: true,
                    minLength: {
                      value: 3,
                    },
                  })}
                />
              </div>
            </div>

            {/* here buttom close or pay */}
            <div className="d-flex align-items-center justify-content-between px-3 py-4">
              <div>
                <Button variant="danger" onClick={() => closePopUp()}>
                  Close
                </Button>
              </div>

              <div>
                {!isPaying ? (
                  <Button
                    style={isPaying ? { cursor: "not-allowed" } : {}}
                    variant="success"
                    disabled={isPaying}
                    type="submit"
                  >
                    Make Payment
                  </Button>
                ) : (
                  <Button variant="success">
                    <Spinner
                      as="span"
                      animation="border"
                      size="sm"
                      role="status"
                      aria-hidden="true"
                    />
                  </Button>
                )}
              </div>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}


export default PayService;