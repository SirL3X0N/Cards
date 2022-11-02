function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

cards = [' Two ',' Three ',' Four ', ' Five ', ' Six ', ' Seven ', ' Eight ', ' Nine ', ' Ten ', ' Jack ', ' Queen ', ' King ', ' Ace ']
suits = [' Hearts ', ' Daimonds ', ' Clubs ', ' Spades ']
hand = []

function generateCard(cards, suits) {
    cardDigit = cards[getRandomInt(13)]
    cardSuit = suits[getRandomInt(4)]
    card = cardDigit + 'of' + cardSuit
    return card
}

hand.push(generateCard(cards, suits))

while (hand.length < 5) {
    card = generateCard(cards, suits)
    duplicateCard = false

    // loop through cards in hand to see if any matches the newly generated card
    for (let index = 0; index < hand.length; index++) {
        if (card == hand[index]) {
            duplicateCard = true
        }
    }

    if (!duplicateCard) {
        hand.push(card)
    }
}

console.log(hand)
