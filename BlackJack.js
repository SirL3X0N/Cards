cards = [[11, 'A'], [2, '2'], [3, '3'], [4, '4'], [5, '5'], [6, '6'], [7, '7'], [8, '8'], [9, '9'], [10, '10'], [10, 'J'], [10, 'Q'], [10, 'K'],]
suits = ['H', 'D', 'C', 'S']
deck = []
statisticbar = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
theDealtCard = []
playersHand = []
let playersHandValue = 0
botHand = []
let botHandValue = 0
localHand = []
localHandValue = []
let returnedValue = null
BuyIn = 2
Currency = 20
DD = false
gameRunning = false

// ----- Deck functions -----------------------------------------------------------------------------------------------------------------------------------------------------------------------

document.addEventListener('keydown', (event) => { keyImputed() })
function keyImputed() {
    if (gameRunning == false) {
        document.getElementById('outcome').style.display = "none"
        if (event.key == 'ArrowDown' && BuyIn > 2) {
            BuyIn--
        }
        if (event.key == 'ArrowUp' && BuyIn < Currency) {
            BuyIn++
        }
        document.getElementById('buyin').innerHTML = 'Buy In = ' + (BuyIn) + ' Coins'
    }
}
function generateCard(cards, suits) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    cardDigit = cards[getRandomInt(13)]
    cardSuit = suits[getRandomInt(4)]
    techCard = cardDigit[1] + cardSuit
    cardValue = cardDigit[0]
    cardNumber = cardDigit[1]
    card = [cardValue, techCard, cardNumber]
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
    statisticbar[5]++
    return (theDealtCard)
}

// ----- Button functions ----------------------------------------------------------------------------------------------------------------------------------------------------------------------

function closestats() {
    document.getElementById('statisticalmenu').style.display = ('none')
    document.getElementById('statstoggleon').style.display = ('block')
}
function openstatsmenu() {
    document.getElementById('statisticalmenu').style.display = ('block')
    document.getElementById('statstoggleon').style.display = ('none')
}
function disable() {
    document.getElementById('standButton').setAttribute('disabled', 'disabled')
    document.getElementById('hitmeButton').setAttribute('disabled', 'disabled')
    document.getElementById('DDButton').setAttribute('disabled', 'disabled')
}
function gameEnd() {
    disable()
    document.getElementById("dealerCard1").src =
        `
    picturesOfCards/${botHand[1][1]}.png
        `
    document.getElementById('outcome').style.display = "block"
    document.getElementById("botValue").innerHTML =
        `
        Dealer's Hand = ${botHandValue}
        `
    document.getElementById('dealButton').removeAttribute('disabled')
    document.getElementById('Coins').innerHTML =
        'Coins = ' + (Currency)
    document.getElementById('HW').innerHTML = statisticbar[0]
    document.getElementById('HL').innerHTML = statisticbar[1]
    document.getElementById('HD').innerHTML = statisticbar[2]
    document.getElementById('BJ').innerHTML = statisticbar[4]
    document.getElementById('TCD').innerHTML = statisticbar[5]
    document.getElementById('DD').innerHTML = statisticbar[6]
    if (statisticbar[9] > 0) {
        document.getElementById('DDSR').innerHTML = Math.round(statisticbar[7] / statisticbar[9] * 100) + '%'
    }
    if (statisticbar[8] > 0) {
        document.getElementById('WLR').innerHTML = Math.round(statisticbar[0] / statisticbar[8] * 100) + '%'
    }
    gameRunning = false
    if (Currency < 2) {
        openstatsmenu()
        document.getElementById('winOrLose').innerHTML =
            "You're Out of Coins"
        disable()
        document.getElementById('dealButton').setAttribute('disabled', 'disabled')
        document.getElementById('outcome').style.display = "block"
        document.getElementById('greyout').style.display = "block"
        gameRunning = true
    }
    if (BuyIn > Currency) {
        BuyIn = Currency
        document.getElementById('buyin').innerHTML = 'Buy In = ' + (BuyIn) + ' Coins'
    }
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
    statisticbar[1]++
    document.getElementById('winOrLose').innerHTML =
        "You Lost"
    gameEnd()
}
function youWin() {
    statisticbar[0]++
    if (DD == true) {
        statisticbar[7]++
        Currency = (Currency + (BuyIn * 4))
    } else {
        Currency = (Currency + (BuyIn * 2))
    }
    document.getElementById('winOrLose').innerHTML =
        "You Won"
    gameEnd()
}
function itsaDraw() {
    statisticbar[2]++
    statisticbar[8]--
    statisticbar[9]--
    if (DD == true) {
        Currency = Currency + (BuyIn * 2)
    } else {
        Currency = Currency + BuyIn
    }
    document.getElementById('winOrLose').innerHTML =
        "It's a Draw"
    gameEnd()
}
function bj() {
    statisticbar[0]++
    statisticbar[4]++
    Currency = (Currency + (BuyIn * 2))
    document.getElementById('winOrLose').innerHTML =
        "BLACK JACK!!!"
    gameEnd()
    document.getElementById("playersValue").innerHTML =
        "BLACK JACK!!!"
}
function bbj() {
    statisticbar[1]++
    statisticbar[4]++
    document.getElementById('winOrLose').innerHTML =
        "You Lost"
    gameEnd()
    document.getElementById("botValue").innerHTML =
        "BLACK JACK!!!"
}

