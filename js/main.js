var count = 0;
var clickMultiply = 1;
var clickPower = 1;
var passiveGain = 0.1;
var cost = 50;
var upgrades = [1, 2, 3, 4, 5];
var costs = [50, 100, 200, 400, 800];
setInterval(passive, 1000);
var achv1 = false;
var i = false;

const clickUpgrade = {
    cost: 50,
    power: 1,
}

/**********Ball Falling Animation **********/

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("ballAnimate");
let raf;
let balls = [];
class ball {
    constructor() {
        this.x = 115,
            this.y = 9,
            this.vx = 2,
            this.vy = 3,
            this.radius = 15;
    }
    draw() {
        ctx.drawImage(image, this.x, this.y, 15, 15);
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy *= 0.99;
        this.vy += 0.25;
        if (
            this.y + this.vy > canvas.height - this.radius ||
            this.y + this.vy < this.radius
        ) {
            this.vy = -(this.vy / 1.5);
        }
    }
};

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let ball of balls) {
        ball.draw();
    }
}

function update() {
    for (let ball of balls) {
        ball.update();
    }
}

function loop() {
    draw();
    update();
    raf = requestAnimationFrame(loop);
}

function animateBallFirst() {
    balls.push(new ball());
    raf = requestAnimationFrame(loop);
    i = true;
}

function animateBall() {
    balls.push(new ball());
}

/**********Passive Gain Functions **********/

function passive() {
    count = count + passiveGain;
    $("#count").text(Math.trunc(count));
    checkUpgrade();
    $("#passive").text("Balls per second: " + passiveGain);
    checkAchievment();
}

function checkUpgrade() {
    if (count >= cost) {
        $("#upgrade1").css("background", "green");
    } else {
        $("#upgrade1").css("background", "red");
    }
}

function checkAchievment() {
    if (count == 1 && achv1 == false) {
        $("#achv1").css("background", "green");
        achv1 = true;
    }
}

function clicked() {
    count = count + (clickPower * clickMultiply);
    $("#count").text(Math.trunc(count));
    checkUpgrade();
    clickNumber();
    if(i == false) {animateBallFirst();}
    else {animateBall();}
}

function clickNumber() {
    clickGain = clickPower * clickMultiply;
    //$("#cNum").text(clickGain); 
}

$("#upgrade1").on("click", upgrade);
function upgrade() {
    if (count >= cost) {
        count = count - cost;
        clickPower = clickPower + 1;
        cost = cost + 30;
        $("#count").text(Math.trunc(count));
        $("#cost1").text(cost);
        checkUpgrade();
    }
}

$("#c").on("click", clicked);

