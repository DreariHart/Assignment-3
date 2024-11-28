var count = 0;
var clickMultiply = 1;
var clickPower = 1;
var passiveGain = 0.1;
var cost = 50;
setInterval(passive, 1000);

function passive() {
    count = count + passiveGain;
    $("#count").text(Math.trunc(count));
    checkUpgrade();
    //$("#passiveGain").text(passiveGain);
}

function checkUpgrade() {
    if (count >= cost) {
        $("#upgrade1").css("background", "green");
    } else {
        $("#upgrade1").css("background", "red");
    }
}

function clicked() {
    count = count + (clickPower * clickMultiply);
    $("#count").text(Math.trunc(count));
    checkUpgrade();
}

function upgrade() {
    if (count >= cost) {
        count = count - cost;
        clickPower = clickPower + 1;
        cost = cost + 30;
        $("#count").text(Math.trunc(count));
        $("#cost1").text(cost);
        checkUpgrade();
        //$("#clickPower").text(clickPower);
    }
}
$("#c").on("click", clicked);
$("#upgrade1").on("click", upgrade);

