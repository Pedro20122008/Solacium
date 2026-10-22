let stress = 0;
let stage = 0;
let gameStarted = false;

let canBreathe = false;
let canFindDark = false;
let canReduceStimulus = false;

let sceneTimer = null;
let actionTimer = null;
let breatheTimer = null;


/* =========================================
   ELEMENTOS
========================================= */

const background =
    document.getElementById("background");

const colorLayer =
    document.getElementById("color-layer");

const overload =
    document.getElementById("overload");

const stressBar =
    document.getElementById("stress");

const text =
    document.getElementById("text");

const sceneNumber =
    document.getElementById("scene-number");

const hud =
    document.getElementById("hud");

const stressContainer =
    document.getElementById("stress-container");

const startScreen =
    document.getElementById("start-screen");

const ending =
    document.getElementById("ending");

const gameOver =
    document.getElementById("game-over");


const breatheBtn =
    document.getElementById("breathe-btn");

const darkBtn =
    document.getElementById("dark-btn");

const stimulusBtn =
    document.getElementById("stimulus-btn");


const startButton =
    document.getElementById("start-button");

const restartButton =
    document.getElementById("restart-button");

const retryButton =
    document.getElementById("retry-button");


/* =========================================
   CENAS
========================================= */

const scenes = [

    {
        image:
            "images/cena1.png",

        text:
            "As portas automáticas se abrem.",

        time:
            5000,

        stress:
            0,

        color:
            "cold",

        camera:
            "camera-slow"
    },


    {
        image:
            "images/cena2.png",

        text:
            "Por alguns segundos, tudo parece normal.",

        time:
            5500,

        stress:
            2,

        color:
            "cold",

        camera:
            "camera-slow"
    },


    {
        image:
            "images/cena2.png",

        text:
            "Você começa a caminhar.",

        time:
            5000,

        stress:
            7,

        color:
            "neutral",

        camera:
            "camera-slow"
    },


    {
        image:
            "images/cena3.png",

        text:
            "Uma música toca ao longe. Pessoas conversam. Alguém passa ao seu lado.",

        time:
            6000,

        stress:
            15,

        color:
            "yellow",

        camera:
            "camera-close"
    },


    {
        image:
            "images/cena3.png",

        text:
            "Você continua andando.",

        time:
            5000,

        stress:
            23,

        color:
            "yellow",

        camera:
            "camera-close"
    },


    {
        image:
            "images/cena4.png",

        text:
            "As luzes começam a chamar sua atenção.",

        time:
            5000,

        stress:
            32,

        color:
            "yellow",

        camera:
            "camera-close"
    },


    {
        image:
            "images/cena5.png",

        text:
            "Uma televisão anuncia alguma coisa. Uma música fica mais alta.",

        time:
            5000,

        stress:
            42,

        color:
            "orange",

        camera:
            "camera-extreme"
    },


    {
        image:
            "images/cena8.png",

        text:
            "Luzes.",

        time:
            2500,

        stress:
            52,

        color:
            "orange",

        camera:
            "camera-extreme"
    },


    {
        image:
            "images/cena7.png",

        text:
            "Vozes.",

        time:
            2200,

        stress:
            61,

        color:
            "red",

        camera:
            "camera-extreme"
    },


    {
        image:
            "images/cena7.png",

        text:
            "Passos.",

        time:
            2200,

        stress:
            68,

        color:
            "red",

        camera:
            "camera-extreme"
    },


    {
        image:
            "images/cena8.png",

        text:
            "Música.",

        time:
            2200,

        stress:
            75,

        color:
            "red",

        camera:
            "camera-extreme"
    },


    {
        image:
            "images/cena9.png",

        text:
            "Tudo ao mesmo tempo.",

        time:
            3500,

        stress:
            82,

        color:
            "magenta",

        camera:
            "camera-extreme"
    },


    {
        image:
            "images/cena9.png",

        text:
            "Você precisa encontrar um lugar onde a luz seja menos intensa.",

        interaction:
            "dark",

        stress:
            86,

        color:
            "magenta",

        camera:
            "camera-extreme"
    },


    {
        image:
            "images/cena10.png",

        text:
            "Você encontra um lugar um pouco mais escuro.",

        time:
            4500,

        stress:
            58,

        color:
            "blue",

        camera:
            "camera-close"
    },


    {
        image:
            "images/cena11.png",

        text:
            "Mas os sons continuam.",

        time:
            4000,

        stress:
            67,

        color:
            "purple",

        camera:
            "camera-close"
    },


    {
        image:
            "images/cena12.png",

        text:
            "Tente respirar. Devagar.",

        interaction:
            "breathe",

        stress:
            70,

        color:
            "purple",

        camera:
            "camera-close"
    },


    {
        image:
            "images/cena12.png",

        text:
            "Ainda há pessoas demais. Luzes demais. Sons demais.",

        time:
            4500,

        stress:
            55,

        color:
            "purple",

        camera:
            "camera-close"
    },


    {
        image:
            "images/cena13.png",

        text:
            "Você precisa se afastar dos estímulos.",

        interaction:
            "stimulus",

        stress:
            63,

        color:
            "purple",

        camera:
            "camera-close"
    }

];


