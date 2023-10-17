const button = document.getElementById("continue");
const inputs = document.getElementsByClassName("input__wrapper");
const topHeader = document.getElementById("top__header");
const topHeaderWrapper = document.getElementById("top__header__wrapper");
const stepCounter = document.getElementById("step__counter");
const dots = document.getElementsByClassName("dot__wrapper");
const innerDots = document.getElementsByClassName("dot");
const template = document.querySelector("#template");
const threeChoices = template.content.cloneNode(true);
const buttons = document.getElementsByClassName("button__choice");
const nameInput = document.getElementsByClassName("box1")[0];
const emailInput = document.getElementsByClassName("box2")[0];
let email;
let name;
let buttonChoices = [];
let clickCounter = 0;
let selected = 0;

button.addEventListener('click', ()=>{
    if(clickCounter===0){
        if(validateForms()===true){
            clickCounter++;
            transitionToScreenTwo();
        }
    }else if(clickCounter===1){
        if(selected!==0){
            clickCounter++;
            transitionToScreenThree();
        }
        

    }else{
        triggerSubmit();
    }
});

function validateForms(){
    if(nameInput.value !== "" & validateEmail(emailInput.value)){
        name = nameInput.value;
        email = emailInput.value;
    } return true;
    return false;
}
function validateEmail(email){
    let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if(email.match(validRegex)){
        return true;
    }
    return false;
}
function transitionToScreenTwo(){   
    inputs[0].remove();
    inputs[0].remove();
    topHeader.innerHTML="Which topics are you interested in?";
    stepCounter.innerHTML="Step 2 of 3";
    dots[0].classList.remove("current");
    dots[1].classList.add("current");
    innerDots[1].classList.add("used");
    topHeaderWrapper.after(threeChoices);
    initalizeListeners();
}

function triggerSubmit(){
    
}
function initalizeListeners(){
        for(let i = 0; i<buttons.length;i++){
            buttons[i].addEventListener('click',(event)=>{
                selectButton(event.target);
            });
        };
}

function selectButton(button){
    if(button.style.background==="var(--button-background-bottom)"){
        resetButton(button);
        console.log("already selected");
        selected--;
        
    }else{
        button.style.background = "var(--button-background-bottom)";
        button.style.color = "var(--primary-header-color)";
        buttonChoices.push(button.getAttribute('id').replace("button", ""));
        selected++;
    }
}
function resetButton(button){
    button.style.background = "";
    button.style.color = "";
}
function transitionToScreenThree(){
    topHeader.innerHTML="Summary";
    stepCounter.innerHTML="Step 3 of 3";
    dots[1].classList.remove("current");
    dots[2].classList.add("current");
    innerDots[2].classList.add("used");
    document.getElementById("three__choices__wrapper").remove();
}
