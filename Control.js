// list of cards

cards = [
    ['Ace , Hearts', 2 , false],['Ace , Diamonds', 3, false],['Ace , Clubs', 3, false],
// ['Ace , Spades', 3, false], ['two , Hearts', 2 , false],['Two , Daimonds', 3, false],['Two , Clubs', 3, false],['Two , Spades', 3, false],
//     ['Three , Hearts', 2 , false],['Three , Daimonds', 3, false],['Three , Clubs', 3, false],['Three , Spades', 3, false], ['Four , Hearts', 2 , false],['Four , Daimonds', 3, false],['Four , Clubs', 3, false],['Four , Spades', 3, false],
//     ['Five , Hearts', 2 , false],['Five , Daimonds', 3, false],['Five , Clubs', 3, false],['Five , Spades', 3, false], ['Six , Hearts', 2 , false],['Six , Daimonds', 3, false],['Six , Clubs', 3, false],['Six , Spades', 3, false],
//     ['Seven , Hearts', 2 , false],['Seven , Daimonds', 3, false],['Seven , Clubs', 3, false],['Seven , Spades', 3, false], ['Eight , Hearts', 2 , false],['Eight , Daimonds', 3, false],['Eight , Clubs', 3, false],['Eight , Spades', 3, false],
//     ['Nine , Hearts', 2 , false],['Nine , Daimonds', 3, false],['Nine , Clubs', 3, false],['Nine , Spades', 3, false], ['Ten , Hearts', 2 , false],['Ten , Daimonds', 3, false],['Ten , Clubs', 3, false],['Ten , Spades', 3, false],
//     ['Jack , Hearts', 2 , false],['Jack , Daimonds', 3, false],['Jack , Clubs', 3, false],['Jack , Spades', 3, false], ['Queen , Hearts', 2 , false],['Queen , Daimonds', 3, false],['Queen , Clubs', 3, false],['Queen , Spades', 3, false],
//     ['King , Hearts', 2 , false],['King , Daimonds', 3, false],['King , Clubs', 3, false],['King , Spades', 3, false],
];

// Gets a random card

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function getCard(cards){
    var gcid = getRandomInt(3) 
    return cards[gcid]
}


// Deals 2 cards to user hand. Also makes sure cards have not already been dealt.

for (let Hand = 0; Hand < 2; Hand++) {
    card = getCard(cards)
    while (card[2]=== true) {
        card = getCard(cards)
        console.log ('I ran')
    }
    cards[2] = true
    console.log (card[0])
}



