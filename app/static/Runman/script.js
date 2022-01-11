let player = document.getElementById("player");
let obstacle = document.getElementById("obstacle");
let obstacle2 = document.getElementById("obstacle2");
let coins = document.getElementById("coins");
let score = document.getElementById("score");
let sun = document.getElementById("sun");
let moon = document.getElementById("moon");
let sky = document.getElementById("above");
let sky2 = document.getElementById("innerBody");
let cloud = document.getElementById("cloud");
let kill = 0;
let numberOfObstaclesIncluded = 3;
var chooseObstacleInterval;
let notRepeatedClickKill = 0;
let allowRestart = 0;
let allowStart = 1;
let allowMenuExitS = 0;
let IsGameStarted = 0;
let notRepeated = 1;
let isDead = 0;
let dayAnimationVal = 0;
let allowJumpHitSound = 0;
let dontRepeatChoic = 0;
let choosingVariable = 10;
let MusicOn = 1;
let VoiceOn = 1;
let songPlayVal;
let oldCoins = 0;
let oldTime = 0;
let currentCoins;
let currentTime;
let topOfCoinsChanger;
let coinsRemove;
let obstacleRemove;
let nickname;
let nameStat = 'unknown name';
let order = 2;
let screenSize;

function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function() {
        this.sound.play();
    }
    this.stop = function() {
        this.sound.pause();
    }
}

function playOrStop(sound, VoiceOn) {
    if (VoiceOn == 1) {
        sound.play();
    } else if (VoiceOn == 0) {
        sound.stop();
    }
}


let hitS = new sound("../../static/Runman/sound/hit.wav");
let coinS = new sound("../../static/Runman/sound/coin.wav");
let songS = new sound("../../static/Runman/sound/song_hmmm101.wav");
let jumpS = new sound("../../static/Runman/sound/jump.wav");
let losingS = new sound("../../static/Runman/sound/losing.wav");
let hurtS = new sound("../../static/Runman/sound/hurt.wav");
let menuS = new sound("../../static/Runman/sound/menu.wav")
let menuExitS = new sound("../../static/Runman/sound/menuExit.wav")
let startS = new sound("../../static/Runman/sound/start.wav");



/////////////////////////////jump
function jump() {
    if (player.classList == "jump") { return }
    if (currentDiff == 'easy') {
        if (player.classList == "longJump") { return }
    }

    player.classList.remove("walking");
    if (currentDiff == 'easy') {
        player.classList.add("longJump");
    } else {
        player.classList.add("jump");
    }

    playOrStop(jumpS, VoiceOn);


    if (IsGameStarted == 1) {

        if (currentDiff == 'easy') {
            setTimeout(() => {
                player.classList.remove("longJump");
                player.classList.add("walking");
            }, 885);
        } else {
            setTimeout(() => {
                player.classList.remove("jump");
                player.classList.add("walking");
            }, 585);
        }


    } else {
        if (currentDiff == 'easy') {
            setTimeout(() => {
                player.classList.remove("longJump");
            }, 885);
        } else {
            setTimeout(() => {
                player.classList.remove("jump");
            }, 585);
        }
    }
}


document.getElementById("jumpBtn").addEventListener("click", function() {
    if (allowJumpHitSound == 1) {
        jump();
    }
});



window.addEventListener("keydown", checkKeyPress);


function checkKeyPress(key) {
    if (key.code == "Space") {
        console.log(key);
        if (allowJumpHitSound == 1) {
            jump();
        }

    }
}

var checkDead = setInterval(function() {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    let obstacleLeft = parseInt(window.getComputedStyle(obstacle).getPropertyValue("left"));

    if (obstacleLeft < 100 && obstacleLeft > 50 && playerTop >= 370) {


        gameover();
    }


}, 32);

////////////////////////////jump END





////////////////////////////gameover 

window.addEventListener("keyup", checkKeyPress4);


function checkKeyPress4(key) {
    if (key.code == "KeyA") {
        if (dontPressAandS == 0) {
            console.log(key);
            if (allowRestart == 1) {
                location.reload();
            }
        }
    }
}

document.getElementById("replayBtn").addEventListener("click", () => {
    if (allowRestart == 1) {
        location.reload();
    }
});


let dontPressAandS = 0;

function showEnterNNPopup() {
    if (localStorage.nickname == null || localStorage.nickname == undefined) {
        document.getElementById("enterNNPopup").style.display = "block";
        dontPressAandS = 1;
    } else if (localStorage.nickname) {
        nameStat = 'known name'
    }
}

