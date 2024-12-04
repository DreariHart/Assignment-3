var count = 0;
var clickMultiply = 1;
var clickPower = 1;
var passiveGain = 0.1;
var cost = 50;
setInterval(passive, 1000);
var achv1 = false;
var i = false;
var upgradeInc = 0;
var upgradePassInc = 0;

/***************************************
----------------------------------------
******** Ball Falling Animation ********
----------------------------------------
****************************************/


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("ballAnimate");
const blue = document.getElementById("blueballAnimate");
const green = document.getElementById("greenballAnimate");
const pink = document.getElementById("pinkballAnimate");
const yellow = document.getElementById("yellowballAnimate");
const purple = document.getElementById("purpleballAnimate");

let raf;
let balls = [];
let images = [image, blue, green, pink, yellow, purple];
class ball {
    constructor() {
        this.x = 50,
            this.y = 9,
            this.vx = 2,
            this.vy = 3,
            this.radius = 15;
        this.firstBounce = false;
        this.image = images[Math.floor(Math.random() * images.length)]
         
    }
    draw() {

        ctx.drawImage(this.image, this.x, this.y, 15, 15);
        /* else if (x == 1) {
            ctx.drawImage(blue, this.x, this.y, 15, 15);
        } else if (x == 2) { 
            ctx.drawImage(green, this.x, this.y, 15, 15);
        } else if (x == 3) {
            ctx.drawImage(pink, this.x, this.y, 15, 15);
        } else if (x == 4) {
            ctx.drawImage(yellow, this.x, this.y, 15, 15);
        } else if (x == 5) {
            ctx.drawImage(purple, this.x, this.y, 15, 15);
        }*/
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.vy *= 0.99;
        this.vy += 0.25;
        if (
            this.y + this.vy > (canvas.height + 5) - this.radius ||
            this.y + this.vy < this.radius

        ) {
            if (this.firstBounce == false) {
                this.vy = -(this.vy / Math.max(Math.random() * 2, 0.9));
                this.firstBounce = true;
            }
            else {
                this.vy = -(this.vy / 1.2);
            }
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

/***************************************
----------------------------------------
*********** Passive Functions **********
----------------------------------------
****************************************/

function passive() {
    count = count + passiveGain;
    $("#count").text((Math.trunc(count)).toLocaleString());
    checkUpgrade();
    $("#passive").text("Balls per second: " + passiveGain.toFixed(1));
    checkAchievment();
}

/***************************************
----------------------------------------
************* Click Functions **********
----------------------------------------
****************************************/

function clicked() {
    count = count + (clickPower * clickMultiply);
    $("#count").text((Math.trunc(count)).toLocaleString());
    checkUpgrade();
    clickNumber();
    if (i == false) { animateBallFirst(); }
    else { animateBall(); }
}

function clickNumber() {
    clickGain = clickPower * clickMultiply;
    //$("#cNum").text(clickGain); 
}

/***************************************
----------------------------------------
******* Upgrade Functionality **********
----------------------------------------
****************************************/

let upgrades = [];
let passUpgrades = [];

class clickUpgrade {
    constructor(id, cost, inc, clickPwr, name, background, max, pass) {
        this.id = id;
        this.cost = cost,
            this.costInc = inc,
            this.clickPwr = clickPwr,
            this.name = name;
        this.background = background;
        this.max = max;
        this.pass = pass;
    }
    createUpgrade() {
        if (!this.pass) {
            $("#clickUp").append("<div class='upgradeItem' id=" + this.id + "> <h3>" + this.name + "</h3> <p id='cost" + this.id + "'>Cost: " + this.cost + "</p><p id='max" + this.id + "'>Left: " + this.max + "</p></div>");
        }
        else {
            $("#passiveUp").append("<div class='passItem' id=" + this.id + "> <h3>" + this.name + "</h3> <p id='cost" + this.id + "'>Cost: " + this.cost + "</p><p id='max" + this.id + "'>Owned: " + this.max + "</p></div>");
        }
        $("#" + this.id).css("background", this.background);
    }
    upgrade() {
        if (count >= this.cost) {
            count = count - this.cost;
            if (!this.pass) {
                clickPower = clickPower + this.clickPwr;
                $("#pwr").text("Balls per click: " + clickPower);
                this.max--;
                $("#max" + this.id).text("Left: " + this.max);
            }
            else {
                passiveGain = passiveGain + this.clickPwr;
                this.max++;
                $("#max" + this.id).text("Owned: " + this.max);
            }
            this.cost = this.cost + this.costInc;
            $("#count").text((Math.trunc(count)).toLocaleString());
            $("#cost" + this.id).text("Cost: " + this.cost);
            checkUpgrade();
        }
    }

    checkBuy() {
        if (count >= this.cost) {
            $("#" + this.id).css("filter", "none");;
        } else {
            $("#" + this.id).css("background", this.background);
            $("#" + this.id).css("filter", "grayscale(70%)");
        }
    }
};

function checkUpgrade() {
    if (upgradeInc == 0 && count >= 1) {
        upgrades.push(new clickUpgrade("cUp1", 50, 60, 1, "The First One", "orange", 5, false));
        upgrades[0].createUpgrade();
        upgradeInc = 1;
        $("#" + upgrades[0].id).on("click", function () {
            upgrades[0].upgrade();
        });
    } else if (upgradeInc == 1 && count >= 100) {
        upgrades.push(new clickUpgrade("cUp2", 300, 200, 5, "The Second One", "blue", 6, false));
        upgrades[1].createUpgrade();
        upgradeInc = 2;
        $("#" + upgrades[1].id).on("click", function () {
            upgrades[1].upgrade();
        });
    }

    if (upgradePassInc == 0 && count >= 80) {
        passUpgrades.push(new clickUpgrade("pUp1", 100, 25, 0.1, "The First Passive", "green", 0, true));
        passUpgrades[0].createUpgrade();
        upgradePassInc = 1;
        $("#" + passUpgrades[0].id).on("click", function () {
            passUpgrades[0].upgrade();
        });
    }

    for (let clickUpgrade of upgrades) {
        clickUpgrade.checkBuy();
        if (clickUpgrade.max == 0) {
            $("#" + clickUpgrade.id).hide();
            $("#" + clickUpgrade.id).off("click");
        }
    }

    for (let passUpgrade of passUpgrades) {
        passUpgrade.checkBuy();
    }
}

/***************************************
----------------------------------------
******* Achievment Functionality *******
----------------------------------------
****************************************/

class Achievment {
    constructor(id, name, subText, background,) {
        this.id = id;
        this.name = name;
        this.subText = subText;
        this.background = background;
        this.awarded = false;
    }
    createAchievment() {
        $("#achievment").append("<div class='achvItem' id=" + this.id + "> <h3>" + this.name + "</h3> <p id='achv" + this.id + "'>" + this.subText + "</p>");
        $("#" + this.id).css("background", this.background);
    }
    checkCondition() {
        if (count == 1 && this.awarded == false) {
            $("#" + this.id).css("background", "green");
            this.awarded = true;
        } else if (count == 500 && this.awarded == false) {
            $("#" + this.id).css("background", "green");
            this.awarded = true;
        }
    }
};

let achievments = [];

$(document).on("load", function () {
    console.log("achievment created");
    achievments.push(new Achievment("achv1", "First Click", "You clicked your first ball", "orange"));
    for (let achievment of achievments) {
        achievment.createAchievment();
    }
});

function checkAchievment() {
    for (let achievment of achievments) {
        achievment.checkCondition();
    }
}
/*********** Main JQuery Procedure **********/

$("#c").on("click", clicked);