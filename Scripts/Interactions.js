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

function closestats() {
    document.getElementById('statisticalmenu').style.display = ('none')
    document.getElementById('statstoggleon').style.display = ('block')
}
function openstatsmenu() {
    document.getElementById('statisticalmenu').style.display = ('block')
    document.getElementById('statstoggleon').style.display = ('none')
}
