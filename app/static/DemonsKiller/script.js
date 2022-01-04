let startPopup = document.getElementById("startPopup");
let moveStartPopupRate = 14;
let moveStartPopupBy = 0;
let timeBetweenReturns;
let saveTriesNumber = 3;
let firstShowDemonVar1 = 0;

let rateOfChanging = 0;
let limitDemon = 0;
let gameOverVal = 0;
let demonKilled1;
let demonKilled2;
let demonKilled3;
let demonKilled4;
let demonKilled5;
let demonKilled6;
let demonKilled7;
let demonKilled8;
let demonKilled9;

let rechangeToHumanVar1;
let rechangeToHumanVar2;
let rechangeToHumanVar3;
let rechangeToHumanVar4;
let rechangeToHumanVar5;
let rechangeToHumanVar6;
let rechangeToHumanVar7;
let rechangeToHumanVar8;
let rechangeToHumanVar9;
let human;
let heart;
let rateOfChangingHeart;

let dontPause = 0;
let pausePressedVal = 0;
let dontCountPointsVal = 0;


function startPressed() {
    document.getElementById("tries").innerText--;
    document.getElementById("tries").innerText++;
    let stopMoveStartPopupVar = setInterval(moveStartPopup, 15);
    waitToStart();
    setTimeout(() => { firstShowDemon(); }, 2000);
    timeChnager();


    function moveStartPopup() {

        if (moveStartPopupRate > screen.height) {
            stopMoveStartPopup();
            return;
        } else {
            moveStartPopupRate = moveStartPopupRate + moveStartPopupBy;
            startPopup.style.top = moveStartPopupRate + "%";
            moveStartPopupBy += 2;
        }
    }

    function stopMoveStartPopup() {
        clearInterval(stopMoveStartPopupVar)
    }
    setTimeout(function() { document.getElementById("startPopup").style.display = "none"; }, 1000)
}


function opnPopupInfo() {
    document.getElementById("popupInfo").style.display = "inline-block";
}

function opnPopupSettings() {
    document.getElementById("popupSettings").style.display = "inline-block";
}


function opnPopupExplain() {
    document.getElementById("popupExplain").style.display = "inline-block";
}




function clsPopupInfo() {
    document.getElementById("popupInfo").style.display = "none";
}

function clsPopupSettings() {
    document.getElementById("popupSettings").style.display = "none";
}


function clsPopupExplain() {
    document.getElementById("popupExplain").style.display = "none";
}



function openArPage() {
    window.location.assign("/demonskiller/ar")
}

function openEnPage() {
    window.location.assign("/demonskiller/en")
}


function waitToStart() {
    setTimeout(() => { document.getElementById("readyMsg").style.display = "block"; }, 200);
    setTimeout(() => {
        document.getElementById("readyMsg").style.display = "none";
        document.getElementById("goMsg").style.display = "block";
    }, 1050);
    setTimeout(() => {
        dontPause = 1;
        document.getElementById("goMsg").style.display = "none";
    }, 1900);
}


function pausePressing() {
    if (dontPause == 0) { return; } else {
        dontPause = 0;
        pausePressedVal = 1;
        dontCountPointsVal = 1;
        document.getElementById("thing1").style.display = "none";
        document.getElementById("thing2").style.display = "none";
        document.getElementById("thing3").style.display = "none";
        document.getElementById("thing4").style.display = "none";
        document.getElementById("thing5").style.display = "none";
        document.getElementById("thing6").style.display = "none";
        document.getElementById("thing7").style.display = "none";
        document.getElementById("thing8").style.display = "none";
        document.getElementById("thing9").style.display = "none";
        document.getElementById("pausePopup").style.display = "block";
    }
}

function continuePressing() {
    pausePressedVal = 0;
    dontCountPointsVal = 0;
    document.getElementById("pausePopup").style.display = "none";

    setTimeout(() => { document.getElementById("readyMsg").style.display = "block"; }, 200);
    setTimeout(() => {
        document.getElementById("readyMsg").style.display = "none";
        document.getElementById("goMsg").style.display = "block";
    }, 1050);
    setTimeout(() => { document.getElementById("goMsg").style.display = "none"; }, 1900);
    setTimeout(() => {
        dontPause = 1;
        firstShowDemon();
    }, 2000);


}