/* =========================================
   INICIAR
========================================= */

startButton.onclick =
    startGame;


restartButton.onclick =
    function () {

        location.reload();

    };


retryButton.onclick =
    function () {

        location.reload();

    };


function startGame() {

    gameStarted = true;

    stage = 0;

    stress = 0;

    startScreen.style.display =
        "none";

    ending.style.display =
        "none";

    gameOver.style.display =
        "none";

    hud.style.opacity =
        "1";

    stressContainer.style.opacity =
        "1";

    hideButtons();

    background.style.opacity =
        "1";

    playScene();


    /*
    Pequeno aumento constante.
    */

    stressLoop = setInterval(
        function () {

            if (!gameStarted)
                return;

            increaseStress(.7);

        },
        1000
    );

}


/* =========================================
   TOCAR CENA
========================================= */

function playScene() {

    if (!gameStarted)
        return;


    clearTimeout(sceneTimer);

    clearTimeout(actionTimer);

    clearTimeout(breatheTimer);


    hideButtons();


    canBreathe = false;
    canFindDark = false;
    canReduceStimulus = false;


    if (stage >= scenes.length) {

        finishGame();

        return;

    }


    const scene =
        scenes[stage];


    sceneNumber.innerText =
        String(stage + 1).padStart(2, "0");


    /*
    IMAGEM
    */

    background.style.opacity =
        "0";


    setTimeout(
        function () {

            background.style.backgroundImage =
                `url("${scene.image}")`;


            background.classList.remove(
                "camera-slow",
                "camera-close",
                "camera-extreme"
            );


            if (scene.camera) {

                background.classList.add(
                    scene.camera
                );

            }


            background.style.opacity =
                "1";

        },
        500
    );


    /*
    TEXTO
    */

    showText(scene.text);


    /*
    COR
    */

    applyColor(scene.color);


    /*
    ESTRESSE
    */

    stress =
        scene.stress;


    updateStress();


    /*
    INTERAÇÃO
    */

    if (scene.interaction === "dark") {

        setTimeout(
            activateDarkButton,
            1500
        );

        return;

    }


    if (scene.interaction === "breathe") {

        setTimeout(
            activateBreatheButton,
            1500
        );

        return;

    }


    if (scene.interaction === "stimulus") {

        setTimeout(
            activateStimulusButton,
            1500
        );

        return;

    }


    /*
    CENA NORMAL
    */

    sceneTimer =
        setTimeout(
            nextScene,
            scene.time
        );

}


/* =========================================
   TEXTO
========================================= */

function showText(message) {

    text.style.opacity =
        "0";


    setTimeout(
        function () {

            text.innerText =
                message;

            text.style.opacity =
                "1";

        },
        500
    );

}


/* =========================================
   CORES
========================================= */

function applyColor(color) {

    switch (color) {

        case "cold":

            colorLayer.style.background =
                "rgba(35,90,170,.20)";

            colorLayer.style.opacity =
                ".7";

            break;


        case "neutral":

            colorLayer.style.background =
                "rgba(80,100,120,.08)";

            colorLayer.style.opacity =
                ".5";

            break;


        case "yellow":

            colorLayer.style.background =
                "rgba(255,190,30,.25)";

            colorLayer.style.opacity =
                ".85";

            break;


        case "orange":

            colorLayer.style.background =
                "rgba(255,100,20,.30)";

            colorLayer.style.opacity =
                ".9";

            break;


        case "red":

            colorLayer.style.background =
                "rgba(220,20,30,.40)";

            colorLayer.style.opacity =
                "1";

            break;


        case "magenta":

            colorLayer.style.background =
                "rgba(210,20,130,.42)";

            colorLayer.style.opacity =
                "1";

            break;


        case "purple":

            colorLayer.style.background =
                "rgba(90,35,150,.32)";

            colorLayer.style.opacity =
                ".85";

            break;


        case "blue":

            colorLayer.style.background =
                "rgba(30,90,170,.35)";

            colorLayer.style.opacity =
                ".8";

            break;


        default:

            colorLayer.style.background =
                "transparent";

            colorLayer.style.opacity =
                "0";

    }

}


