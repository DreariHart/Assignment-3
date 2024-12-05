var count = 0;
var allTimeCount = 0;
var clickMultiply = 1;
var clickPower = 1;
var passiveGain = 0.1;
var clickCount = 0;
var cost = 50;
setInterval(passive, 1000);
var achv1 = false;
var i = false;
var upgradeInc = 0;
var upgradePassInc = 0;
var plural = " balls";

/***************************************
----------------------------------------
******** Ball Falling Animation ********
----------------------------------------
****************************************/


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("ball");
const blue = document.getElementById("blueball");
const green = document.getElementById("greenball");
const pink = document.getElementById("pinkball");
const yellow = document.getElementById("yellowball");
const purple = document.getElementById("purpleball");
const dblue = document.getElementById("dblueball");
const orange = document.getElementById("orangeball");
const lgreen = document.getElementById("lgreenball");

let raf;
let balls = [];
let images = [image, blue, green, pink, yellow, purple, dblue, orange, lgreen];
class ball {
    constructor() {
        this.x = -10,
            this.y = 9,
            this.vx = 2,
            this.vy = 3,
            this.radius = 15;
        this.firstBounce = false;
        this.image = images[Math.floor(Math.random() * images.length)]

    }
    draw() {
        ctx.drawImage(this.image, this.x, this.y, 15, 15);
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
                this.vy = -(this.vy);
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
        if (ball.x > canvas.width + 20) {
            balls.shift();
        }
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
    rise = requestAnimationFrame(clickLoop);
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
    plural = " balls";
    if (Math.trunc(count) == 1) {plural = " ball";}
    count = count + passiveGain;
    allTimeCount = allTimeCount + passiveGain;
    $("#count").text((Math.trunc(count)).toLocaleString() + plural);
    checkUpgrade();
    $("#passive").text("Balls per second: " + passiveGain.toFixed(1));
    checkAchievment();
}

/***************************************
----------------------------------------
************* Click Functions **********
----------------------------------------
****************************************/
let rise;
const canvasClick = document.getElementById("canvasClick");
ctxClick = canvasClick.getContext("2d");
let clickNums = [];
var mousex = 0;
var mousey = 0;
var rect = canvasClick.getBoundingClientRect();
var scaleX = canvasClick.width / rect.width;
var scaleY = canvasClick.height / rect.height;


function clicked() {
    plural = " balls";
    if (Math.trunc(count) == 1) {plural = " ball";}
    count = count + (clickPower * clickMultiply);
    allTimeCount = allTimeCount + (clickPower * clickMultiply);
    $("#count").text((Math.trunc(count)).toLocaleString() + plural);
    checkUpgrade();
    checkAchievment();
    clickCount++;
    if (i == false) {
        animateBallFirst();
        clickAnimate();
    }
    else {
        animateBall();
        clickAnimate();
    }
}

class clickNum {
    constructor(clickGain, x, y) {
        this.x = x;
        this.y = y;
        this.number = clickGain;
        this.counter = 0;
    }
}

function clickAnimate() {
    var x = mousex * scaleX - 5;
    var y = mousey * scaleY;
    clickNums.push(new clickNum((clickPower * clickMultiply), x, y));
}

function clickLoop() {
    ctxClick.clearRect(0, 0, canvasClick.width, canvasClick.height);
    ctxClick.fillStyle = "#0fc71e";
    ctxClick.font = "normal normal bolder 16px cursive";
    for (let clickNum of clickNums) {
        ctxClick.fillText("+" + clickNum.number, clickNum.x, clickNum.y);
        clickNum.y = clickNum.y - 1;
        clickNum.counter++;
        if (clickNum.counter >= 30) {
            clickNums.shift();
        }
    }

    rise = requestAnimationFrame(clickLoop);
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
        $("#" + this.id).css("background-image", this.background);
    }
    upgrade() {
        plural = " balls";
        if (Math.trunc(count) == 1) {plural = " ball"};
        if (count >= this.cost) {
            count = count - this.cost;
            if (!this.pass) {
                if (this.id == "cUp3" || this.id == "cUp4") {
                    clickMultiply = clickMultiply + this.clickPwr;
                } else {
                    clickPower = clickPower + this.clickPwr;
                }
                $("#pwr").text("Balls per click: " + (clickPower * clickMultiply));
                this.max--;
                $("#max" + this.id).text("Left: " + this.max);
            }
            else {
                passiveGain = passiveGain + this.clickPwr;
                this.max++;
                $("#max" + this.id).text("Owned: " + this.max);
                $("#passive").text("Balls per second: " + passiveGain.toFixed(1));
            }
            this.cost = this.cost + this.costInc;
            $("#count").text((Math.trunc(count)).toLocaleString() + plural);
            $("#cost" + this.id).text("Cost: " + this.cost);
            checkUpgrade();
        }
    }

    checkBuy() {
        if (count >= this.cost) {
            $("#" + this.id).css("filter", "none");;
        } else {
            $("#" + this.id).css("background-image", this.background);
            $("#" + this.id).css("filter", "grayscale(90%)");
        }
    }
};

