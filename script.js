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
let userName;
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
    }else if(clickCounter===2){
        successScreen();
    }else{
        
    }
});

function validateForms(){
    if(nameInput.value !== "" & validateEmail(emailInput.value)){
        userName = nameInput.value;
        email = emailInput.value;
        return true;
    } 
    return false;
}
function validateEmail(email){
    let validRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
        buttonChoices[button.getAttribute('id').replace("button", "")] = "nope";
        
    }else{
        button.style.background = "var(--button-background-bottom)";
        button.style.color = "var(--primary-header-color)";
        buttonChoices[button.getAttribute('id').replace("button", "")] = button.getAttribute('id').replace("button", "");
        selected++;
    }
}
function resetButton(button){
    button.style.background = "";
    button.style.color = "";
}
function transitionToScreenThree(){
    let topics = getTopics();
    topHeader.innerHTML="Summary";
    stepCounter.innerHTML="Step 3 of 3";
    dots[1].classList.remove("current");
    dots[2].classList.add("current");
    innerDots[2].classList.add("used");
    button.innerHTML="Confirm";
    document.getElementById("three__choices__wrapper").remove();
    const tempP1 = document.querySelector("#template__page3__one");
    const tempP2 = document.querySelector("#template__page3__two");
    topHeaderWrapper.after(tempP2.content.cloneNode(true));
    topHeaderWrapper.after(tempP1.content.cloneNode(true));
    document.getElementById("name__name").innerHTML=userName;
    document.getElementById("email__email").innerHTML=email;
    console.log(topics.length);
    if(topics.length>1){
        let cloneCount = -1+topics.length;
        let list= document.getElementById("topics__list");
        let liClone = document.getElementsByClassName("topics__list__item")[0];
        for(let i = 0; i<cloneCount; i++){
            list.appendChild(liClone.cloneNode());
        }
        let cloneList =document.getElementsByClassName("topics__list__item");
        for(let i = 0; i<topics.length; i++){
            cloneList[i].innerHTML = topics[i];
        }
    }else{
        let li = document.getElementsByClassName("topics__list__item")[0];
        li.innerHTML=topics[0];
    }
    
}
function getTopics(){
    let returnVals = [];
    for(let i = 0; i<buttonChoices.length; i++){
        let current = buttonChoices[i];
        switch(current){
            case("1"):
                returnVals.push("Software Development");
                break;
            case("2"):
                returnVals.push("User Experience");
                break;
            case("3"):
                returnVals.push("Graphic Design");
                break;
            default:
                break;
        }
            
        console.log(current);
    }
    return returnVals;
}

function successScreen(){
    console.log("Got it");
    let center = document.getElementById("center__box");
    let remove = center.children;
    while(center.firstChild){
        center.removeChild(center.firstChild);
    }
    while(center.lastChild){
        center.removeChild(center.lastChild);
    }
    dots[2].classList.remove("current");
    stepCounter.innerHTML = "Done!";
    let temp = document.querySelector("#template__success");
    let success = temp.content.cloneNode(true);
    center.appendChild(success);
    center.style.justifyContent="center";
    center.style.alignItems="center";
}
