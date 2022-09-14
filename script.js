"use strict";

//Global vars------------------------------

//key and pair names are changed based on purpose
//Sould be fed from the JSON in the future
const key = "du";
const value = "en";

//Data pairs object
const data = [
    {
        [key]: "Apfel",
        [value]: "Apple"
    },
    {
        [key]: "Haus",
        [value]: "House"
    },
    {
        [key]: "Igol",
        [value]: "Hedgehog"
    },
    {
        [key]: "Vogel",
        [value]: "Bird"
    },
    {
        [key]: "Rot",
        [value]: "Red"
    }
];

//document elements---------------------------
const btnSubmit = document.querySelector("#submit");
const btnNext = document.querySelector("#next");
const userAns = document.querySelector("#answer");

//Event listeners-----------------------

window.addEventListener("load", ()=>{
    disableElement(btnSubmit);
});

btnSubmit.addEventListener("click", () =>{
    submitAns();
});

btnNext.addEventListener("click", () =>{
    getNextCard();
});

userAns.addEventListener("input", (e) =>{
    if (isEmpty(e.target))
    {
        disableElement(btnSubmit);
    }
    else
    {
        enableElement(btnSubmit);
    }
});

//Functions-------------------------------

function submitAns()
{
    //Answers can't be modified once submitted
    disableElement(userAns);
    //no double submissions
    disableElement(btnSubmit);
    enableElement(btnNext);
    isSubmitted = true;
};

function getNextCard()
{
    isSubmitted = false;
    disableElement(btnNext)
    clearElement(userAns);
    enableElement(userAns);
    disableElement(btnSubmit);
};

function isEmpty(userAns)
{
    switch (userAns.value)
    {
        case null:
        case "":
        case undefined: return true;
        default: return false
    }
};

function disableElement(targetElement)
{
    targetElement.disabled = true;
}

function enableElement(targetElement)
{
    targetElement.disabled = false;
}

function clearElement(targetElement)
{
    targetElement.value = null;
}