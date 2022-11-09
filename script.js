const defaultGridSize = 16;
const sketchBox = document.querySelector('#sketchbox');
let penColour = 'black';
let penColourRandom = false;
let shadingToggle = false;
let eraserToggle = false;

function initialise(){
    drawGrid(defaultGridSize);
}

function drawGrid(size){
    for (let y = 1; y <= size; y++){
        let sketchRow = document.createElement('div');
        sketchRow.classList.add('sketch-box-row');
        sketchBox.appendChild(sketchRow);
        for (let x = 1; x <= size; x++){
            let sketchRowSquare = document.createElement('div');
            sketchRowSquare.classList.add('sketch-box-row-square');
            sketchRowSquare.id = "srs-" + 'x-' + x + 'y-' + y;
            sketchRow.appendChild(sketchRowSquare);
        }
    }
    const squares = Array.from(document.querySelectorAll('.sketch-box-row-square'));
    squares.forEach(square => square.addEventListener('mouseover', mouseOver)); 
    
    //buttonEvents
    const buttons = Array.from(document.querySelectorAll('.menu-button'));
    buttons.forEach(button => button.addEventListener('click', buttonClicks));
}

function mouseOver(e) {
    let selectId = e.target.id;
    let squareToChange = document.querySelector('#' + selectId);
    //if (shading){
    //    squareToChange.style.backgroundColor = //darker
    //}    
    //else 
    if (penColourRandom){
        squareToChange.style.backgroundColor = "#" + getRandomPenColour();
    } else {
        squareToChange.style.backgroundColor = penColour;
    }


}

//slider functionality

    var slider = document.getElementById("myRange");
    var output = document.getElementById("current-size");
    output.innerHTML = slider.value; // Display the default slider value

    // Update the current slider value (each time you drag the slider handle)
    slider.oninput = function() {
    output.innerHTML = this.value;
    }



function buttonClicks(e){
    //switch statement on IDs
    resetAllButtons();
    changeButtonOn(e.target.id);

    if (e.target.id == 'menu-btn-changesize'){
        let newSize = document.querySelector('#current-size').textContent;
        redrawSize(newSize);
        const buttonToChange = document.getElementById(e.target.id);
        buttonToChange.classList.remove('menu-button-set');

    } else if (e.target.id == 'menu-btn-eraser'){
        setEraser();

    } else if (e.target.id == 'menu-btn-reset'){
        let allSquares = Array.from(document.querySelectorAll('.sketch-box-row-square'));
        allSquares.forEach(square => resetSquareColour(square) );
        const buttonToChange = document.getElementById(e.target.id);
        buttonToChange.classList.remove('menu-button-set');

    } else if (e.target.id == 'menu-btn-random'){
        setRandomPenColour();

    } else if (e.target.id == 'menu-btn-default') {
        setPenColour('black');

    } else if (e.target.id == 'menu-btn-shading'){
        setShading();
        
    }
}

function resetSquareColour(square) {
    square.style.backgroundColor = 'white';
}

function redrawSize(newSize){
    removeChildren(sketchBox);
    drawGrid(newSize);
}

function removeChildren(parent){
    parent.innerHTML = '';
}

function setPenColour(colour){
    penColour = colour;
}

function setRandomPenColour(){
    if (penColourRandom){
        penColourRandom = false;
    } else {
        penColourRandom = true;
        setShadingToFalse();
    }
}

function getRandomPenColour() {
    let randomColor = Math.floor(Math.random()*16777215).toString(16);
    return randomColor;
}

function setShading(){
    if (shadingToggle){
        shadingToggle = false;
    } else {
        shadingToggle = true;
    }
}

function setEraser(){
    if (eraserToggle){
        eraserToggle = false;
        penColour = 'black';
    } else {
        eraserToggle = true;
        penColour = 'white';
    }
}

function resetAllButtons(){
    penColour = 'black';
    penColourRandom = false;
    shadingToggle = false;
    eraserToggle = false;
    const buttons = Array.from(document.querySelectorAll('.menu-button'));
    buttons.forEach(button => button.classList.remove('menu-button-set'));
}

function increaseShading(){
    
}

function changeButtonOn(buttonid){
    const buttonToChange = document.getElementById(buttonid);
    buttonToChange.classList.add('menu-button-set');

}

window.onload = initialise();