function gameover() {
    allowJumpHitSound = 0;
    clearInterval(chooseObstacleInterval);
    clearTimeout(timer);
    showEnterNNPopup();
    if (nameStat == "known name") {
        countHighestScore()
    }
    player.classList.remove("walking");
    player.classList.add("dying");
    setTimeout(() => {
        player.style.display = "none";
    }, 505);
    playOrStop(losingS, VoiceOn);
    playOrStop(songS, 0);
    document.getElementById("gameoverPopup").style.display = "block";
    allowRestart = 1;
    allowStart = 0;
    isDead = 1;
    obstacle2.style.display = "none";
    obstacle.style.display = "none";




}

////////////////////////////////gameover END

///////////////////////////choosing obstacle
function chooseObstacle() {



    changeSpeed();
    dontRepeatChoic = choosingVariable;
    choosingVariable = Math.floor(Math.random() * numberOfObstaclesIncluded) + 1;
    if (choosingVariable == 2) {
        console.log('obstacle2');
        obstacle.style.display = "none";
        obstacle2.style.display = "block";
        coins.style.display = "none";
        setTimeout(() => {
            obstacle2.style.display = "none";
        }, obstacleRemove);
        setTimeout(() => {
            coins.style.display = "none";
        }, coinsRemove);

    } else if (choosingVariable == 1) {
        console.log('obstacle');
        obstacle2.style.display = "none";
        obstacle.style.display = "block";
        coins.style.display = "none";

        let picPicked = Math.floor(Math.random() * 5) + 1;
        if (picPicked == 1) {
            document.getElementById("obstacle").style.backgroundImage = 'url("../../static/Runman/img/obstacle/1.png")';
        } else if (picPicked == 2) {
            document.getElementById("obstacle").style.backgroundImage = 'url("../../static/Runman/img/obstacle/2.png")';
        } else if (picPicked == 3) {
            document.getElementById("obstacle").style.backgroundImage = 'url("../../static/Runman/img/obstacle/3.png")';
        } else if (picPicked == 4) {
            document.getElementById("obstacle").style.backgroundImage = 'url("../../static/Runman/img/obstacle/4.png")';
        } else if (picPicked == 5) {
            document.getElementById("obstacle").style.backgroundImage = 'url("../../static/Runman/img/obstacle/5.png")';
        }
        setTimeout(() => {
            obstacle.style.display = "none";
        }, obstacleRemove);
        setTimeout(() => {
            coins.style.display = "none";
        }, coinsRemove);

    } else if (choosingVariable == 3) {
        if (dontRepeatChoic == choosingVariable) { return; }
        console.log('coins');
        obstacle.style.display = "none";
        obstacle2.style.display = "none";

        topOfCoinsChanger = Math.floor(Math.random() * 2) + 1;
        if (topOfCoinsChanger == 1) {
            coins.style.top = "360px";
        } else { coins.style.top = "280px"; }
        coins.style.display = "block";
        setTimeout(() => {
            obstacle.style.display = "none";
        }, obstacleRemove);
        setTimeout(() => {
            coins.style.display = "none";
        }, coinsRemove);
    }
}

///////////////////////////choosing obstacle END

/////////////////////////// change speed

function changeSpeed() {
    if (document.getElementById("timer").innerText >= 0 && document.getElementById("timer").innerText < 10) {
        coins.classList.add("delyCoin1");
        obstacle.classList.add("delyObstacle1");
        obstacle2.classList.add("delyObstacle21");
        coinsRemove = 1800;
        obstacleRemove = 1800;
    } else if (document.getElementById("timer").innerText >= 10 && document.getElementById("timer").innerText < 20) {
        coins.classList.remove("delyCoin1");
        coins.classList.add("delyCoin2");
        obstacle.classList.remove("delyObstacle1");
        obstacle.classList.add("delyObstacle2");
        obstacle2.classList.remove("delyObstacle21");
        obstacle2.classList.add("delyObstacle22");
        coinsRemove = 1800;
        obstacleRemove = 1800;
    } else if (document.getElementById("timer").innerText >= 20 && document.getElementById("timer").innerText < 30) {
        coins.classList.remove("delyCoin2");
        coins.classList.add("delyCoin3");
        obstacle.classList.remove("delyObstacle2");
        obstacle.classList.add("delyObstacle3");
        obstacle2.classList.remove("delyObstacle22");
        obstacle2.classList.add("delyObstacle23");
        coinsRemove = 1600;
        obstacleRemove = 1600;
    } else if (document.getElementById("timer").innerText >= 30 && document.getElementById("timer").innerText < 40) {
        coins.classList.remove("delyCoin3");
        coins.classList.add("delyCoin4");
        obstacle.classList.remove("delyObstacle3");
        obstacle.classList.add("delyObstacle4");
        obstacle2.classList.remove("delyObstacle23");
        obstacle2.classList.add("delyObstacle24");
        coinsRemove = 1400;
        obstacleRemove = 1400;
    } else if (document.getElementById("timer").innerText >= 40 && document.getElementById("timer").innerText < 50) {
        coins.classList.remove("delyCoin4");
        coins.classList.add("delyCoin5");
        obstacle.classList.remove("delyObstacle4");
        obstacle.classList.add("delyObstacle5");
        obstacle2.classList.remove("delyObstacle24");
        obstacle2.classList.add("delyObstacle25");
        coinsRemove = 1200;
        obstacleRemove = 1200;
    } else if (document.getElementById("timer").innerText >= 50 && document.getElementById("timer").innerText < 60) {
        coins.classList.remove("delyCoin5");
        coins.classList.add("delyCoin6");
        obstacle.classList.remove("delyObstacle5");
        obstacle.classList.add("delyObstacle6");
        obstacle2.classList.remove("delyObstacle25");
        obstacle2.classList.add("delyObstacle26");
        coinsRemove = 1000;
        obstacleRemove = 1000;
    } else if (document.getElementById("timer").innerText >= 60) {
        coins.classList.remove("delyCoin6");
        coins.classList.add("delyCoin7");
        obstacle.classList.remove("delyObstacle6");
        obstacle.classList.add("delyObstacle7");
        obstacle2.classList.remove("delyObstacle26");
        obstacle2.classList.add("delyObstacle27");
        coinsRemove = 800;
        obstacleRemove = 800;
    }
}
/////////////////////////// change speed END

