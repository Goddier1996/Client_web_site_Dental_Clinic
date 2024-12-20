import axios from 'axios';
import Swal from 'sweetalert2'
import React from 'react'


let storedTheme = localStorage.getItem("theme");



export async function popErrorRegisterUser() {

    Swal.fire({
        icon: 'error',
        title: 'Please Check',
        toast: true,
        confirmButtonColor: "green",
        html: `Password NOT Equals !`,
        position: 'top-end',
        background: `${(storedTheme === "light") ? "#373E44" :
            (storedTheme === "dark") ? "" : ""}`,
        color: `${(storedTheme === "light") ? "#ffffffab" :
            (storedTheme === "dark") ? "" : ""}`,
        buttonColor: `${(storedTheme === "light") ? "#E96E00" :
            (storedTheme === "dark") ? "" : ""}`
    })
}


export async function popUserRegister(history) {

    await Swal.fire({
        position: "center",
        background: "none",
        showConfirmButton: false,
        timer: 3000,
        allowOutsideClick: false,
        html: '<div class="ShowImageWhenRegister"><img src="https://i.postimg.cc/MZP7Xzk6/cute-penguin.gif"> </div>',
    });

    history.push("/")
}


export function checkInputValueEmail(email) {

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}


export async function popErrorEmailIncorrect() {

    Swal.fire({
        icon: 'error',
        title: 'Email Not Good',
        toast: true,
        confirmButtonColor: "green",
        html: `The email you entered is incorrect`,
        position: 'top-end',
        background: `${(storedTheme === "light") ? "#373E44" :
            (storedTheme === "dark") ? "" : ""}`,
        color: `${(storedTheme === "light") ? "#ffffffab" :
            (storedTheme === "dark") ? "" : ""}`,
        buttonColor: `${(storedTheme === "light") ? "#E96E00" :
            (storedTheme === "dark") ? "" : ""}`
    })
}


export async function checkIfMailValid(mutate, data) {

    const options = {
        method: 'GET',
        headers: {'x-api-key': 'C93kNSEqJqQlw8LU4RPmXiKNunzSYVoQe2Kj1mg1'}
      };

    // send Email input user when register to check if it's valid, in service usebouncer
    axios.get(`https://api.usebouncer.com/v1.1/email/verify?email=${data.Email}`, options)
        .then(post => {
            if (fixWordWhenCheckEmail(Object.values(post.data.status)) === 'deliverable') {
                mutate(data);
            } else {
                popErrorMailNotValid();
            }
        })
        .catch(err => console.error(err)
        )
}


export function fixWordWhenCheckEmail(word) {

    let result = String(word).split(',').join('');
    return result;
}


export async function popErrorMailNotValid() {

    Swal.fire({
        icon: 'warning',
        title: 'Email Not Valid',
        toast: true,
        confirmButtonColor: "green",
        html: `Please enter a valid email`,
        position: 'top-end',
        background: `${(storedTheme === "light") ? "#373E44" :
            (storedTheme === "dark") ? "" : ""}`,
        color: `${(storedTheme === "light") ? "#ffffffab" :
            (storedTheme === "dark") ? "" : ""}`,
        buttonColor: `${(storedTheme === "light") ? "#E96E00" :
            (storedTheme === "dark") ? "" : ""}`
    })
}