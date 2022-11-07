import React from 'react'
import { useState } from "react";
import '../css/PayService.css'
import Swal from 'sweetalert2'
import { API } from '../API';


//this component user in User component - when user need to pay a service 
function PayService() {


    const [CardNumber, setCardNumber] = useState('');
    const [CardholderName, setCardholderName] = useState('');
    const [Expiration, setExpiration] = useState('');
    const [Cvv, setCvv] = useState('');


    let PayDetails = JSON.parse(sessionStorage.getItem("PayDetails"));


    //click button pay price and check if all input was good,if yes send to function DeletePayFile

    const Pay = async () => {
        // alert(PayDetails.Serial_code)

        if (CardNumber != '' && CardholderName != '' && Expiration != '' && Cvv != '' && PayDetails.userName == CardholderName) {

            DeletePayFile(PayDetails.Serial_code);

            Swal.fire({
                title: 'success',
                icon: 'success',
                toast: true,
                position: 'top-end'
            }).then((result) => {

                if (result.isConfirmed) {
                    window.location.reload(false);
                }
            })
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



    //delete pay file = when pay the price

    const DeletePayFile = async (Serial_code) => {

        await fetch(`${API.MEDICAL_FILE.GET}/delete/${Serial_code}`,
            { method: 'PATCH' });

    }




    return (

        <div>

            <div className="row d-flex justify-content-center">
                <div className="col-sm-12">
                    <div className="cardPay mx-auto">
                        <p className="heading">PAYMENT DETAILS</p>
                        <form className="cardPay-details ">
                            <div className="form-group mb-0">


                                <p className="text-warning mb-0">Card Number</p>
                                <input type="number" name="card-num" placeholder="1234 5678 9012 3457" size="17" id="cno" minlength="19" maxlength="19"
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


                                <h6 className="text-warning mb-0">Pay : {PayDetails.priceSevice}</h6>

                            </div>
                            <div className="form-group pt-2">
                                <div className="row d-flex">


                                    <div className="col-sm-4">
                                        <p className="text-warning mb-0">Expiration</p>
                                        <input type="text" name="exp" placeholder="MM/YYYY" size="7" id="exp" minlength="7" maxlength="7"
                                            value={Expiration}
                                            onChange={(event) => setExpiration(event.target.value)}
                                        />
                                    </div>



                                    <div className="col-sm-3">
                                        <p className="text-warning mb-0">Cvv</p>
                                        <input type="password" name="cvv" placeholder="&#9679;&#9679;&#9679;" size="1" minlength="3" maxlength="3"
                                            value={Cvv}
                                            onChange={(event) => setCvv(event.target.value)}
                                        />
                                    </div>


                                    <div class="col-sm-5 pt-0">
                                        <button type="button" class="btn btn-primary" onClick={Pay}><i class="fas fa-arrow-right px-3 py-2"></i></button>
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