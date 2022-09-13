"use strict";

//Global vars------------------------------

//key and pair names are changed based on purpose
//Sould be fed from the JSON in the future
const key = "du";
const value = "en";
let isSubmitted = false;

//Data pairs object
const data = [
    {
        [key]: "Apfel",
        [value]: "Apple"
    },
    {
        [key]: "Haus",
        [value]: "House"
    }
];


//document elements---------------------------
const btnSubmit = document.querySelector("#submit");
const btnNext = document.querySelector("#next");

//Event listeners-----------------------
btnSubmit.addEventListener("click", () =>{
    submitAns();
});

btnNext.addEventListener("click", () =>{
    getNextCard();
});

//Functions-------------------------------

function submitAns()
{
    isSubmitted = true;
    toggleNext();
};

function getNextCard()
{
    isSubmitted = false;
    toggleNext();
};

function toggleNext()
{
    if (isSubmitted)
    {
        btnNext.disabled = false;
    }
    else
    {
        btnNext.disabled = true;
    }
};