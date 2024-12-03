var count = 0;
var clickMultiply = 1;
var clickPower = 1;
var passiveGain = 0.1;
var cost = 50;
setInterval(passive, 1000);
var achv1 = false;
var i = false;
var upgradeInc = 0;

/***************************************
----------------------------------------
******** Ball Falling Animation ********
----------------------------------------
****************************************/


const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const image = document.getElementById("ballAnimate");
let raf;
let balls = [];
class ball {
    constructor() {
        this.x = 50,
            this.y = 9,
            this.vx = 2,
            this.vy = 3,
            this.radius = 15;
            this.firstBounce = false;
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
            this.y + this.vy > (canvas.height + 5) - this.radius ||
            this.y + this.vy < this.radius

        ) {
            if (this.firstBounce == false) {
            this.vy = -(this.vy / Math.max(Math.random()*2, 0.9));
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
    $("#count").text(Math.trunc(count));
    checkUpgrade();
    $("#passive").text("Balls per second: " + passiveGain);
    checkAchievment();
}

function checkAchievment() {
    if (count == 1 && achv1 == false) {
        $("#achv1").css("background", "green");
        achv1 = true;
    }
}

/***************************************
----------------------------------------
************* Click Functions **********
----------------------------------------
****************************************/

function clicked() {
    count = count + (clickPower * clickMultiply);
    $("#count").text(Math.trunc(count));
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

class clickUpgrade {
    constructor() {
        this.id = "cUp";
        this.cost = 50,
            this.increase = 30,
            this.canBuy = false;
            this.name = "Upgrade 1";
        this.background = "red";
    }
    createUpgrade() {
        $("#clickUp").append("<div class='upgradeItem' id=" + this.id + "> <h3>" + this.name + "</h3> <p id='cost"+ this.id + "'>Cost: " + this.cost + "</p></div>");
        $("#" + this.id).css("background", this.background);
    }
    upgrade() {
        if (count >= this.cost) {
            count = count - this.cost;
            clickPower = clickPower + 1;
            this.cost = this.cost + 30;
            $("#count").text(Math.trunc(count));
            $("#cost" + this.id).text("Cost: " + this.cost);
            checkUpgrade();
        }
    }
    
    checkBuy() {
        if (count >= this.cost) {
            $("#" + this.id).css("background", "green");
        } else {
            $("#" + this.id).css("background", "red");
        }
    }
};

function checkUpgrade() {
    if (upgradeInc == 0 && count >= 1) {
        upgrades.push(new clickUpgrade("cUp1", 50, 30, false, "The First One", "yellow"));
        upgrades[0].createUpgrade();
        upgradeInc = 1;
    } else if (upgradeInc == 1 && count >= 100) {
        upgrades.push(new clickUpgrade("cUp2", 50, 30, false, "The Second One", "yellow"));
        upgrades[1].createUpgrade();
        upgradeInc = 2;
    }

    for (let clickUpgrade of upgrades) {
        clickUpgrade.checkBuy();
    }
}





/*********** Main JQuery Procedure **********/

$("#c").on("click", clicked);
$("#clickUp").on("click", function() {
    if (upgrades.length > 0) {
        $("#" + upgrades[0].id).on("click", upgrades[0].upgrade());
    } else if (upgrades.length > 1) {
        $("#" + upgrades[1].id).on("click", upgrades[1].upgrade());
    }
});