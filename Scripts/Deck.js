cards = [[11, 'A'], [2, '2'], [3, '3'], [4, '4'], [5, '5'], [6, '6'], [7, '7'], [8, '8'], [9, '9'], [10, '10'], [10, 'J'], [10, 'Q'], [10, 'K'],]
suits = ['H', 'D', 'C', 'S']

function shuffleDeck(deck) {
    function generateCard(cards, suits) {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        cardDigit = cards[getRandomInt(13)]
        cardSuit = suits[getRandomInt(4)]
        card = [cardDigit[0], cardDigit[1] + cardSuit, cardDigit[1]]
        return card
    }
    while (deck.length < 52) {
        generateCard(cards, suits)
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