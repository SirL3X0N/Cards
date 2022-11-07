cards = [2,3,4,5,6,7,8,9,10,'J','Q','K','A']
suits = ['H', 'D', 'C', 'S']
hand = []

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function generateCard(cards, suits) {
    cardDigit = cards[getRandomInt(13)]
    cardSuit = suits[getRandomInt(4)]
    card = cardDigit + cardSuit
    return card
}

hand.push(generateCard(cards, suits))

while (hand.length < 2) {
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