/* =========================================
   BOTÃO RESPIRAR
========================================= */

function activateBreatheButton() {

    if (!gameStarted)
        return;


    canBreathe = true;


    positionButton(
        breatheBtn
    );


    breatheBtn.style.display =
        "block";


    clearTimeout(
        breatheTimer
    );


    breatheTimer =
        setTimeout(
            function () {

                if (!canBreathe)
                    return;


                canBreathe = false;

                breatheBtn.style.display =
                    "none";


                increaseStress(12);


                showText(
                    "Você perdeu o ritmo. Tente novamente."
                );


                setTimeout(
                    activateBreatheButton,
                    1200
                );

            },
            4500
        );

}


breatheBtn.onclick =
    breathe;


function breathe() {

    if (!gameStarted)
        return;


    if (!canBreathe)
        return;


    canBreathe = false;


    clearTimeout(
        breatheTimer
    );


    breatheBtn.style.display =
        "none";


    stress -= 30;


    if (stress < 0)
        stress = 0;


    updateStress();


    applyColor("blue");


    background.style.filter =
        "brightness(55%) saturate(65%)";


    background.classList.remove(
        "camera-extreme",
        "shake-heavy"
    );


    showText(
        "Você inspira lentamente. O mundo parece se afastar por alguns segundos."
    );


    setTimeout(
        function () {

            if (!gameStarted)
                return;


            nextScene();

        },
        4500
    );

}


/* =========================================
   BOTÃO LUGAR ESCURO
========================================= */

function activateDarkButton() {

    if (!gameStarted)
        return;


    canFindDark = true;


    positionButton(
        darkBtn
    );


    darkBtn.style.display =
        "block";


    clearTimeout(
        actionTimer
    );


    actionTimer =
        setTimeout(
            function () {

                if (!canFindDark)
                    return;


                canFindDark = false;


                darkBtn.style.display =
                    "none";


                increaseStress(10);


                showText(
                    "As luzes continuam intensas. Procure novamente."
                );


                setTimeout(
                    activateDarkButton,
                    1200
                );

            },
            6500
        );

}


darkBtn.onclick =
    findDarkPlace;


function findDarkPlace() {

    if (!gameStarted)
        return;


    if (!canFindDark)
        return;


    canFindDark = false;


    clearTimeout(
        actionTimer
    );


    darkBtn.style.display =
        "none";


    stress -= 32;


    if (stress < 0)
        stress = 0;


    updateStress();


    applyColor("blue");


    background.style.filter =
        "brightness(50%) saturate(60%)";


    overload.style.opacity =
        "0";


    showText(
        "Você encontra um canto menos iluminado. Por um instante, seus olhos descansam."
    );


    setTimeout(
        function () {

            if (!gameStarted)
                return;


            nextScene();

        },
        4500
    );

}


/* =========================================
   BOTÃO MENOS ESTÍMULOS
========================================= */

function activateStimulusButton() {

    if (!gameStarted)
        return;


    canReduceStimulus = true;


    positionButton(
        stimulusBtn
    );


    stimulusBtn.style.display =
        "block";


    clearTimeout(
        actionTimer
    );


    actionTimer =
        setTimeout(
            function () {

                if (!canReduceStimulus)
                    return;


                canReduceStimulus = false;


                stimulusBtn.style.display =
                    "none";


                increaseStress(10);


                showText(
                    "Os estímulos continuam ao seu redor."
                );


                setTimeout(
                    activateStimulusButton,
                    1200
                );

            },
            6500
        );

}


stimulusBtn.onclick =
    reduceStimulus;