function firstShowDemon(notShowDemonVar) {

    if (gameOverVal == 1) { dontPause = 0; return; } else {
        do {
            firstShowDemonVar1 = Math.floor(Math.random() * 9) + 1;
        } while ((firstShowDemonVar1 == notShowDemonVar)); { if (pausePressedVal == 1) { return; } if (pausePressedVal == 0) {} }
        if (firstShowDemonVar1 == 1) {
            { if (pausePressedVal == 1) { return; } if (pausePressedVal == 0) {} }
            changeToHuman(firstShowDemonVar1);
            if (pausePressedVal == 1) { return; }
            document.getElementById("thing1").style.display = "block";
            demonKilled1 = 0;
            setTimeout(function() {
                if (demonKilled1 == 0) {
                    if (document.getElementById("thing1").innerText == '👹') { human = 0; } else { human = 1; }
                    document.getElementById("thing1").style.display = "none";
                    changeOfPoints(demonKilled1, rechangeToHumanVar1);
                    gameOver();
                    rechangeToDemon(rechangeToHumanVar1, firstShowDemonVar1);
                    firstShowDemon(1);
                }
            }, timeBetweenReturns);
        }
        if (firstShowDemonVar1 == 2) {
            { if (pausePressedVal == 1) { return; } if (pausePressedVal == 0) {} }
            changeToHuman(firstShowDemonVar1);
            if (pausePressedVal == 1) { return; }
            document.getElementById("thing2").style.display = "block";
            demonKilled2 = 0;
            setTimeout(function() {
                if (demonKilled2 == 0) {
                    if (document.getElementById("thing2").innerText == '👹') { human = 0; } else { human = 1; }
                    document.getElementById("thing2").style.display = "none";
                    changeOfPoints(demonKilled2, rechangeToHumanVar2);
                    gameOver();
                    rechangeToDemon(rechangeToHumanVar2, firstShowDemonVar1);
                    firstShowDemon(2);
                }
            }, timeBetweenReturns);
        }
        if (firstShowDemonVar1 == 3) {
            { if (pausePressedVal == 1) { return; } if (pausePressedVal == 0) {} }
            changeToHuman(firstShowDemonVar1);
            if (pausePressedVal == 1) { return; }
            document.getElementById("thing3").style.display = "block";
            demonKilled3 = 0;
            setTimeout(function() {
                if (demonKilled3 == 0) {
                    if (document.getElementById("thing3").innerText == '👹') { human = 0; } else { human = 1; }
                    document.getElementById("thing3").style.display = "none";
                    changeOfPoints(demonKilled3, rechangeToHumanVar3);
                    gameOver();
                    rechangeToDemon(rechangeToHumanVar3, firstShowDemonVar1);
                    firstShowDemon(3);
                }
            }, timeBetweenReturns);
        }
        if (firstShowDemonVar1 == 4) {
            { if (pausePressedVal == 1) { return; } if (pausePressedVal == 0) {} }
            changeToHuman(firstShowDemonVar1);
            if (pausePressedVal == 1) { return; }
            document.getElementById("thing4").style.display = "block";
            demonKilled4 = 0;
            setTimeout(function() {
                if (demonKilled4 == 0) {
                    if (document.getElementById("thing4").innerText == '👹') { human = 0; } else { human = 1; }
                    document.getElementById("thing4").style.display = "none";
                    changeOfPoints(demonKilled4, rechangeToHumanVar4);
                    gameOver();
                    rechangeToDemon(rechangeToHumanVar4, firstShowDemonVar1);
                    firstShowDemon(4);
                }
            }, timeBetweenReturns);
        }
        if (firstShowDemonVar1 == 5) {
            { if (pausePressedVal == 1) { return; } if (pausePressedVal == 0) {} }
            changeToHuman(firstShowDemonVar1);
            if (pausePressedVal == 1) { return; }
            document.getElementById("thing5").style.display = "block";
            demonKilled5 = 0;
            setTimeout(function() {
                if (demonKilled5 == 0) {
                    if (document.getElementById("thing5").innerText == '👹') { human = 0; } else { human = 1; }
                    document.getElementById("thing5").style.display = "none";
                    changeOfPoints(demonKilled5, rechangeToHumanVar5);
                    gameOver();
                    rechangeToDemon(rechangeToHumanVar5, firstShowDemonVar1);
                    firstShowDemon(5);
                }
            }, timeBetweenReturns);
        }
        if (firstShowDemonVar1 == 6) {
            { if (pausePressedVal == 1) { return; } if (pausePressedVal == 0) {} }
            changeToHuman(firstShowDemonVar1);
            if (pausePressedVal == 1) { return; }
            document.getElementById("thing6").style.display = "block";
            demonKilled6 = 0;
            setTimeout(function() {
                if (demonKilled6 == 0) {
                    if (document.getElementById("thing6").innerText == '👹') { human = 0; } else { human = 1; }
                    document.getElementById("thing6").style.display = "none";
                    changeOfPoints(demonKilled6, rechangeToHumanVar6);
                    gameOver();
                    rechangeToDemon(rechangeToHumanVar6, firstShowDemonVar1);
                    firstShowDemon(6);
                }
            }, timeBetweenReturns);
        }
        if (firstShowDemonVar1 == 7) {
            { if (pausePressedVal == 1) { return; } if (pausePressedVal == 0) {} }
            changeToHuman(firstShowDemonVar1);
            if (pausePressedVal == 1) { return; }
            document.getElementById("thing7").style.display = "block";
            demonKilled7 = 0;
            setTimeout(function() {
                if (demonKilled7 == 0) {
                    if (document.getElementById("thing7").innerText == '👹') { human = 0; } else { human = 1; }
                    document.getElementById("thing7").style.display = "none";
                    changeOfPoints(demonKilled7, rechangeToHumanVar7);
                    gameOver();
                    rechangeToDemon(rechangeToHumanVar7, firstShowDemonVar1);
                    firstShowDemon(7);
                }
            }, timeBetweenReturns);
        }
        if (firstShowDemonVar1 == 8) {
            { if (pausePressedVal == 1) { return; } if (pausePressedVal == 0) {} }
            changeToHuman(firstShowDemonVar1);
            if (pausePressedVal == 1) { return; }
            document.getElementById("thing8").style.display = "block";
            demonKilled8 = 0;
            setTimeout(function() {
                if (demonKilled8 == 0) {
                    if (document.getElementById("thing8").innerText == '👹') { human = 0; } else { human = 1; }
                    document.getElementById("thing8").style.display = "none";
                    changeOfPoints(demonKilled8, rechangeToHumanVar8);
                    gameOver();
                    rechangeToDemon(rechangeToHumanVar8, firstShowDemonVar1);
                    firstShowDemon(8);
                }
            }, timeBetweenReturns);
        }
        if (firstShowDemonVar1 == 9) {
            { if (pausePressedVal == 1) { return; } if (pausePressedVal == 0) {} }
            changeToHuman(firstShowDemonVar1);
            if (pausePressedVal == 1) { return; }
            document.getElementById("thing9").style.display = "block";
            demonKilled9 = 0;
            setTimeout(function() {
                if (demonKilled9 == 0) {
                    if (document.getElementById("thing9").innerText == '👹') { human = 0; } else { human = 1; }
                    document.getElementById("thing9").style.display = "none";
                    changeOfPoints(demonKilled9, rechangeToHumanVar9);
                    gameOver();
                    rechangeToDemon(rechangeToHumanVar9, firstShowDemonVar1);
                    firstShowDemon(9);
                }
            }, timeBetweenReturns);
        }
    }
}