///////////////////////////kill

document.getElementById("hitBtn").addEventListener("click", function() {
    if (notRepeatedClickKill == 0) {
        notRepeatedClickKill = 1;

        setTimeout(() => {
            notRepeatedClickKill = 0;
        }, 666);

        if (isDead == 1) { return; } else {
            if (allowJumpHitSound == 1) {
                player.style.left = "75px";
                playOrStop(hitS, VoiceOn);
                setTimeout(() => {
                    player.style.left = "60px";
                }, 100);
            }
        }

        let obstacle2Left = parseInt(window.getComputedStyle(obstacle2).getPropertyValue("left"));

        let diffDistance;
        if (currentDiff == 'easy') {
            diffDistance = 245
        } else if (currentDiff == 'hard') {
            diffDistance = 145
        }

        if (obstacle2Left < diffDistance && obstacle2Left > 60) {
            kill = 1;
            playOrStop(hurtS, VoiceOn);
            obstacle2.style.opacity = "0%";
            cameFromKill = 1;
        }


    }
});


window.addEventListener("keypress", checkKeyPress2);


function checkKeyPress2(key) {
    if (key.code == "Enter") {
        console.log(key);
        if (notRepeatedClickKill == 0) {
            notRepeatedClickKill = 1;

            setTimeout(() => {
                notRepeatedClickKill = 0;
            }, 666);

            if (isDead == 1) { return; } else {
                if (allowJumpHitSound == 1) {
                    player.style.left = "75px";
                    playOrStop(hitS, VoiceOn);
                    setTimeout(() => {
                        player.style.left = "60px";
                    }, 100);
                }
            }

            let obstacle2Left = parseInt(window.getComputedStyle(obstacle2).getPropertyValue("left"));

            let diffDistance;
            if (currentDiff == 'easy') {
                diffDistance = 245
            } else if (currentDiff == 'hard') {
                diffDistance = 145
            }

            if (obstacle2Left < diffDistance && obstacle2Left > 60) {
                kill = 1;
                playOrStop(hurtS, VoiceOn);
                obstacle2.style.opacity = "0%";
                cameFromKill = 1;
            }


        }
    }
}

var checkDead2 = setInterval(function() {
    let obstacle2Left = parseInt(window.getComputedStyle(obstacle2).getPropertyValue("left"));

    if (obstacle2Left < 80 && obstacle2Left > 60 && kill == 0) {

        gameover();
    }




}, 32);
///////////////////////////kill END



/////////////////////////// collect coins


var checkDead = setInterval(function() {
    let playerTop = parseInt(window.getComputedStyle(player).getPropertyValue("top"));
    let playerBottom = parseInt(window.getComputedStyle(player).getPropertyValue("bottom"));
    let coinsLeft = parseInt(window.getComputedStyle(coins).getPropertyValue("left"));

    if (topOfCoinsChanger == 1) {

        if (coinsLeft < 124 && coinsLeft > 60 && playerBottom <= -420) {
            coins.style.opacity = "0%";
            gainScore();
        }
    } else {
        if (coinsLeft < 124 && coinsLeft > 60 && playerTop <= 390) {


            coins.style.opacity = "0%";
            gainScore();
        }


    }
}, 32);

function gainScore() {
    if (notRepeated == 1) {
        notRepeated = 0;
        playOrStop(coinS, VoiceOn);
        score.innerText++;
        document.getElementById("score").style.color = "goldenrod";

        setTimeout(() => {
            document.getElementById("score").style.color = "black";
            document.getElementById("score").style.fontSize = "15px";
        }, 250);
    }
}

/////////////////////////// collect coins END


