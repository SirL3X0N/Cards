//function getRandomNumber (){
  //  Math.random() * 100
//}

function getCard(cards){
    var r = Math.random() * 2
    var m = r.toFixed(0)
    cards[m][2] = !cards[m][2] 
    return cards[m][0] 
}

// for(cards[m][2]=== true){
//     getCard(cards)
// } else{
//     console.log (getCard(cards))
// }

for (let Hand = 0; Hand < 2; Hand++) {
    card = getCard(cards)
    while (card[2]===true) {
        card = getCard(cards)
    }
    console.log (card)
}