function demonSelector1() {
    if (document.getElementById("thing1").innerText == '👹') {
        human = 0;
        heart = 0;
    } else if (document.getElementById("thing1").innerText == '♥') { heart = 1; } else { human = 1; }
    killDemon(1);
    demonKilled1 = 1;
    changeOfPoints(demonKilled1, rechangeToHumanVar1);
    gameOver();
    timeChnager();
}

function demonSelector2() {
    if (document.getElementById("thing2").innerText == '👹') {
        human = 0;
        heart = 0;
    } else if (document.getElementById("thing2").innerText == '♥') { heart = 1; } else { human = 1; }
    killDemon(2);
    demonKilled2 = 1;
    changeOfPoints(demonKilled2, rechangeToHumanVar2);
    gameOver();
    timeChnager();
}

function demonSelector3() {
    if (document.getElementById("thing3").innerText == '👹') {
        human = 0;
        heart = 0;
    } else if (document.getElementById("thing3").innerText == '♥') { heart = 1; } else { human = 1; }
    killDemon(3);
    demonKilled3 = 1;
    changeOfPoints(demonKilled3, rechangeToHumanVar3);
    gameOver();
    timeChnager();
}

function demonSelector4() {
    if (document.getElementById("thing4").innerText == '👹') {
        human = 0;
        heart = 0;
    } else if (document.getElementById("thing4").innerText == '♥') { heart = 1; } else { human = 1; }
    killDemon(4);
    demonKilled4 = 1;
    changeOfPoints(demonKilled4, rechangeToHumanVar4);
    gameOver();
    timeChnager();
}

