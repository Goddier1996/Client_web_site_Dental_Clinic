import React from "react";
import "./ChatBot.css";
import ShowHoursWork from "./toolsComponent/ShowHoursWork";
import ContactInfo from "./toolsComponent/ContactInfo";
import InfoHowCreateSite from "./toolsComponent/InfoHowCreateSite";



export const steps = [
    {
        id: "1",
        message: "Hello welcome to the dental care clinic.",
        trigger: "2",
    },
    {
        id: "2",
        message: "My name is Artem, i'm robot i working here.",
        trigger: "3",
    },
    {
        id: "3",
        message: "What is your name?",
        trigger: "4",
    },
    {
        id: "4",
        user: true,
        validator: (value) => {
            let specialChars = /[`!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?~ ]/;
            if (!value) {
                return "Please input your name";
            }
            if (specialChars.test(value)) {
                return "Your value with special characters!";
            }
            if (!isNaN(value)) {
                return "Value should be a string, Not number!";
            }
            return true;
        },
        trigger: "5",
    },
    {
        id: "5",
        message: "Hi {previousValue}, nice to meet you!",
        trigger: "6",
    },
    {
        id: "6",
        message: "How can i help you?",
        trigger: "7",
    },
    {
        id: "7",
        options: [
            { value: 1, label: "Hours work clinic", trigger: "8" },
            { value: 2, label: "Contact", trigger: "9" },
            { value: 3, label: "Have problem", trigger: "10" },
            { value: 4, label: "Who created this website", trigger: "11" },
            {
                value: 5,
                label: "Refresh Chat",
                trigger: () => {
                    window.location.reload();
                },
                end: true
            },
        ],
    },
    {
        id: "8",
        component: (<ShowHoursWork />),
        trigger: "15",
    },
    {
        id: "9",
        component: (<ContactInfo />),
        trigger: "15",
    },
    {
        id: "10",
        options: [
            { value: 1, label: "Can't book an appointment", trigger: "12" },
            { value: 2, label: "Website don't show data", trigger: "13" },
            { value: 3, label: "Forgot password", trigger: "14" },

        ],
    },
    {
        id: "11",
        component: (<InfoHowCreateSite />),
        trigger: "15",
    },
    {
        id: "12",
        message:
            "If you cannot make an appointment at the clinic, answer Contact the clinic.",
        trigger: "15",
    },
    {
        id: "13",
        message:
            "The data does not appear on the site, try to refresh the site or check the internet.",
        trigger: "15",
    },
    {
        id: "14",
        message:
            "Forgot your password to log in? Try clicking on the forgot password button in the login popup.",
        trigger: "15",
    },
    {
        id: "15",
        message: "Do you need more help?",
        trigger: "16",
    },
    {
        id: "16",
        options: [
            { value: 1, label: "Hours work clinic", trigger: "8" },
            { value: 2, label: "Contact", trigger: "9" },
            { value: 3, label: "Have problem", trigger: "10" },
            { value: 4, label: "Who created this website", trigger: "11" },
            {
                value: 5,
                label: "Refresh Chat",
                trigger: () => {
                    window.location.reload();
                },
                end: true
            },
        ],
    },
];