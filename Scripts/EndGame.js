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