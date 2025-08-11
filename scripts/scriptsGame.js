let DOM_GAME = {
    points: document.getElementById("Points_Points"),
    username: document.getElementById("Username_Points"),
    container_cards: document.getElementById("Container-Cards"),
    body : document.body,

    home : document.getElementById("Home"),

    // Dialogs
    dialog_exit: document.getElementById("dialog-exit"),
    dialog_win: document.getElementById("dialog-win"),
    btn_exit_yes: document.getElementById("btn-exit-yes"),
    btn_exit_no: document.getElementById("btn-exit-no"),
    btn_win_reset: document.getElementById("btn-win-reset"),
    btn_win_return: document.getElementById("btn-win-return"),
}


/* Esta funcion contiene todas las rutas de las cartas y sus ids*/
function LoadRoutes() {
    return routes = [
        img1 = {
            id: 1,
            route: "../assets/image/cards/Cerezas.png",
        },
        img2 = {
            id: 2,
            route: "../assets/image/cards/Fresa.png",
        },
        img3 = {
            id: 3,
            route: "../assets/image/cards/Limon.png",
        },
        img4 = {
            id: 4,
            route: "../assets/image/cards/Patilla.png",
        },
        img5 = {
            id: 5,
            route: "../assets/image/cards/Pera.png",
        },
        img6 = {
            id: 6,
            route: "../assets/image/cards/Piña.png",
        },
        img7 = {
            id: 7,
            route: "../assets/image/cards/Uvas.png",
        },
        img8 = {
            id: 8,
            route: "../assets/image/cards/Naranja.png",
        },
    ]
}


/* Esta funcion carga los puntos del usuario y el nombre del usuario */
function LoadPoints(Puntos = 0) {
    DOM_GAME.points.textContent = ""
    DOM_GAME.points.textContent = "Puntos: " + Puntos
    DOM_GAME.username.textContent = "Nombre: " + localStorage.getItem("Name")
}


/* Esta funcion carga las cartas en la pantalla */
function LoadCards() {
    let cards = LoadRoutes()
    let count = 0
    let fila = 0

    // este bucle coloca las cartas la cargas en orden aleatorio
    for (let i = 0; i < 16; i++) {
        let FilaCard = Math.floor(Math.random() * cards.length)

        document.getElementById("row" + fila).innerHTML += `
            <img src="../assets/image/cards/OIP.jpg" class="card" id="${cards[FilaCard].id}">
        `

        // filtra las cartas que ya se han colocado
        count++
        cards = cards.filter(card => card !== cards[FilaCard])

        // si se llega al final de la fila se pasa a la siguiente
        if (count === 4) {
            count = 0
            fila++
        }

        if (cards.length === 0) cards = LoadRoutes()
    }
}


/* Esta funcion se encarga de contar las cartas que se han seleccionado */
function Points() {
    const cards = document.querySelectorAll(".card")
    const object_cards = [...LoadRoutes(), ...LoadRoutes()]
    console.log(cards)

    let cards_points = 0
    let n1 = 0
    let n2 = 0
    let count = 0

    cards.forEach(card => {
        card.addEventListener("click", function () {
            count++

            if (count === 1) {
                card.src = object_cards.find(x => x.id === parseInt(card.id)).route
                card.classList.remove("card")
                card.classList.add("desactivated")
                n1 = card
            }

            if (count === 2) {
                card.src = object_cards.find(x => x.id === parseInt(card.id)).route
                card.classList.remove("card")
                card.classList.add("desactivated")
                n2 = card

                if (n1.id === n2.id) {
                    cards_points++
                    LoadPoints(cards_points)
                } else {
                    DOM_GAME.body.classList.add("desactivated")
                    setTimeout(() => {
                        n1.classList.remove("desactivated")
                        n2.classList.remove("desactivated")
                        n1.classList.add("card")
                        n2.classList.add("card")
                        n1.src = "../assets/image/cards/OIP.jpg"
                        n2.src = "../assets/image/cards/OIP.jpg"
                        n1 = 0
                        n2 = 0
                        DOM_GAME.body.classList.remove("desactivated")
                    }, 500)
                }
                count = 0
            }

            if (cards_points === 8) win()
        })
    })
}


/* Esta fuincion se encarga de mostrar el dialogo de victoria */
function win(){
    DOM_GAME.dialog_win.showModal()

    DOM_GAME.btn_win_reset.addEventListener("click", function(){
        DOM_GAME.dialog_win.close()
        location.reload(true)
    })

    DOM_GAME.btn_win_return.addEventListener("click", function(){
        DOM_GAME.dialog_win.close()
        localStorage.clear()
        location.href = "../index.html"
    })
}

/* Esta funcion se encarga de mostrar el dialogo de salir  */
function exit(){
    DOM_GAME.home.addEventListener("click", function(){
        DOM_GAME.dialog_exit.showModal()

        DOM_GAME.btn_exit_yes.addEventListener("click", function(){
            localStorage.clear()
            location.href = "../index.html"
        })

        DOM_GAME.btn_exit_no.addEventListener("click", function(){
            DOM_GAME.dialog_exit.close()
        })
    })
}




addEventListener("DOMContentLoaded", function () {
    exit()
    LoadPoints()
    LoadCards()
    Points()
})