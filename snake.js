
let canvas = document.getElementById('canvas');

let ROWS = 30;
let COLS = 50;
let PIXEL = 10;

let pixels = new Map();

function initializeCanvas() {
    for (let i=0;i<ROWS;i++) {
        for (let j=0;j<COLS;j++) {
            let pixel = document.createElement('div');
            pixel.style.position = 'absolute';
            pixel.style.border = '1px solid #aaa';
            pixel.style.left = j*PIXEL + 'px';
            pixel.style.top = i*PIXEL + 'px';
            pixel.style.width = PIXEL + 'px';
            pixel.style.height = PIXEL + 'px';
            canvas.appendChild(pixel);
            pixels.set(i+'-'+j, pixel);
        }
    }
}

let currentSnake=[
    [0, 0],[0, 1],[0, 2],[0, 3],[0, 4],
];
let currentFood=[5,5];

let moveRight = ([t,l])=>[t, l+1];
let moveLeft = ([t,l])=>[t, l-1];
let moveUp = ([t,l])=>[t-1, l];
let moveDown = ([t,l])=>[t+1, l];
let currentDirection = moveDown;

// window.addEventListener('keydown',(e)=>{
//     if(e.key==='ArrowUp'&&currentDirection!==moveDown){
//         currentDirection = moveUp;
//     }
//     if(e.key==='ArrowDown'&&currentDirection!==moveUp){
//         currentDirection = moveDown;
//     }
//     if(e.key==='ArrowLeft'&&currentDirection!==moveRight){
//         currentDirection = moveLeft;
//     }
//     if(e.key==='ArrowRight'&&currentDirection!==moveLeft){
//         currentDirection = moveRight;
//     }
// })

window.addEventListener('keydown',(e)=>{
    switch(e.key){
        case 'ArrowUp':
        case 'W':
        case 'w':
            if(currentDirection!==moveDown){
                currentDirection = moveUp;
            }
            break;
        case 'ArrowDown':
        case 'S':
        case 's':
            if(currentDirection!==moveUp){
                currentDirection = moveDown;
            }
            break;
        case 'ArrowLeft':
        case 'A':
        case 'a':
            if(currentDirection!==moveRight){
                currentDirection = moveLeft;
            }
            break;
        case 'ArrowRight':
        case 'D':
        case 'd':
            if(currentDirection!==moveLeft){
                currentDirection = moveRight;
            }
            break;
    }
})

function drawSnake(snake){
    let snakePositions = new Set();
    for(let [x,y] of snake){
        let position = x+'-'+y;
        snakePositions.add(position);
    }
    for (let i=0;i<ROWS;i++) {
        for (let j=0;j<COLS;j++) {
            let position = i+'-'+j;
            let pixel = pixels.get(position);
            pixel.style.background=snakePositions.has(position)||(i===currentFood[0]&&j===currentFood[1]) ? 'black' : 'white';
        }
    }
}

function draw(){
    drawSnake(currentSnake);
}

function step(){
    let head = currentSnake[currentSnake.length-1];
    let t=currentDirection(head);
    if(t[0]===currentFood[0]&&t[1]===currentFood[1]){
        currentSnake.push(t);
        let a=Math.floor(Math.random()*ROWS);
        let b=Math.floor(Math.random()*COLS);
        while(currentSnake.some(([x,y])=>x===a&&y===b)){
            a=Math.floor(Math.random()*ROWS);
            b=Math.floor(Math.random()*COLS);
        }
        currentFood = [a,b];
    }
    else if(currentSnake.some(([x,y])=>x===t[0]&&y===t[1])){
        alert('Game Over');
        return;
    }
    else if(t[0]<0||t[0]>=ROWS||t[1]<0||t[1]>=COLS){
        alert('Game Over');
        return;
    }
    else{
        currentSnake.push(t);
        currentSnake.shift();
    }

    drawSnake(currentSnake);
    // currentSnake.shift();
    // currentSnake.push(currentDirection(head));
    // drawSnake(currentSnake);
}

initializeCanvas();
setInterval(step,200+2000/currentSnake.length);