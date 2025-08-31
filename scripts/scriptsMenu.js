let DOM_START = {
    /* Botonoes del menu de inicio */
    buttom_Play: document.getElementById("Button-Play"),
    buttom_Instructions: document.getElementById("Button-Instructions"),

    /* Botones del dialogo de Comenzar */
    buttom_Cancel_Start: document.getElementById("Dialog-Start-Cancel"),
    buttom_Play_Start: document.getElementById("Dialog-Start-Play"),
    Input_Name_Start: document.getElementById("Dialog-Start-Name"),

    /* Botones del dialogo de instrucciones */
    buttom_Next_Instructions: document.getElementById("Button-Instructions-Next"),
    buttom_Back_Instructions: document.getElementById("Button-Instructions-Back"),
    buttom_Close_Instructions: document.getElementById("Button-Instructions-Close"),

    /* Dialogos */
    dialog_Play: document.getElementById("Dialog-Play"),
    dialog_Instructions: document.getElementById("Dialog-Instructions"),

    /* img de las instrucciones */
    img: document.getElementById("instructions")
}

let imgInstructions = {
    img1: {
        id: 1,
        route: "assets/image/instructions/1.png"
    },
    img2: {
        id: 2,
        route: "assets/image/instructions/2.png"
    },
    img3: {
        id: 3,
        route: "assets/image/instructions/3.png"
    }
}

/* Esta funcion contiene todos los eventos del menu de inicio */
function StartMenu() {
    DOM_START.buttom_Play.addEventListener("click", function () {
        DOM_START.dialog_Play.style.display = "block"
    })

    DOM_START.buttom_Instructions.addEventListener("click", function () {
        DOM_START.dialog_Instructions.style.display = "block"
    })
}


/* Esta funcion contiene todos los eventos del dialogo de Comenzar */
function GameStart() {
    DOM_START.buttom_Play_Start.addEventListener("click", function () {

        if (DOM_START.Input_Name_Start.value == "") {
            DOM_START.Input_Name_Start.style.color = "red"
            DOM_START.Input_Name_Start.value = "INGRESE SU NOMBRE"
            return
        }

        if (DOM_START.Input_Name_Start.value == "INGRESE SU NOMBRE") return

        DOM_START.dialog_Play.close()
        localStorage.setItem("Name", DOM_START.Input_Name_Start.value)
        window.location.href = "pages/Game.html"
    })

    DOM_START.Input_Name_Start.addEventListener("click", function () {
        if (DOM_START.Input_Name_Start.value == "INGRESE SU NOMBRE") {
            DOM_START.Input_Name_Start.style.color = "black"
            DOM_START.Input_Name_Start.value = ""
            return
        }
    })

    DOM_START.buttom_Cancel_Start.addEventListener("click", function () {
        DOM_START.dialog_Play.style.display = "none"
    })
}


/* Esta funcion contiene todos los eventos del dialogo de instrucciones */
function GameInstructions() {
    let count = 1

    DOM_START.buttom_Next_Instructions.addEventListener("click", function () {
        count++
        if (count === 4) count = 1
        imgChange(count)
    })
    DOM_START.buttom_Back_Instructions.addEventListener("click", function () {
        count--
        if (count === 0) count = 3
        imgChange(count)
    })
    DOM_START.buttom_Close_Instructions.addEventListener("click", function () {
        DOM_START.dialog_Instructions.style.display = "none"
    })
}

function imgChange(n) {
    switch (n) {
        case 1: DOM_START.img.src = imgInstructions.img1.route; break;
        case 2: DOM_START.img.src = imgInstructions.img2.route; break;
        case 3: DOM_START.img.src = imgInstructions.img3.route; break;
    }
}


addEventListener("DOMContentLoaded", function () {
    StartMenu()
    GameStart()
    GameInstructions()
})