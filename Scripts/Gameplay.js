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