function reduceStimulus() {

    if (!gameStarted)
        return;


    if (!canReduceStimulus)
        return;


    canReduceStimulus = false;


    clearTimeout(
        actionTimer
    );


    stimulusBtn.style.display =
        "none";


    stress -= 40;


    if (stress < 0)
        stress = 0;


    updateStress();


    applyColor("blue");


    background.style.filter =
        "brightness(45%) saturate(45%)";


    overload.style.opacity =
        "0";


    background.classList.remove(
        "shake",
        "shake-heavy",
        "camera-extreme"
    );


    showText(
        "Você se afasta. Aos poucos, os estímulos deixam de ocupar todo o espaço."
    );


    setTimeout(
        finishGame,
        5500
    );

}


/* =========================================
   POSICIONAR BOTÕES
========================================= */

function positionButton(button) {

    const x =
        Math.floor(
            Math.random() * 55
        ) + 20;


    const y =
        Math.floor(
            Math.random() * 35
        ) + 35;


    button.style.left =
        x + "%";


    button.style.top =
        y + "%";


    button.style.transform =
        "translate(-50%, -50%)";

}


/* =========================================
   PRÓXIMA CENA
========================================= */

function nextScene() {

    if (!gameStarted)
        return;


    stage++;

    playScene();

}


/* =========================================
   ESTRESSE
========================================= */

function increaseStress(amount) {

    if (!gameStarted)
        return;


    stress += amount;


    if (stress >= 100) {

        stress = 100;

        updateStress();

        triggerGameOver();

        return;

    }


    updateStress();

}


/* =========================================
   ATUALIZAR ESTRESSE
========================================= */

function updateStress() {

    stressBar.style.width =
        stress + "%";


    updateVisuals();

}


/* =========================================
   EFEITOS
========================================= */

function updateVisuals() {

    const saturation =
        95 + stress * 2.4;


    const brightness =
        Math.max(
            35,
            100 - stress * .45
        );


    const contrast =
        100 + stress * .8;


    const blur =
        stress / 30;


    background.style.filter = `

        saturate(${saturation}%)

        brightness(${brightness}%)

        contrast(${contrast}%)

        blur(${blur}px)

    `;


    overload.style.opacity =
        Math.max(
            0,
            (stress - 35) / 100
        );


    /*
    Tremor gradual
    */

    if (stress >= 75) {

        background.classList.add(
            "shake-heavy"
        );

        background.classList.remove(
            "shake"
        );

    }

    else if (stress >= 45) {

        background.classList.add(
            "shake"
        );

        background.classList.remove(
            "shake-heavy"
        );

    }

    else {

        background.classList.remove(
            "shake",
            "shake-heavy"
        );

    }

}


/* =========================================
   ESCONDER BOTÕES
========================================= */

function hideButtons() {

    canBreathe = false;

    canFindDark = false;

    canReduceStimulus = false;


    clearTimeout(
        breatheTimer
    );

    clearTimeout(
        actionTimer
    );


    breatheBtn.style.display =
        "none";


    darkBtn.style.display =
        "none";


    stimulusBtn.style.display =
        "none";

}


/* =========================================
   GAME OVER
========================================= */

function triggerGameOver() {

    gameStarted = false;


    clearInterval(
        stressLoop
    );


    clearTimeout(
        sceneTimer
    );


    hideButtons();


    colorLayer.style.background =
        "rgba(180,0,0,.55)";


    colorLayer.style.opacity =
        "1";


    gameOver.style.display =
        "flex";

}


/* =========================================
   FINAL
========================================= */

function finishGame() {

    gameStarted = false;


    clearInterval(
        stressLoop
    );


    clearTimeout(
        sceneTimer
    );


    clearTimeout(
        actionTimer
    );


    clearTimeout(
        breatheTimer
    );


    hideButtons();


    stress = 0;

    stressBar.style.width =
        "0%";


    background.classList.remove(
        "shake",
        "shake-heavy",
        "camera-extreme",
        "camera-close",
        "camera-slow"
    );


    background.style.filter =
        "brightness(30%) saturate(30%)";


    colorLayer.style.background =
        "rgba(10,30,45,.35)";


    colorLayer.style.opacity =
        "1";


    overload.style.opacity =
        "0";


    text.style.opacity =
        "0";


    hud.style.opacity =
        "0";


    stressContainer.style.opacity =
        "0";


    setTimeout(
        function () {

            ending.style.display =
                "flex";


            setTimeout(
                function () {

                    ending.classList.add(
                        "show"
                    );

                },
                300
            );

        },
        2500
    );

}