function demonSelector5() {
    if (document.getElementById("thing5").innerText == '👹') {
        human = 0;
        heart = 0;
    } else if (document.getElementById("thing5").innerText == '♥') { heart = 1; } else { human = 1; }
    killDemon(5);
    demonKilled5 = 1;
    changeOfPoints(demonKilled5, rechangeToHumanVar5);
    gameOver();
    timeChnager();
}

function demonSelector6() {
    if (document.getElementById("thing6").innerText == '👹') {
        human = 0;
        heart = 0;
    } else if (document.getElementById("thing6").innerText == '♥') { heart = 1; } else { human = 1; }
    killDemon(6);
    demonKilled6 = 1;
    changeOfPoints(demonKilled6, rechangeToHumanVar6);
    gameOver();
    timeChnager();
}

function demonSelector7() {
    if (document.getElementById("thing7").innerText == '👹') {
        human = 0;
        heart = 0;
    } else if (document.getElementById("thing7").innerText == '♥') { heart = 1; } else { human = 1; }
    killDemon(7);
    demonKilled7 = 1;
    changeOfPoints(demonKilled7, rechangeToHumanVar7);
    gameOver();
    timeChnager();
}

function demonSelector8() {
    if (document.getElementById("thing8").innerText == '👹') {
        human = 0;
        heart = 0;
    } else if (document.getElementById("thing8").innerText == '♥') { heart = 1; } else { human = 1; }
    killDemon(8);
    demonKilled8 = 1;
    changeOfPoints(demonKilled8, rechangeToHumanVar8);
    gameOver();
    timeChnager();
}

function demonSelector9() {
    if (document.getElementById("thing9").innerText == '👹') {
        human = 0;
        heart = 0;
    } else if (document.getElementById("thing9").innerText == '♥') { heart = 1; } else { human = 1; }
    killDemon(9);
    demonKilled9 = 1;
    changeOfPoints(demonKilled9, rechangeToHumanVar9);
    gameOver();
    timeChnager();
}

function killDemon(demonSelectorVar) {


    if (demonSelectorVar == 1) {
        document.getElementById("thing1").style.display = "none";
        returnDemon(1);
    }
    if (demonSelectorVar == 2) {
        document.getElementById("thing2").style.display = "none";
        returnDemon(2);
    }
    if (demonSelectorVar == 3) {
        document.getElementById("thing3").style.display = "none";
        returnDemon(3);
    }
    if (demonSelectorVar == 4) {
        document.getElementById("thing4").style.display = "none";
        returnDemon(4);
    }
    if (demonSelectorVar == 5) {
        document.getElementById("thing5").style.display = "none";
        returnDemon(5);
    }
    if (demonSelectorVar == 6) {
        document.getElementById("thing6").style.display = "none";
        returnDemon(6);
    }
    if (demonSelectorVar == 7) {
        document.getElementById("thing7").style.display = "none";
        returnDemon(7);
    }
    if (demonSelectorVar == 8) {
        document.getElementById("thing8").style.display = "none";
        returnDemon(8);
    }
    if (demonSelectorVar == 9) {
        document.getElementById("thing9").style.display = "none";
        returnDemon(9);
    }


}



