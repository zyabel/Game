'use strict';

let canvas;
let context;
let time;

const blue = '#3A5BCD';
const red = '#EF2B36';
const yellow = '#FFC636';
const green = '#02A817';  

function Square(x, y, color) {
  this.x = x;
  this.y = y;
  this.color = color;
}

let squaresArr = [];

function initSquares() {
  squaresArr.push(new Square(0, 0, blue));
  squaresArr.push(new Square(0, 0, red));
  squaresArr.push(new Square(0, 0, yellow));
  squaresArr.push(new Square(0, 0, green)); 
  return squaresArr;
}

initSquares(); 

let startPosX = 0;
let startPosY = 0;
let position = (startPos) => Math.floor(Math.random() * 800)/2

function drawFrame() { 

  canvas = document.getElementById("canvas");
  context = canvas.getContext("2d");
  canvas.onmousedown = squareClick;

  context.clearRect(0, 0, canvas.width, canvas.height);
  context.beginPath();

  for (let i = 0; i < squaresArr.length; i++) {
    let square = squaresArr[i];
    square.y = startPosY + position();
    square.x = startPosX + position();
    context.fillStyle = square.color;
    context.fillRect(square.x, square.y, 50, 50);
  }
  startPosX = position();
  startPosY = position();

  if (startPosX >= canvas.clientHeight) {
    startPosX = 0;
  }
  if (startPosY >= canvas.clientHeight) {
    startPosY = 0;
  }
  setTimeout('drawFrame()', 1000);
}

const count = document.getElementById('score');

let i = 0;

function counter() {
  i++;
  count.innerHTML = i;
};

function startGame() {
  i = 0;
  count.innerHTML = 0;
  time = setTimeout('drawFrame()', 1000);
};

function stopGame() {
  clearTimeout(time);
  context.clearRect(0, 0, canvas.width, canvas.height);
  squaresArr = [];
};


function squareClick(e) {
  let clickX = e.pageX - canvas.offsetLeft;
  let clickY = e.pageY - canvas.offsetTop;

  for (let i in squaresArr) {
    let square = squaresArr[i];

    if ((clickX > (square.x-35)) && (clickX < (square.x+35))) {
      if ((clickY > (square.y-35)) && (clickY < (square.y+35))) {
        counter();
        squaresArr.splice( square, 1);
        return;
      }
    }
  }
}

