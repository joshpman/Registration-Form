const button = document.getElementById("continue");
const inputs = document.getElementsByClassName("input__wrapper");
const topHeader = document.getElementById("top__header");
const topHeaderWrapper = document.getElementById("top__header__wrapper");
const stepCounter = document.getElementById("step__counter");
const dots = document.getElementsByClassName("dot__wrapper");
const innerDots = document.getElementsByClassName("dot");
const template = document.querySelector("#template");
const threeChoices = template.content.cloneNode(true);
let clickCounter = 0;

button.addEventListener('click', ()=>{
    if(clickCounter===0){
        clickCounter++;
        transitionToScreenTwo();
    }else if(clickCounter===1){
        clickCounter++;

    }else{
        triggerSubmit();
    }
});

function transitionToScreenTwo(){   
    inputs[0].remove();
    inputs[0].remove();
    topHeader.innerHTML="Which topics are you interested in?";
    stepCounter.innerHTML="Step 2 of 3";
    dots[0].classList.remove("current");
    dots[1].classList.add("current");
    innerDots[1].classList.add("used");
    topHeaderWrapper.after(threeChoices);
}

function triggerSubmit(){

}