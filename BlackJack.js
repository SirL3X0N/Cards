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

document.getElementById('standButton').onclick = function () {
    stand(botHand, botHandValue, botHandValue, theDealtCard)
}
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
    document.getElementById("dealerCard1").src =
        `
    picturesOfCards/${botHand[1][1]}.png
        `
    document.getElementById('outcome').style.display = "block"
    document.getElementById("botValue").innerHTML =
        `
        Dealer's Hand = ${botHandValue}
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
    document.getElementById('winOrLose').innerHTML =
        "You Lost"
}
function youWin() {
    document.getElementById('winOrLose').innerHTML =
        "You Won"
    gameEnd()
}
function itsaDraw() {
    document.getElementById('winOrLose').innerHTML =
        "It's a Draw"
    gameEnd()
}
function bj() {
    gameEnd()
    document.getElementById("playersValue").innerHTML =
        "BLACK JACK!!!"
    document.getElementById('winOrLose').innerHTML =
        "BLACK JACK!!!"
}
function bbj() {
    gameEnd()
    document.getElementById("botValue").innerHTML =
        "BLACK JACK!!!"
    document.getElementById('winOrLose').innerHTML =
        "You Lost"
}

// ------ New Game --------------------------------------------------------------------------------------------------------------------------------------------------------------------

function resetEverything(playersHand, botHand) {
    document.getElementById('hitmeButton').removeAttribute('disabled')
    document.getElementById('standButton').removeAttribute('disabled')
    document.getElementById('dealButton').setAttribute('disabled', 'disabled')
    playersHand.splice(0, 5)
    botHand.splice(0, 5)
    for (let index = 0; index < 5; index++) {
        document.getElementById("playerCard" + [index]).src =
            "picturesOfCards\None.png"
        document.getElementById("dealerCard" + [index]).src =
            "picturesOfCards\None.png"
    }
    document.getElementById("botValue").innerHTML = "Dealer's Hand = 0"
    document.getElementById('outcome').style.display = "none"
    newGame()
}
function newGame() {
    for (let index = 0; index < 2; index++) {
        player()
        bot()
        document.getElementById("playerCard" + [index]).src =
            `
        picturesOfCards/${playersHand[index][1]}.png
            `
    }
    document.getElementById("dealerCard0").src =
        `
	picturesOfCards/${botHand[0][1]}.png
	    `
    document.getElementById("dealerCard1").src =
        "picturesOfCards\\Back.png"
    if (playersHandValue == 21 && botHandValue == 21) {
        itsaDraw()
    } else if (playersHandValue == 21) {
        bj()
    } else if (botHandValue == 21) {
        bbj()
    }
}
function player() {
    drawCard(deck)
    playersHand.push(theDealtCard[0])
    theDealtCard.splice(0, 1)
    countHand(playersHand)
    playersHandValue = returnedValue
    document.getElementById("playersValue").innerHTML =
        `
 Your Hand = ${playersHandValue}
    `
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
    for (let index = 2; index < playersHand.length; index++) {
        document.getElementById("playerCard" + [index]).src =
            `
         picturesOfCards/${playersHand[index][1]}.png
            `
    }
    if (playersHandValue > 21) {
        youLose()
    } else if (playersHand.length == 5 && playersHandValue > 22) {
        youWin()
    } else if (playersHandValue == 21) {
        stand()
    }
}

// ----- Stand functions ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function stand() {
    while (botHandValue < 17 && botHand.length < 5) {
        bot()
    }
    for (let index = 2; index < botHand.length; index++) {
        document.getElementById("dealerCard" + [index]).src =
            `
        picturesOfCards/${botHand[index][1]}.png
            `
    }
    if (botHandValue > 21) {
        youWin()
    } else if (botHand.length == 5 && botHandValue < 22) {
        youLose()
    } else if (botHandValue > playersHandValue) {
        youLose()
    } else if (playersHandValue > botHandValue) {
        youWin()
    } else if (playersHandValue == botHandValue) {
        itsaDraw()
    }
}