///////////////////////////start
window.addEventListener("keyup", checkKeyPress3);

function checkKeyPress3(key) {
    if (key.code == "KeyS") {
        if (dontPressAandS == 0) {
            console.log(key);
            start();

        }
    }
}

document.getElementById("startBtn").addEventListener("click", () => { start(); });

player.style.transform = "translateX(130px)";
obstacle.style.display = "none";
obstacle2.style.display = "none";
coins.style.display = "none";
var timer;

cloudChangerVal = setInterval(() => {
    let cloudChooserVal = Math.floor(Math.random() * 3) + 1;
    if (cloudChooserVal == 1) { cloud.style.backgroundImage = 'url("../../static/Runman/img/cloud/1.png")'; } else if (cloudChooserVal == 2) { cloud.style.backgroundImage = 'url("../../static/Runman/img/cloud/2.png")'; } else { cloud.style.backgroundImage = 'url("../../static/Runman/img/cloud/3.png")'; }
}, 20000);


//start
player.classList.add("playerAnimationStanding");
if (isDead == 0) { songPlayVal = setInterval(() => { playOrStop(songS, MusicOn); }, 17500); }

function start() {
    console.log("start");
    if (allowStart == 1) {
        playOrStop(startS, VoiceOn);
        allowStart = 0;
        IsGameStarted = 1;
        document.getElementById("startingPopup").style.display = "none";
        player.classList.add("goToStart");
        setTimeout(() => { document.getElementById("readyMsg").style.display = "block"; }, 200);
        setTimeout(() => {
            document.getElementById("readyMsg").style.display = "none";
            document.getElementById("goMsg").style.display = "block";
        }, 1050);
        setTimeout(() => { document.getElementById("goMsg").style.display = "none"; }, 1900);
        setTimeout(() => {
            player.classList.remove("goToStart");
            player.classList.remove("playerAnimationStanding");
            allowJumpHitSound = 1;
            player.classList.add("walking");
            timer = setInterval(() => { document.getElementById("timer").innerText++; }, 1000);
        }, 1900);
        player.style.transform = "translateX(0px)";

        setTimeout(() => { dayAnimation(); }, 1900);
        setTimeout(() => { dayAnimationVal = setInterval(dayAnimation, 44000); }, 1900);

        chooseObstacleInterval = setInterval(() => {
            kill = 0;
            notRepeated = 1;
            obstacle2.style.opacity = "100%";
            coins.style.opacity = "100%";
            chooseObstacle();

        }, 3150);
    }
}
///////////////////////////start END



///////////////////////////day animation
function dayAnimation() {
    sun.classList.add("sunAnimation1");
    moon.classList.add("moonAnimation1");
    setTimeout(() => {
        sun.classList.remove("sunAnimation1");
        moon.classList.remove("moonAnimation1");
        sun.classList.add("sunAnimation2");
        moon.classList.add("moonAnimation2");

        setTimeout(() => {
            sun.classList.remove("sunAnimation2");
            moon.classList.remove("moonAnimation2");
        }, 240000);
    }, 240000);

    sky.classList.add("skyAnimation1");
    setTimeout(() => {
        sky.classList.remove("skyAnimation1");
        sky.classList.add("skyAnimation2");
        setTimeout(() => { sky.classList.remove("skyAnimation2"); }, 240000);
    }, 240000);
    sky2.classList.add("skyAnimation1");
    setTimeout(() => {
        sky2.classList.remove("skyAnimation1");
        sky2.classList.add("skyAnimation2");
        setTimeout(() => { sky2.classList.remove("skyAnimation2"); }, 240000);
    }, 240000);

}
///////////////////////////day animation END

///////////////////////////Popups


document.getElementById("infoPopupBtn").addEventListener("click", () => {
    allowStart = 0;
    playOrStop(menuS, VoiceOn);
    allowMenuExitS = 1;
    document.getElementById("infoPopup").style.display = "block";
    document.getElementById("explainPopup").style.display = "none";
    document.getElementById("settingsPopup").style.display = "none";
    document.getElementById("leaderboardPopup").style.display = "none";
});

document.getElementById("explainPopupBtn").addEventListener("click", () => {
    allowStart = 0;
    playOrStop(menuS, VoiceOn);
    allowMenuExitS = 1;
    document.getElementById("infoPopup").style.display = "none";
    document.getElementById("explainPopup").style.display = "block";
    document.getElementById("settingsPopup").style.display = "none";
    document.getElementById("leaderboardPopup").style.display = "none";
});

document.getElementById("leaderboardPopupBtn").addEventListener("click", () => {
    allowStart = 0;
    playOrStop(menuS, VoiceOn);
    allowMenuExitS = 1;
    document.getElementById("infoPopup").style.display = "none";
    document.getElementById("explainPopup").style.display = "none";
    document.getElementById("leaderboardPopup").style.display = "block";
    document.getElementById("settingsPopup").style.display = "none";
});