function changeToHuman(firstShowDemonVar1) {
    if ((Math.floor(Math.random() * rateOfChanging) + 1) == 1) {
        if (firstShowDemonVar1 == 1) {
            if ((Math.floor(Math.random() * rateOfChangingHeart) + 1) == 1) { document.getElementById("thing1").innerText = "♥"; } else { document.getElementById("thing1").innerText = "👩"; }
            rechangeToHumanVar1 = 1;
        }
        if (firstShowDemonVar1 == 2) {
            if ((Math.floor(Math.random() * rateOfChangingHeart) + 1) == 1) { document.getElementById("thing2").innerText = "♥"; } else { document.getElementById("thing2").innerText = "👨"; }
            rechangeToHumanVar2 = 1;
        }
        if (firstShowDemonVar1 == 3) {
            if ((Math.floor(Math.random() * rateOfChangingHeart) + 1) == 1) { document.getElementById("thing3").innerText = "♥"; } else { document.getElementById("thing3").innerText = "👵"; }
            rechangeToHumanVar3 = 1;
        }
        if (firstShowDemonVar1 == 4) {
            if ((Math.floor(Math.random() * rateOfChangingHeart) + 1) == 1) { document.getElementById("thing4").innerText = "♥"; } else { document.getElementById("thing4").innerText = "👩‍🦱"; }
            rechangeToHumanVar4 = 1;
        }
        if (firstShowDemonVar1 == 5) {
            if ((Math.floor(Math.random() * rateOfChangingHeart) + 1) == 1) { document.getElementById("thing5").innerText = "♥"; } else { document.getElementById("thing5").innerText = "🧕"; }
            rechangeToHumanVar5 = 1;
        }
        if (firstShowDemonVar1 == 6) {
            if ((Math.floor(Math.random() * rateOfChangingHeart) + 1) == 1) { document.getElementById("thing6").innerText = "♥"; } else { document.getElementById("thing6").innerText = "👴"; }
            rechangeToHumanVar6 = 1;
        }
        if (firstShowDemonVar1 == 7) {
            if ((Math.floor(Math.random() * rateOfChangingHeart) + 1) == 1) { document.getElementById("thing7").innerText = "♥"; } else { document.getElementById("thing7").innerText = "👱‍♂️"; }
            rechangeToHumanVar7 = 1;
        }
        if (firstShowDemonVar1 == 8) {
            if ((Math.floor(Math.random() * rateOfChangingHeart) + 1) == 1) { document.getElementById("thing8").innerText = "♥"; } else { document.getElementById("thing8").innerText = "👶"; }
            rechangeToHumanVar8 = 1;
        }
        if (firstShowDemonVar1 == 9) {
            if ((Math.floor(Math.random() * rateOfChangingHeart) + 1) == 1) { document.getElementById("thing9").innerText = "♥"; } else { document.getElementById("thing9").innerText = "👧"; }
            rechangeToHumanVar9 = 1;
        }
    } else {
        rechangeToHumanVar1 == 0;
        rechangeToHumanVar2 == 0;
        rechangeToHumanVar3 == 0;
        rechangeToHumanVar4 == 0;
        rechangeToHumanVar5 == 0;
        rechangeToHumanVar6 == 0;
        rechangeToHumanVar7 == 0;
        rechangeToHumanVar8 == 0;
        rechangeToHumanVar9 == 0;

    }


}