// ------ New Game --------------------------------------------------------------------------------------------------------------------------------------------------------------------

function resetEverything(playersHand, botHand) {
    document.getElementById('DDButton').removeAttribute('disabled')
    document.getElementById('hitmeButton').removeAttribute('disabled')
    document.getElementById('standButton').removeAttribute('disabled')
    document.getElementById('dealButton').setAttribute('disabled', 'disabled')
    DD = false
    playersHand.splice(0, 5)
    botHand.splice(0, 5)
    for (let index = 0; index < 5; index++) {
        document.getElementById("playerCard" + [index]).src =
            "picturesOfCards/None.png"
        document.getElementById("dealerCard" + [index]).src =
            "picturesOfCards/None.png"
    }
    document.getElementById("botValue").innerHTML = "Dealer's Hand = 0"
    document.getElementById('outcome').style.display = "none"
    newGame()
}
function newGame() {
    gameRunning = true
    statisticbar[3]++
    statisticbar[8]++
    document.getElementById('TH').innerHTML = statisticbar[3]
    Currency = Currency - BuyIn
    document.getElementById('Coins').innerHTML =
        'Coins = ' + (Currency)
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
    document.getElementById('TCD').innerHTML = statisticbar[5]
    if (Currency < BuyIn) {
        document.getElementById('DDButton').setAttribute('disabled', 'disabled')
    }
    if (playersHand[0][2] == playersHand[1][2]) {
        document.getElementById('splitButton').removeAttribute('disabled')
    }
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
    document.getElementById('DDButton').setAttribute('disabled', 'disabled')
    if (playersHand.length < 5 && playersHandValue < 21) {
        player()
    }
    for (let index = 2; index < playersHand.length; index++) {
        document.getElementById("playerCard" + [index]).src =
            `
         picturesOfCards/${playersHand[index][1]}.png
            `
        document.getElementById('TCD').innerHTML = statisticbar[5]
    }
    if (playersHandValue > 21) {
        youLose()
    } else if (playersHand.length == 5 && playersHandValue < 22) {
        youWin()
    } else if (playersHandValue == 21) {
        stand()
    }
}
function DoubleDown() {
    statisticbar[6]++
    statisticbar[9]++
    document.getElementById('DD').innerHTML = statisticbar[6]
    DD = true
    Currency = Currency - BuyIn
    document.getElementById('Coins').innerHTML =
        'Coins = ' + (Currency)
    player()
    document.getElementById("playerCard2").src =
        `
        picturesOfCards/${playersHand[2][1]}.png
            `
    document.getElementById('TCD').innerHTML = statisticbar[5]
    if (playersHandValue > 21) {
        youLose()
    } else { stand(botHand, botHandValue, botHandValue, theDealtCard) }
}
function Split() {
    for (let index = 0; index < playersHand.length; index++) {
        console.log(playersHand[index][2])
    }
    document.getElementById('splitButton').setAttribute('disabled', 'disabled')
}

// ----- Stand functions ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

function stand() {
    disable()
    while (botHandValue < 17 && botHand.length < 5) {
        bot()
    }
    document.getElementById("dealerCard1").src =
        `
    picturesOfCards/${botHand[1][1]}.png
        `
    for (let index = 2; index < botHand.length; index++) {
        setTimeout(() => {
            document.getElementById("dealerCard" + [index]).src =
                `
    picturesOfCards/${botHand[index][1]}.png
        ` }, [index] * 200)
    }
    setTimeout(() => {
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
    }, (botHand.length) * 200)
}