function checkUpgrade() {
    if (upgradeInc == 0 && count >= 1) {
        upgrades.push(new clickUpgrade("cUp1", 50, 60, 1, "Click Power + 1", "url('./imgs/click.png')", 5, false));
        upgrades[0].createUpgrade();    
        upgradeInc = 1;
        $("#" + upgrades[0].id).on("click", function () {
            upgrades[0].upgrade();
        });
    } else if (upgradeInc == 1 && count >= 1) {
        upgrades.push(new clickUpgrade("cUp2", 300, 200, 5, "Click Power + 5", "url('./imgs/click.png')", 6, false));
        upgrades[1].createUpgrade();
        upgradeInc = 2;
        $("#" + upgrades[1].id).on("click", function () {
            upgrades[1].upgrade();
        });
    }
    else if (upgradeInc == 2 && count >= 1) {
        upgrades.push(new clickUpgrade("cUp3", 1000, 1000, 2, "Click Power x2", "url('./imgs/click.png')", 2, false));
        upgrades[2].createUpgrade();
        upgradeInc = 3;
        $("#" + upgrades[2].id).on("click", function () {
            upgrades[2].upgrade();
        });
    }    else if (upgradeInc == 3 && count >= 1) {
        upgrades.push(new clickUpgrade("cUp4", 5000, 0, 5, "Click Power x5", "url('./imgs/click.png')", 1, false));
        upgrades[3].createUpgrade();
        upgradeInc = 4;
        $("#" + upgrades[3].id).on("click", function () {
            upgrades[3].upgrade();
        });
    }

    if (upgradePassInc == 0 && count >= 1) {
        passUpgrades.push(new clickUpgrade("pUp1", 15, 20, 0.1, "Toystore", "url(./imgs/Toystore.png)", 0, true));
        passUpgrades[0].createUpgrade();
        upgradePassInc = 1;
        $("#" + passUpgrades[0].id).on("click", function () {
            passUpgrades[0].upgrade();
        });
    } else if (upgradePassInc == 1 && count >= 1) {
        passUpgrades.push(new clickUpgrade("pUp2", 100, 125, 1, "Ball Pit", "url(./imgs/Ballpit.png)", 0, true));
        passUpgrades[1].createUpgrade();
        upgradePassInc = 2;
        $("#" + passUpgrades[1].id).on("click", function () {
            passUpgrades[1].upgrade();
        });
    } else if (upgradePassInc == 2 && count >= 1) {
        passUpgrades.push(new clickUpgrade("pUp3", 500, 250, 5, "Ball Factory", "url(./imgs/ballfactory.png)", 0, true));
        passUpgrades[2].createUpgrade();
        upgradePassInc = 3;
        $("#" + passUpgrades[2].id).on("click", function () {
            passUpgrades[2].upgrade();
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
        $("#achvmnt").append("<div class='achvItem' id=" + this.id + "> <h3>" + this.name + "</h3> <p id='achv" + this.id + "'>" + this.subText + "</p>");
        $("#" + this.id).css("background-image", this.background);
        $("#" + this.id).css("filter", "grayscale(100%)");
    }
    checkCondition() {
        if (clickCount >= 1 && this.id == 'achv1' && this.awarded == false) {
            $("#" + this.id).css("filter", "none");
            this.awarded = true;
        } else if (count >= 500 && this.id == 'achv2' && this.awarded == false) {
            $("#" + this.id).css("filter", "none");
            this.awarded = true;
        } else if (clickCount >= 500 && this.id == 'achv3' && this.awarded == false) {
            $("#" + this.id).css("filter", "none");
            this.awarded = true;
        } else if (count >= 50000 && this.id == 'achv4' && this.awarded == false) {
            $("#" + this.id).css("filter", "none");
            this.awarded = true;
        } else if (passUpgrades[0].max >= 10 && this.id == 'achv5' && this.awarded == false) {
            $("#" + this.id).css("filter", "none");
            this.awarded = true;
        }  else if (passiveGain >= 10 && this.id == 'achv6' && this.awarded == false) {
            $("#" + this.id).css("filter", "none");
            this.awarded = true;
        }
    }
};

let achievments = [];

achievments.push(new Achievment("achv1", "First Click", "Click your first ball", "url('./imgs/blueball.svg')"));
achievments.push(new Achievment("achv2", "Ball Pit", "Have 500 balls", "url('./imgs/greenball.svg')"));
achievments.push(new Achievment("achv3", "Crazy Clicker", "Click the ball 500 times", "url('./imgs/purpleball.svg')"));
achievments.push(new Achievment("achv4", "Legendary Baller", "Have 50,000 balls", "url('./imgs/pinkball.svg')"));
achievments.push(new Achievment("achv5", "Corporation", "Own 10 Toy Stores", "url('./imgs/yellowball.svg')"));
achievments.push(new Achievment("achv6", "Idle Bouncing", "Generate 10 balls per second", "url('./imgs/ball.svg')"));

for (let achievment of achievments) {
    achievment.createAchievment();
}

function checkAchievment() {
    for (let achievment of achievments) {
        achievment.checkCondition();
    }
}
/*********** Main JQuery Procedure **********/
$(document).on("mousemove", function( event ) {
    mousex = event.pageX;
    mousey = event.pageY;
  });
$("#c").on("click", clicked);
$("#c").on("mousedown", function(){
    $("#mainball").animate({
        width: "-=2%",
    }, 10);
});
$("#c").on("mouseup", function(){
    $("#mainball").animate({
        width: "+=2%"
    }, 10);
});