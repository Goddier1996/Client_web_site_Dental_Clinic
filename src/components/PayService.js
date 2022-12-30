import React, { useState } from 'react'
import '../css/PayService.css'
import Swal from 'sweetalert2'
import { DeletePayFile } from '../Api/DeleteUpdateDataFromApi'



//this component user in User component - when user need to pay a service 
function PayService(props) {

    const [CardNumber, setCardNumber] = useState('');
    const [CardholderName, setCardholderName] = useState('');
    const [Expiration, setExpiration] = useState('');
    const [Cvv, setCvv] = useState('');


    let PayDetails = JSON.parse(sessionStorage.getItem("PayDetails"));


    //click button pay price and check if all input was good,if yes send to function DeletePayFile from DeleteUpdateDataFromAp component
    const Pay = async () => {

        if (CardNumber != '' && CardholderName != '' && Expiration != '' && Cvv != '' && PayDetails.userName == CardholderName) {

            await DeletePayFile(PayDetails.Serial_code);

            Swal.fire({
                title: 'success',
                icon: 'success',
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                toast: true,
            })

            window.location.reload(false);
        }

        else {

            Swal.fire({
                title: 'input please All place Or First Name Not suitable!',
                icon: 'warning',
                toast: true,
                position: 'top-end'
            })
        }
    }




    return (

        <div>

            <div className="row d-flex justify-content-center">
                <div className="col-sm-12">
                    <div className="cardPay mx-auto">

                        <p className="closesPayService" onClick={props.hideModelPayService} aria-label="Close">
                            &times;
                        </p>

                        <p className="heading">PAYMENT DETAILS</p>
                        <form className="cardPay-details ">
                            <div className="form-group mb-0">


                                <p className="text-warning mb-0">Card Number</p>
                                <input type="number" name="card-num" placeholder="1234 5678 9012 3457" size="17" id="cno" minLength="19" maxLength="19"
                                    value={CardNumber}
                                    pattern="[0-9]*"
                                    onChange={(event) => setCardNumber(event.target.value)}
                                />

                                <img src="https://img.icons8.com/color/48/000000/visa.png" width="64px" height="60px" />
                            </div>

                            <div className="form-group">


                                <p className="text-warning mb-0">Cardholder's Name</p>
                                <input type="text" name="name" placeholder={PayDetails.userName} size="17"
                                    value={CardholderName}
                                    onChange={(event) => setCardholderName(event.target.value)}
                                />

                                <h6 className="text-warning mb-0">Pay : {PayDetails.priceSevice}$</h6>

                            </div>
                            <div className="form-group pt-2">
                                <div className="row d-flex">

                                    <div className="col-sm-4">
                                        <p className="text-warning mb-0">Expiration</p>
                                        <input type="text" name="exp" placeholder="MM/YYYY" size="7" id="exp" minLength="7" maxLength="7"
                                            value={Expiration}
                                            onChange={(event) => setExpiration(event.target.value)}
                                        />
                                    </div>



                                    <div className="col-sm-3">
                                        <p className="text-warning mb-0">Cvv</p>
                                        <input type="password" name="cvv" placeholder="&#9679;&#9679;&#9679;" size="4" minLength="3" maxLength="3"
                                            value={Cvv}
                                            onChange={(event) => setCvv(event.target.value)}
                                        />
                                    </div>


                                    <div className="col-sm-5 pt-0 pay">
                                        <button type="button" className="btn btn-primary" onClick={Pay}><i className="fas fa-arrow-right px-3 py-2"></i></button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default PayService;