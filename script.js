"use strict";

//Global vars------------------------------

//key and pair names are changed based on purpose
//Should be fed from the JSON in the future
const key = "du";
const value = "en";
let score = 0;
//account for getNextCard call on load
let cards = 0;
let currentCard;

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
const txtUser = document.querySelector("#answer");
const divUserCard = document.querySelector("#userCard");
const pQuestion = document.querySelector("p#question");
const pCorrectAns = document.querySelector("p#correctAnswer")
const lblCrossTick = document.querySelectorAll(".card>label");
const pScore = document.querySelector('p.score');

//Event listeners-----------------------

window.addEventListener("load", ()=>{
    getNextCard();
});

btnSubmit.addEventListener("click", () =>{
    submitAns();
});

btnNext.addEventListener("click", () =>{
    getNextCard();
});

txtUser.addEventListener("input", (e) =>{
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
    disableElement(txtUser);
    //no double submissions
    disableElement(btnSubmit);
    enableElement(btnNext);

    if (doTheyMatch(txtUser.value, data[currentCard][value]))
    {
        addCssClass(divUserCard, "correct");
        lblCrossTick.forEach(label =>{
            addCssClass(label, "tick");
        });
        updateScore(1);
    }
    else
    {
        addCssClass(divUserCard, "wrong");
        lblCrossTick.forEach(label =>{
            addCssClass(label, "cross");
        });
        updateScore(0);
    }

    showElement(pCorrectAns);
};

function getNextCard()
{
    cards +=1 ;
    //remove validation visuals
    removeCssClass(divUserCard, "correct");
    removeCssClass(divUserCard, "wrong");

    lblCrossTick.forEach(label =>{
        removeCssClass(label, "tick");
    });
    lblCrossTick.forEach(label =>{
        removeCssClass(label, "cross");
    });

    pickCard();

    //update upper card
    pQuestion.textContent = data[currentCard][key];
    pCorrectAns.textContent = data[currentCard][value];

    disableElement(btnNext);
    clearElement(txtUser);
    enableElement(txtUser);
    disableElement(btnSubmit);
    hideElement(pCorrectAns);
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

function doTheyMatch(userInput, correctAns)
{
    userInput = userInput.toLowerCase();
    correctAns = correctAns.toLowerCase();

    if (userInput === correctAns)
    {
        return true;
    }
    else
    {
        return false;
    }
}

function pickCard()
{
    //floor to avoid picking outside array boundary
    currentCard = Math.floor(Math.random()*data.length);
}

function hideElement(docElement)
{
    docElement.hidden = true;
}

function showElement(docElement)
{
    docElement.hidden = false;
}

function addCssClass(docElement, className)
{
    docElement.classList.add(className);
}

function removeCssClass(docElement, className)
{
    docElement.classList.remove(className);
}

function updateScoreBoard()
{
    pScore.textContent = `${score} / ${cards} (${Math.round(score/cards * 100)}%)`;
}

function updateScore(increment = 1)
{
    score += increment;
    updateScoreBoard();
}