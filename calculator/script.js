const display = document.getElementById("display");

function appendValue(value){
    display.value += value;
}

function resetCalculator(){
    display.value = "";
}

function backspace(){
    display.value = display.value.slice(0,-1);
}

function calculate(){

    if(display.value===""){
        return;
    }

    try{

        let expression = display.value.replace(/÷/g,"/").replace(/×/g,"*");

        let result = eval(expression);

        if(result===Infinity || isNaN(result)){
            throw Error();
        }

        display.value = result;

    }
    catch{

        display.value = "Invalid";

        setTimeout(()=>{
            display.value="";
        },1500);

    }

}

document.addEventListener("keydown",function(e){

    const key = e.key;

    if(!isNaN(key)){
        appendValue(key);
    }

    else if(key==="+" || key==="-" || key==="*" || key==="/" || key==="." || key==="%"){
        appendValue(key);
    }

    else if(key==="Enter"){
        e.preventDefault();
        calculate();
    }

    else if(key==="Backspace"){
        backspace();
    }

    else if(key==="Escape"){
        resetCalculator();
    }

});