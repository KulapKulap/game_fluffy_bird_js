let cvs = document.getElementById('canvas');
let ctx = cvs.getContext('2d');

let bird = new Image();
let background = new Image();
let foreground = new Image();
let pipeUp = new Image();
let pipeBottom = new Image();

bird.src = "img/bird.png";
background.src = "img/background.png";
foreground.src = "img/foreground.png";
pipeBottom.src = "img/pipeBottom.png";
pipeUp.src = "img/pipeUp.png";

let gap = 170;

document.addEventListener('keydown', moveUp);

function moveUp() {
    yPos -= 30;
}

let pipe = [];
pipe[0] = {
    x: cvs.width,
    y: 0
}

let xPos = 10;
let yPos = 150;
let grav = 2;
let score = 0;

function draw() {
    ctx.drawImage(background, 0, 0);
    for (let i = 0; i < pipe.length; i++) {
        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);

        pipe[i].x--;

        if (pipe[i].x == 125) {
            pipe.push({
                x: cvs.width,
                y: Math.floor(Math.random() * pipeUp.height) - pipeUp.height

            });
        }

        if (xPos + bird.width >= pipe[i].x &&
            xPos <= pipe[i].x + pipeUp.width &&
            (yPos <= pipe[i].y + pipeUp.height ||
                yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - foreground.height) {
            location.reload();
        }

        if (pipe[i].x == 5) {
            score++;
        }
    }


    ctx.drawImage(foreground, 0, cvs.height - foreground.height);
    ctx.drawImage(bird, xPos, yPos);
    yPos += grav;

    ctx.fillStyle = '#000';
    ctx.font = "20px Verdana";
    ctx.fillText('score:' + score, 20, cvs.height - 20);

    requestAnimationFrame(draw);
};
pipeBottom.onload = draw;