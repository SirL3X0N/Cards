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