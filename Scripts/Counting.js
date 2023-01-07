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