document.getElementById("settingsPopupBtn").addEventListener("click", () => {
    allowStart = 0;
    playOrStop(menuS, VoiceOn);
    allowMenuExitS = 1;
    document.getElementById("infoPopup").style.display = "none";
    document.getElementById("explainPopup").style.display = "none";
    document.getElementById("settingsPopup").style.display = "block";
    document.getElementById("leaderboardPopup").style.display = "none";
});


window.addEventListener("keyup", checkKeyPress5);

function checkKeyPress5(key) {
    if (key.code == "Escape") {
        console.log(key);
        allowStart = 1;
        if (allowMenuExitS == 1) { playOrStop(menuExitS, VoiceOn); }
        document.getElementById("infoPopup").style.display = "none";
        document.getElementById("explainPopup").style.display = "none";
        document.getElementById("settingsPopup").style.display = "none";
        allowMenuExitS = 0;
    }
}

document.getElementById("x1").addEventListener("click", () => {
    document.getElementById("infoPopup").style.display = "none";
    document.getElementById("explainPopup").style.display = "none";
    document.getElementById("settingsPopup").style.display = "none";
    allowStart = 1;
    playOrStop(menuExitS, VoiceOn);
    allowMenuExitS = 0;
});

document.getElementById("x2").addEventListener("click", () => {
    document.getElementById("infoPopup").style.display = "none";
    document.getElementById("explainPopup").style.display = "none";
    document.getElementById("settingsPopup").style.display = "none";
    allowStart = 1;
    playOrStop(menuExitS, VoiceOn);
    allowMenuExitS = 0;
});

document.getElementById("x3").addEventListener("click", () => {
    document.getElementById("infoPopup").style.display = "none";
    document.getElementById("explainPopup").style.display = "none";
    document.getElementById("settingsPopup").style.display = "none";
    allowStart = 1;
    playOrStop(menuExitS, VoiceOn);
    allowMenuExitS = 0;

});

document.getElementById("x4").addEventListener("click", () => {
    document.getElementById("infoPopup").style.display = "none";
    document.getElementById("explainPopup").style.display = "none";
    document.getElementById("settingsPopup").style.display = "none";
    document.getElementById("leaderboardPopup").style.display = "none";

    allowStart = 1;
    playOrStop(menuExitS, VoiceOn);
    allowMenuExitS = 0;

});

if (localStorage.nickname == null || localStorage.nickname == undefined) {
    nameStat = 'unknown name'
}


document.getElementById("x5").addEventListener("click", () => {
    document.getElementById("enterNNPopup").style.display = "none";
    dontPressAandS = 0;
    countHighestScore();
    allowStart = 1;
    playOrStop(menuExitS, VoiceOn);
    allowMenuExitS = 0;
});



///////////////////////////Popups END


///////////////////////////Settings


///////////////////////////music
let musicStopped = localStorage.getItem("musicStopped");
if (musicStopped == 1) {
    localStorage.setItem("musicStopped", 1);
    MusicOn = 0;
    document.getElementById("Music").innerHTML = '<img src="../../static/Runman/img/icons/MusicOff.png" alt="Music Off">';
}

document.getElementById("Music").addEventListener("click", () => {
    playOrStop(menuS, VoiceOn);
    if (MusicOn == 1) {
        localStorage.setItem("musicStopped", 1);
        MusicOn = 0;
        document.getElementById("Music").innerHTML = '<img src="../../static/Runman/img/icons/MusicOff.png" alt="Music Off">';
        playOrStop(songS, MusicOn);
    } else {
        localStorage.setItem("musicStopped", 0);
        MusicOn = 1;
        document.getElementById("Music").innerHTML = '<img src="../../static/Runman/img/icons/MusicOn.png" alt="Music On">';
        playOrStop(songS, MusicOn);
    }


});
///////////////////////////music END

///////////////////////////voice
let voiceStopped = localStorage.getItem("voiceStopped");
if (voiceStopped == 1) {
    localStorage.setItem("voiceStopped", 1);
    VoiceOn = 0;
    document.getElementById("Voice").innerHTML = '<img src="../../static/Runman/img/icons/VoiceOff.png" alt="Voice Off">';
}

document.getElementById("Voice").addEventListener("click", () => {

    if (VoiceOn == 1) {
        localStorage.setItem("voiceStopped", 1);
        VoiceOn = 0;
        document.getElementById("Voice").innerHTML = '<img src="../../static/Runman/img/icons/VoiceOff.png" alt="Voice Off">';
    } else {
        playOrStop(menuS, VoiceOn);
        localStorage.setItem("voiceStopped", 0);
        VoiceOn = 1;
        document.getElementById("Voice").innerHTML = '<img src="../../static/Runman/img/icons/VoiceOn.png" alt="Voice On">';
    }


});