function rechangeToDemon(rechangeToHumanVar, firstShowDemonVar1) {

    if (rechangeToHumanVar == 1) {
        if (firstShowDemonVar1 == 1) {
            document.getElementById("thing1").innerText = "👹";
            rechangeToHumanVar = 0;
        }
        if (firstShowDemonVar1 == 2) {
            document.getElementById("thing2").innerText = "👹";
            rechangeToHumanVar = 0;
        }
        if (firstShowDemonVar1 == 3) {
            document.getElementById("thing3").innerText = "👹";
            rechangeToHumanVar = 0;
        }
        if (firstShowDemonVar1 == 4) {
            document.getElementById("thing4").innerText = "👹";
            rechangeToHumanVar = 0;
        }
        if (firstShowDemonVar1 == 5) {
            document.getElementById("thing5").innerText = "👹";
            rechangeToHumanVar = 0;
        }
        if (firstShowDemonVar1 == 6) {
            document.getElementById("thing6").innerText = "👹";
            rechangeToHumanVar = 0;
        }
        if (firstShowDemonVar1 == 7) {
            document.getElementById("thing7").innerText = "👹";
            rechangeToHumanVar = 0;
        }
        if (firstShowDemonVar1 == 8) {
            document.getElementById("thing8").innerText = "👹";
            rechangeToHumanVar = 0;
        }
        if (firstShowDemonVar1 == 9) {
            document.getElementById("thing9").innerText = "👹";
            rechangeToHumanVar = 0;
        }
    } else {
        return;
    }
}

function changeOfPoints(demonKilled, rechangeToHumanVar) {
    if (dontCountPointsVal == 0) {
        if (demonKilled == 1 && human == 1) {
            document.getElementById("tries").innerText--;
        }
        if (demonKilled == 0 && human == 1) {
            return;
        }
        if (demonKilled == 1 && human == 0 && heart == 0) {
            document.getElementById("score").innerText++;
        }
        if (demonKilled == 0 && human == 0) {
            document.getElementById("tries").innerText--;
        }
        if (demonKilled == 0 && heart == 1) {
            return;
        }
        if (demonKilled == 1 && heart == 1) {
            document.getElementById("tries").innerText++;
        }
    } else {
        return;
    }
}




function returnDemon(demonSelectorVar) {

    if (demonSelectorVar == 1) { setTimeout(() => { firstShowDemon(1); return; }, timeBetweenReturns / 2) }
    if (demonSelectorVar == 2) { setTimeout(() => { firstShowDemon(2); return; }, timeBetweenReturns / 2) }
    if (demonSelectorVar == 3) { setTimeout(() => { firstShowDemon(3); return; }, timeBetweenReturns / 2) }
    if (demonSelectorVar == 4) { setTimeout(() => { firstShowDemon(4); return; }, timeBetweenReturns / 2) }
    if (demonSelectorVar == 5) { setTimeout(() => { firstShowDemon(5); return; }, timeBetweenReturns / 2) }
    if (demonSelectorVar == 6) { setTimeout(() => { firstShowDemon(6); return; }, timeBetweenReturns / 2) }
    if (demonSelectorVar == 7) { setTimeout(() => { firstShowDemon(7); return; }, timeBetweenReturns / 2) }
    if (demonSelectorVar == 8) { setTimeout(() => { firstShowDemon(8); return; }, timeBetweenReturns / 2) }
    if (demonSelectorVar == 9) { setTimeout(() => { firstShowDemon(9); return; }, timeBetweenReturns / 2) }


}


