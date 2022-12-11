cards = [[11, 'A'], [2, '2'], [3, '3'], [4, '4'], [5, '5'], [6, '6'], [7, '7'], [8, '8'], [9, '9'], [10, '10'], [10, 'J'], [10, 'Q'], [10, 'K'],]
suits = ['H', 'D', 'C', 'S']
deck = []
theDealtCard = []
playersHand = []
let playersHandValue = 0
botHand = []
let botHandValue = 0
localHand = []
localHandValue = []
let returnedValue = null

// ----- Deck functions -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function generateCard(cards, suits) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    cardDigit = cards[getRandomInt(13)]
    cardSuit = suits[getRandomInt(4)]
    techCard = cardDigit[1] + cardSuit
    cardValue = cardDigit[0]
    card = [cardValue, techCard]
    return card
}
function shuffleDeck(deck) {
    while (deck.length < 52) {
        card = generateCard(cards, suits)
        duplicateCard = false
        for (let index = 0; index < deck.length; index++) {
            if (card[1] == deck[index][1]) {
                duplicateCard = true
            }
        }
        if (duplicateCard == false) {
            deck.push(card)
        }
    }
}
function drawCard(deck) {
    if (deck.length == 0) {
        shuffleDeck(deck)
    }
    theDealtCard.push(deck[0])
    deck.splice(0, 1)
    return (theDealtCard)
}

// ----- Button functions ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

// document.getElementById('standButton').onclick = function () {
// standpt1(botHand, botHandValue, botHandValue, theDealtCard)
// }
document.getElementById('dealButton').onclick = function () {
    resetEverything(playersHand, botHand)
}
document.getElementById('hitmeButton').onclick = function () {
    hitPlayer(theDealtCard, playersHand, botHandValue)
}
function gameEnd() {
    document.getElementById('dealButton').removeAttribute('disabled')
    document.getElementById('standButton').setAttribute('disabled', 'disabled')
    document.getElementById('hitmeButton').setAttribute('disabled', 'disabled')
    document.getElementById("dealerCard2").src =
        `
    picturesOfCards/${botHand[1][1]}.png
        `
    document.getElementById("botValue").innerHTML =
        `
    The Bot's Hand = ${botHandValue}
        `
}

// ----- Counting function --------------------------------------------------------------------------------------------------------------------------------------------------------------

function countHand(localHand) {
    returnedValue = 0
    Aces = 0
    for (let i = 0; i < localHand.length; i++) {
        if (localHand[i][0] == 11) {
            Aces++
        }
        localHandValue.push(localHand[i][0])
        returnedValue = localHandValue.reduce((a, b) => {
            return a + b
        })
    }
    while (returnedValue > 21 && Aces > 0) {
        Aces--
        returnedValue = (returnedValue - 10)
    }
    localHandValue.splice(0, 50)
    return returnedValue
}

// ----- Results ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function youLose() {
    gameEnd()
}

function youWin() {
    gameEnd()
}

function itsaDraw() {
    gameEnd()
}

function BLACKJACK() {
    gameEnd()
    document.getElementById("playersValue").innerHTML =
        "BLACK JACK"
}

function botBlackJack() {
    gameEnd()
    document.getElementById("botValue").innerHTML =
        "BLACK JACK"
}

// ------ New Game --------------------------------------------------------------------------------------------------------------------------------------------------------------------

function resetEverything(playersHand, botHand) {
    document.getElementById('hitmeButton').removeAttribute('disabled')
    document.getElementById('standButton').removeAttribute('disabled')
    document.getElementById('dealButton').setAttribute('disabled', 'disabled')
    playersHand.splice(0, 5)
    botHand.splice(0, 5)
    newGame()
    document.getElementById("playerCard3").src =
        "picturesOfCards\None.png"
    document.getElementById("playerCard4").src =
        "picturesOfCards\None.png"
    document.getElementById("playerCard5").src =
        "picturesOfCards\None.png"
    document.getElementById("dealerCard3").src =
        "picturesOfCards\None.png"
    document.getElementById("dealerCard4").src =
        "picturesOfCards\None.png"
    document.getElementById("dealerCard5").src =
        "picturesOfCards\None.png"
    document.getElementById("botValue").innerHTML = "The Bot's Hand = 0"
}

function newGame() {
    for (let index = 0; index < 2; index++) {
        player()
        bot()
    }
    document.getElementById("playerCard1").src =
        `
	picturesOfCards/${playersHand[0][1]}.png
	    `
    document.getElementById("playerCard2").src =
        `
	picturesOfCards/${playersHand[1][1]}.png
	    `
    document.getElementById("dealerCard1").src =
        `
	picturesOfCards/${botHand[0][1]}.png
	`
    document.getElementById("dealerCard2").src =
        "picturesOfCards\\Back.png"
    document.getElementById("playersValue").innerHTML =
        `
		Your Hand = ${playersHandValue}
		`
    if (playersHandValue == 21 && botHandValue < 21) {
        BLACKJACK()
    }
    if (botHandValue == 21 && playersHandValue < 21) {
        botBlackJack()
    }
    if (playersHandValue == 21 && botHandValue == 21) {
        itsaDraw()
    }
}

function player() {
    drawCard(deck)
    playersHand.push(theDealtCard[0])
    theDealtCard.splice(0, 1)
    countHand(playersHand)
    playersHandValue = returnedValue
}

function bot() {
    drawCard(deck)
    botHand.push(theDealtCard[0])
    theDealtCard.splice(0, 1)
    countHand(botHand)
    botHandValue = returnedValue
}

// ----- Hit functions ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

function hitPlayer() {
    if (playersHand.length < 5 && playersHandValue < 21) {
        player()
    }
    document.getElementById("playersValue").innerHTML =
        `
Your Hand = ${playersHandValue}
`
    if (playersHand.length > 2) {
        document.getElementById("playerCard3").src =
            `
	picturesOfCards/${playersHand[2][1]}.png
	`
    }
    if (playersHand.length > 3) {
        document.getElementById("playerCard4").src =
            `
	picturesOfCards/${playersHand[3][1]}.png
	`
    }
    if (playersHand.length > 4) {
        document.getElementById("playerCard5").src =
            `
	picturesOfCards/${playersHand[4][1]}.png
	`
    }
    if (playersHandValue > 21) {
        youLose()
    }
    if (playersHand.length == 5) {
        youWin()
    }
}