///////////////////////////voice END

///////////////////////////languages


document.getElementById("English").addEventListener("click", () => {
    playOrStop(menuS, VoiceOn);
    playOrStop(menuS, VoiceOn);
    window.location.assign("/runman/en");
});

document.getElementById("Arabic").addEventListener("click", () => {
    playOrStop(menuS, VoiceOn);
    playOrStop(menuS, VoiceOn);
    window.location.assign("/runman/ar");
});


///////////////////////////languages END

////////////////////////////zoom


body = document.getElementsByTagName("body")[0];
if (localStorage.screenSize != undefined || localStorage.screenSize != null) {
    body.style.zoom = `${Number(localStorage.screenSize)}`;
    screenSize = Number(localStorage.screenSize);
} else {
    screenSize = 1;
}
document.getElementById("ZoomIn").addEventListener("click", function() {
    playOrStop(menuS, VoiceOn);
    screenSize += .15;
    console.log("zoom in: ", screenSize);
    body.style.zoom = `${Number(screenSize)}`;
    localStorage.screenSize = screenSize;
});

document.getElementById("ZoomOut").addEventListener("click", function() {
    playOrStop(menuExitS, VoiceOn);
    screenSize -= .15;
    console.log("zoom out: ", screenSize);
    body.style.zoom = `${Number(screenSize)}`;
    localStorage.screenSize = screenSize;
});
///////////////////////////zoom END

//////////////////////////change difficulty

let path = window.location.pathname;
let currentPage = path.split("/").pop();

let currentDiff = localStorage.getItem("currentDiff");
if (currentDiff == null) {
    localStorage.setItem("currentDiff", 'easy');
    currentDiff = localStorage.getItem("currentDiff");
} else if (currentDiff == 'hard') {
    if (currentPage == 'ar') {
        document.getElementById("difficultyText").innerText = "صعب";
        document.getElementById("difficultyText").title = "صعب: قفز أقصر ومدى ضرب أضيق";
    } else {
        document.getElementById("difficultyText").innerText = "Hard";
        document.getElementById("difficultyText").title = "Hard: short jump and narrow hit range";
    }
} else if (currentDiff == 'easy') {
    if (currentPage == 'ar') {
        document.getElementById("difficultyText").innerText = "سهل";
        document.getElementById("difficultyText").title = "سهل: قفز أطول ومدى ضرب أوسع";
    } else {
        document.getElementById("difficultyText").innerText = "Easy";
        document.getElementById("difficultyText").title = "Easy: long jump and wide hit range";
    }
}

function changeDiff() {

    playOrStop(menuS, VoiceOn);

    if (currentDiff == 'easy') {
        if (currentPage == 'ar') {
            document.getElementById("difficultyText").innerText = "صعب";
            document.getElementById("difficultyText").title = "صعب: قفز أقصر ومدى ضرب أضيق";
        } else {
            document.getElementById("difficultyText").innerText = "Hard";
            document.getElementById("difficultyText").title = "Hard: short jump and narrow hit range";
        }
        localStorage.setItem("currentDiff", 'hard');
        currentDiff = localStorage.getItem("currentDiff");
    } else if (currentDiff == 'hard') {
        if (currentPage == 'ar') {
            document.getElementById("difficultyText").innerText = "سهل";
            document.getElementById("difficultyText").title = "سهل: قفز أطول ومدى ضرب أوسع";
        } else {
            document.getElementById("difficultyText").innerText = "Easy";
            document.getElementById("difficultyText").title = "Easy: long jump and wide hit range";
        }
        localStorage.setItem("currentDiff", 'easy');
        currentDiff = localStorage.getItem("currentDiff");
    }
}

document.getElementById('Difficulty').addEventListener('click', () => { changeDiff() });

///////////////////////////Settings END