function timeChnager() {

    if (document.getElementById("score").innerText == 0) {
        timeBetweenReturns = 1000;
        rateOfChanging = 7;
        rateOfChangingHeart = 2;
    }
    if (document.getElementById("score").innerText == 5) {
        timeBetweenReturns = 975;
        rateOfChanging = 6;
        rateOfChangingHeart = 3;
    }
    if (document.getElementById("score").innerText == 10) {
        timeBetweenReturns = 950;
        rateOfChanging = 6;
        rateOfChangingHeart = 10;
    }
    if (document.getElementById("score").innerText == 15) {
        timeBetweenReturns = 925;
        rateOfChanging = 6;
        rateOfChangingHeart = 10;
    }
    if (document.getElementById("score").innerText == 20) {
        timeBetweenReturns = 900;
        rateOfChanging = 5;
        rateOfChangingHeart = 10;
    }
    if (document.getElementById("score").innerText == 25) {
        timeBetweenReturns = 875;
        rateOfChanging = 5;
        rateOfChangingHeart = 10;
    }
    if (document.getElementById("score").innerText == 30) {
        timeBetweenReturns = 850;
        rateOfChanging = 4;
        rateOfChangingHeart = 3;
    }
    if (document.getElementById("score").innerText == 35) {
        timeBetweenReturns = 800;
        rateOfChanging = 4;
        rateOfChangingHeart = 10;
    }
    if (document.getElementById("score").innerText == 40) {
        timeBetweenReturns = 700;
        rateOfChanging = 4;
        rateOfChangingHeart = 10;
    }
    if (document.getElementById("score").innerText == 45) {
        timeBetweenReturns = 600;
        rateOfChanging = 4;
        rateOfChangingHeart = 10;
    }
    if (document.getElementById("score").innerText == 50) {
        timeBetweenReturns = 600;
        rateOfChanging = 5;
        rateOfChangingHeart = 3;
    }
    if (document.getElementById("score").innerText == 60) {
        timeBetweenReturns = 600;
        rateOfChanging = 5;
        rateOfChangingHeart = 10;
    }
    if (document.getElementById("score").innerText == 80) {
        timeBetweenReturns = 600;
        rateOfChanging = 5;
        rateOfChangingHeart = 10;
    }
    if (document.getElementById("score").innerText == 90) {
        timeBetweenReturns = 600;
        rateOfChanging = 5;
        rateOfChangingHeart = 10;
    }
    if (document.getElementById("score").innerText == 100) {
        timeBetweenReturns = 500;
        rateOfChanging = 5;
        rateOfChangingHeart = 10;
    } else { return; }
}

function gameOver() {
    let tries = document.getElementById("tries").innerText;
    if (tries == 0) {
        dontPause = 0;
        document.getElementById("losingPopup").style.display = "block";
        document.getElementById("showScore").innerText = document.getElementById("score").innerText;
        gameOverVal = 1;
        document.getElementById("tries").innerText = saveTriesNumber;
    }
}

function changeTriesNumber() {

    if (document.getElementById("triesInput").value == '') { return; }

    document.getElementById("tries").innerText = document.getElementById("triesInput").value;
    saveTriesNumber = document.getElementById("triesInput").value;
    document.getElementById("triesInput").value = '';
    document.getElementById("popupSettings").style.display = "none";
}

document.getElementById("startBtn").addEventListener("click", function() {
    startPressed();
});

document.getElementById("infoBtn").addEventListener("click", function() {
    opnPopupInfo();
});

document.getElementById("expainBtn").addEventListener("click", function() {
    opnPopupExplain();
});

document.getElementById("settingsBtn").addEventListener("click", function() {
    opnPopupSettings();
});

document.getElementById("popupInfoCloseBtn").addEventListener("click", function() {
    clsPopupInfo();
});

document.getElementById("popupSettingsCloseBtn").addEventListener("click", function() {
    clsPopupSettings();
});

document.getElementById("popupExplainCloseBtn").addEventListener("click", function() {
    clsPopupExplain();
});

document.getElementById("ar").addEventListener("click", function() {
    openArPage();
});
document.getElementById("en").addEventListener("click", function() {
    openEnPage();
});

document.getElementById("thing1").addEventListener("click", function() {
    demonSelector1();
});
document.getElementById("thing2").addEventListener("click", function() {
    demonSelector2();
});
document.getElementById("thing3").addEventListener("click", function() {
    demonSelector3();
});
document.getElementById("thing4").addEventListener("click", function() {
    demonSelector4();
});
document.getElementById("thing5").addEventListener("click", function() {
    demonSelector5();
});
document.getElementById("thing6").addEventListener("click", function() {
    demonSelector6();
});
document.getElementById("thing7").addEventListener("click", function() {
    demonSelector7();
});
document.getElementById("thing8").addEventListener("click", function() {
    demonSelector8();
});
document.getElementById("thing9").addEventListener("click", function() {
    demonSelector9();
});

document.getElementById("setBtn").addEventListener("click", function() {
    changeTriesNumber();
});