///////////////////////////count highest score
function countHighestScore() {
    oldCoins = Number(localStorage.getItem("highestCoins"));
    oldTime = Number(localStorage.getItem("highestTime"));

    currentCoins = Number(document.getElementById("score").innerText);
    currentTime = Number(document.getElementById("timer").innerText);

    if (currentCoins > oldCoins || oldCoins == null) {
        document.getElementById("HCtitle").style = "font-size:21px;";
        document.getElementById("highestCoins").style = "font-size:21px;";
        localStorage.setItem("highestCoins", currentCoins);
        document.getElementById("highestCoins").innerText = currentCoins;
    } else {
        localStorage.setItem("highestCoins", oldCoins);
        document.getElementById("highestCoins").innerText = oldCoins;
    }

    if (currentTime > oldTime || oldTime == null) {
        document.getElementById("HTtitle").style = "font-size:21px;";
        document.getElementById("highestTime").style = "font-size:21px;";
        localStorage.setItem("highestTime", currentTime);
        document.getElementById("highestTime").innerText = currentTime;
    } else {
        localStorage.setItem("highestTime", oldTime);
        document.getElementById("highestTime").innerText = oldTime;
    }

    if (nameStat == 'unknown name') {
        return
    } else {
        fetch(`http://www.br19.me/runman/user/${localStorage.nickname}`, {
                headers: {
                    'Method': 'GET',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                return response.json();
            }).then((responseJson) => {
                if (responseJson.statCode != 403) {
                    addUser(localStorage.nickname,
                        (Number(localStorage.getItem("highestCoins"))),
                        (Number(localStorage.getItem("highestTime"))));
                } else {
                    return console.log(responseJson)
                }
            });
        updateUserRecords(
            (localStorage.nickname),
            (Number(localStorage.getItem("highestCoins"))),
            (Number(localStorage.getItem("highestTime"))))
    }
}
///////////////////////////count highest score END

/////////////////////////// backend

function hasWhiteSpace(s) {
    return /\s/g.test(s);
}

document.getElementById('DoneName').addEventListener('click', () => {
    playOrStop(menuS, VoiceOn);
    inputValue = document.getElementById('enterNNPopupInput').value; {
        fetch(`http://www.br19.me/runman/user/${inputValue}`, {
                headers: {
                    'Method': 'GET',
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
            .then((response) => {
                return response.json();
            }).then((responseJson) => {
                console.log(responseJson);
                return responseJson.statCode
            }).then((statusCode) => {
                if (inputValue == undefined || inputValue == null || inputValue == '' || inputValue == ' ' || hasWhiteSpace(inputValue) == true) {
                    if (currentPage == 'ar') {
                        alert("الاسم الذي أدخلته غير صالح لاحتوائه على مسافات، الرجاء إدخال اسم آخر. أو اضغط × إن كنت لا تريد كتابة اسم")
                        nameStat = 'unknown name'
                        return
                    } else {
                        alert("The name you provided is unvalid because it contains white spaces, please enter another name. Or press x if you don't want to provide a name")
                        nameStat = 'unknown name'
                        return
                    }

                }

                if (statusCode == 403) {
                    if (currentPage == 'ar') {
                        alert("الاسم الذي أدخلته محجوز، الرجاء إدخال اسم آخر. أو اضغط × إن كنت لا تريد كتابة اسم")
                        nameStat = 'unknown name'
                        return
                    } else {
                        alert("The name you provided is occupied, please enter another name. Or press x if you don't want to provide a name")
                        nameStat = 'unknown name'
                        return
                    }
                } else {
                    nickname = document.getElementById('enterNNPopupInput').value;
                    localStorage.nickname = nickname;
                    nameStat = 'known name'
                    document.getElementById("enterNNPopup").style.display = "none";
                    dontPressAandS = 0;
                }
                countHighestScore();
            });
    }


});


function addUser(name, hcoins, htime) {

    fetch('http://www.br19.me/runman/user', {
            headers: {

                'Method': 'POST',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                name: name,
                hcoins: hcoins,
                htime: htime
            })
        })
        .then((response) => {
            return response.json();
        }).then((responseJson) => {
            console.log(responseJson);
        });

}

function updateUserRecords(name, hcoins, htime) {

    fetch('http://www.br19.me/runman/user', {
            headers: {

                'Method': 'PUT',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'PUT',
            body: JSON.stringify({
                name: name,
                hcoins: hcoins,
                htime: htime
            })
        })
        .then((response) => {
            return response.json();
        }).then((responseJson) => {
            console.log(responseJson);
        });

}


function displayRecordsForRanking() {

    fetch(`http://www.br19.me/runman/users/10/${order}`, {
            headers: {
                'Method': 'GET',
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        })
        .then((response) => {
            return response.json();
        }).then((usersFetched) => {
            let listContainer = document.getElementById('listContainer');
            if (document.getElementsByClassName('alist')[0]) {
                const elements = document.getElementsByClassName('alist');
                while (elements.length > 0) {
                    elements[0].parentNode.removeChild(elements[0]);
                }
            }
            for (let i of Object.keys(usersFetched)) {

                //alist
                let alist = document.createElement('li');
                alist.setAttribute('class', 'alist');
                listContainer.appendChild(alist);
                if (localStorage.nickname == usersFetched[i]['name']) {
                    alist.setAttribute('style', 'font-weight:bold; color:#2c2c2c;');
                }
                //alist


                //rank
                let rank = document.createElement('div');
                rank.setAttribute('class', 'rank');

                alist.appendChild(rank);
                rank.innerText = `${Number(i) + 1}`
                if (localStorage.nickname == usersFetched[i]['name']) {
                    rank.setAttribute('style', 'background-color: #00000010;');
                }
                if ('1' == rank.innerText) {
                    if (currentPage == 'ar') { rank.setAttribute('style', 'line-height: 11px;'); } else { rank.setAttribute('style', 'line-height: 21px;'); }
                    rank.innerHTML = '<img style="width: 16px; height: 17px;" src="../../static/Runman/img/coin/gold.png" alt="1st">';
                    if (localStorage.nickname == usersFetched[i]['name']) {
                        document.getElementsByClassName('rank')[i].style.backgroundColor = "#00000010";
                    }
                } else if ('2' == rank.innerText) {
                    if (currentPage == 'ar') { rank.setAttribute('style', 'line-height: 11px;'); } else { rank.setAttribute('style', 'line-height: 21px;'); }
                    rank.innerHTML = '<img style="width: 16px; height: 17px;" src="../../static/Runman/img/coin/silver.png" alt="2nd">';
                    if (localStorage.nickname == usersFetched[i]['name']) {
                        document.getElementsByClassName('rank')[i].style.backgroundColor = "#00000010";
                    }
                } else if ('3' == rank.innerText) {
                    if (currentPage == 'ar') { rank.setAttribute('style', 'line-height: 11px;'); } else { rank.setAttribute('style', 'line-height: 21px;'); }
                    rank.innerHTML = '<img style="width: 16px; height: 17px;" src="../../static/Runman/img/coin/bronze.png" alt="3rd">';
                    if (localStorage.nickname == usersFetched[i]['name']) {
                        document.getElementsByClassName('rank')[i].style.backgroundColor = "#00000010";
                    }
                }
                //rank

                //nameInList
                let nameInList = document.createElement('div');
                nameInList.setAttribute('class', 'nameInList');
                alist.appendChild(nameInList);
                nameInList.innerText = `${usersFetched[i]['name']}`
                if (localStorage.nickname == usersFetched[i]['name']) {
                    nameInList.setAttribute('style', 'background-color: #00000010;');
                }
                //nameInList

                //hcoinInList
                let hcoinInList = document.createElement('div');
                hcoinInList.setAttribute('class', 'hcoinInList');
                alist.appendChild(hcoinInList);
                hcoinInList.innerText = `${usersFetched[i]['hcoins']}`;
                if (localStorage.nickname == usersFetched[i]['name']) {
                    hcoinInList.setAttribute('style', 'background-color: #00000010;');
                }
                //hcoinInList

                //htimeInList
                let htimeInList = document.createElement('div');
                htimeInList.setAttribute('class', 'htimeInList');
                alist.appendChild(htimeInList);
                htimeInList.innerText = `${usersFetched[i]['htime']}`;
                if (localStorage.nickname == usersFetched[i]['name']) {
                    htimeInList.setAttribute('style', 'background-color: #00000010;');
                }
                //htimeInList
            }

        });

}

////////////////////////////Ranking

var ranking = setInterval(function() {

    displayRecordsForRanking()

}, 300000);
displayRecordsForRanking();

document.getElementById("orderBtn").addEventListener("click", () => {

    if (order == 2) {
        if (currentPage == 'ar') {
            document.getElementById('orderBtn').innerHTML = 'عدد<br><img style="width: 12px; height: 13px;" src="../static/Runman/img/coin/0.png" alt="Coins">'
        } else {
            document.getElementById('orderBtn').innerHTML = '# of <img style="width: 12px; height: 13px;" src="../static/Runman/img/coin/0.png" alt="Coins">'
        }
        order = 1;
    } else if (order == 1) {
        if (currentPage == 'ar') {
            document.getElementById('orderBtn').innerHTML = '<div style="direction: rtl;">الوقت (ثوان)</div>'
        } else {
            document.getElementById('orderBtn').innerText = 'time (sec)'
        }
        order = 2;
    }
    displayRecordsForRanking();

});
////////////////////////////Ranking END


/////////////////////////// backend END



///////////////////////////reset 

document.getElementById("Reset").addEventListener("click", () => { reset(); });


function reset() {
    localStorage.clear();
    location.reload();
}

///////////////////////////reset END

//////////////////////////social accounts
document.getElementById("Linkedin").addEventListener("click", function() {
    playOrStop(menuS, VoiceOn);
    window.location.assign("https://www.linkedin.com/in/ibrahim-alkhowaiter-430b24203/");
});
document.getElementById("Website").addEventListener("click", function() {
    playOrStop(menuS, VoiceOn);
    window.location.assign("http://www.br19.me");
});
document.getElementById("Email").addEventListener("click", function() {
    playOrStop(menuS, VoiceOn);
    window.location.assign("mailto: ibrahim-abdalaziz@hotmail.com");
});
document.getElementById("Twitter").addEventListener("click", function() {
    playOrStop(menuS, VoiceOn);
    window.location.assign("https://twitter.com/BR19_tw");
});
document.getElementById("Github").addEventListener("click", function() {
    playOrStop(menuS, VoiceOn);
    window.location.assign("https://github.com/BR19-gh");
});
//////////////////////////social accounts END