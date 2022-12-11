// ------------------- These are the stariting values and arrays -------------------------------------------------------------

cards = [[11, 'A'], [2, '2'], [3, '3'], [4, '4'], [5, '5'], [6, '6'], [7, '7'], [8, '8'], [9, '9'], [10, '10'], [10, 'J'], [10, 'Q'], [10, 'K'],]
suits = ['H', 'D', 'C', 'S']
deck = []
theDealtCard = []
playersHand = []
playersHandValue = []
botHand = []
botHandValue = []

// ---------------------------- These are the buttons -------------------------------------------------------------------------

document.getElementById('standButton').onclick = function () {
	standpt1(botHand, botHandValue, theBotHandValue, theDealtCard)
}
document.getElementById('dealButton').onclick = function () {
	resetEverything(playersHand, botHand)
}

document.getElementById('hitmeButton').onclick = function () {
	hitPlayer(theDealtCard, playersHand, theBotHandValue)
}

// ------------------------ These are the deck functions ----------------------------------------------------------------------

function generateCard(cards, suits) {
	function getRandomInt(max) {
		return Math.floor(Math.random() * max);
	}
	cardDigit = cards[getRandomInt(13)]
	cardSuit = suits[getRandomInt(4)]
	techCard = cardDigit[1] + cardSuit
	cardValue = cardDigit[0]
	card = [cardValue, techCard]
	return card
}

function shuffleDeck(deck) {
	while (deck.length < 52) {
		card = generateCard(cards, suits)
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
	console.log(deck)
	theDealtCard.push(deck[0])
	deck.splice(0, 1)
}

// ---------------------- These are the game functions -----------------------------------------------------------------------

function youBusted(theBotHandValue) {
	document.getElementById('dealButton').removeAttribute('disabled')
	document.getElementById('standButton').setAttribute('disabled', 'disabled')
	document.getElementById('hitmeButton').setAttribute('disabled', 'disabled')
	document.getElementById("dealerCard2").src =
		`
	picturesOfCards/${botHand[1][1]}.png
	`
	document.getElementById("botValue").innerHTML =
		`
The Bot's Hand = ${theBotHandValue}
`
}

// ---------------------- These are the starting functions -------------------------------------------------------------------

function resetEverything(playersHand, botHand) {
	document.getElementById('hitmeButton').removeAttribute('disabled')
	document.getElementById('standButton').removeAttribute('disabled')
	document.getElementById('dealButton').setAttribute('disabled', 'disabled')
	playersHand.splice(0, 5)
	botHand.splice(0, 5)
	newGame(theDealtCard, playersHand, botHand)
	document.getElementById("playerCard3").src =
		"picturesOfCards\None.png"
	document.getElementById("playerCard4").src =
		"picturesOfCards\None.png"
	document.getElementById("playerCard5").src =
		"picturesOfCards\None.png"
	document.getElementById("dealerCard3").src =
		"picturesOfCards\None.png"
	document.getElementById("dealerCard4").src =
		"picturesOfCards\None.png"
	document.getElementById("dealerCard5").src =
		"picturesOfCards\None.png"
	document.getElementById("botValue").innerHTML = "The Bot's Hand = 0"
}

function newGame(theDealtCard, playersHand) {
	for (let index = 0; index < 2; index++) {
		drawCard(deck)
		playersHand.push(theDealtCard[0])
		theDealtCard.splice(0, 1)
	}
	for (let index = 0; index < 2; index++) {
		drawCard(deck)
		botHand.push(theDealtCard[0])
		theDealtCard.splice(0, 1)
	}
	countMyHand(playersHandValue, playersHand)
	countdealersHand(botHandValue, botHand)
	document.getElementById("playerCard1").src =
		`
	picturesOfCards/${playersHand[0][1]}.png
	`
	document.getElementById("playerCard2").src =
		`
	picturesOfCards/${playersHand[1][1]}.png
	`
	document.getElementById("dealerCard1").src =
		`
	picturesOfCards/${botHand[0][1]}.png
	`
	document.getElementById("dealerCard2").src =
		"picturesOfCards\\Back.png"
}

// ---------------------- These are the player functions -------------------------------------------------------------------

function countMyHand(playersHandValue, playersHand) {
	playersHandValue.splice(0, 50)
	Aces = 0
	for (let i = 0; i < playersHand.length; i++) {
		if (playersHand[i][0] == 11) {
			Aces++
		}
		playersHandValue.push(playersHand[i][0])
		thePlayersHandValue = playersHandValue.reduce((a, b) => {
			return a + b
		})
	}
	while (thePlayersHandValue > 21 && Aces > 0) {
		Aces--
		thePlayersHandValue = (thePlayersHandValue - 10)
	}
	document.getElementById("playersValue").innerHTML =
		`
		Your Hand = ${thePlayersHandValue}
		`
}

function hitPlayer(theDealtCard, playersHand, theBotHandValue) {
	if (playersHand.length < 5 && thePlayersHandValue < 21) {
		drawCard(deck)
		playersHand.push(theDealtCard[0])
		theDealtCard.splice(0, 1)
	}
	countMyHand(playersHandValue, playersHand)
	console.log(thePlayersHandValue)
	if (playersHand.length > 2) {
		document.getElementById("playerCard3").src =
			`
	picturesOfCards/${playersHand[2][1]}.png
	`
	}
	if (playersHand.length > 3) {
		document.getElementById("playerCard4").src =
			`
	picturesOfCards/${playersHand[3][1]}.png
	`
	}
	if (playersHand.length > 4) {
		document.getElementById("playerCard5").src =
			`
	picturesOfCards/${playersHand[4][1]}.png
	`
	}
	if (thePlayersHandValue > 21) {
		youBusted(theBotHandValue)
	}
	if (playersHand.length == 5) {
		youBusted(theBotHandValue)
	}
}

// ---------------------- These are the dealer functions -------------------------------------------------------------------

function countdealersHand(botHandValue, botHand, theBotHandValue) {
	theBotHandValue = 0
	botHandValue.splice(0, 50)
	Bces = 0
	for (let i = 0; i < botHand.length; i++) {
		if (botHand[i][0] == 11) {
			Bces++
		}
		botHandValue.push(botHand[i][0])
		theBotHandValue = botHandValue.reduce((a, b) => {
			return a + b
		})
	}
	while (theBotHandValue > 21 && Bces > 0) {
		Bces--
		theBotHandValue = (theBotHandValue - 10)
	}
	if (botHand.length > 2) {
		document.getElementById("botValue").innerHTML =
			`
The Bot's Hand = ${theBotHandValue}
`
	}
}

function standpt1(botHand, theBotHandValue) {
	document.getElementById('standButton').setAttribute('disabled', 'disabled')
	document.getElementById('dealButton').removeAttribute('disabled')
	document.getElementById('hitmeButton').setAttribute('disabled', 'disabled')
	document.getElementById("dealerCard2").src =
		`
picturesOfCards/${botHand[1][1]}.png
`
	document.getElementById("botValue").innerHTML =
		`
The Bot's Hand = ${theBotHandValue}
`
	standpt2(theBotHandValue, botHand, botHandValue)
}

function standpt2(theBotHandValue, botHand, botHandValue) {
	console.log(botHand)
	console.log(theBotHandValue)
	countdealersHand(botHandValue, botHand)
	if (theBotHandValue < 17) {
		drawCard(deck)
		botHand.push(theDealtCard[0])
		theDealtCard.splice(0, 1)
	}

	console.log(botHand)
	console.log(theBotHandValue)
	countdealersHand(botHandValue, botHand)
	if (theBotHandValue < 17) {
		drawCard(deck)
		botHand.push(theDealtCard[0])
		theDealtCard.splice(0, 1)
	}

	console.log(botHand)
	console.log(theBotHandValue)
	countdealersHand(botHandValue, botHand)
	if (theBotHandValue < 17) {
		drawCard(deck)
		botHand.push(theDealtCard[0])
		theDealtCard.splice(0, 1)
	}
	standpt3(botHand)
}

function standpt3(botHand) {
	if (botHand.length > 2) {
		document.getElementById("dealerCard3").src =
			`
picturesOfCards/${botHand[2][1]}.png
`
	}
	if (botHand.length > 3) {
		document.getElementById("dealerCard4").src =
			`
picturesOfCards/${botHand[3][1]}.png
`
	}
	if (botHand.length > 4) {
		document.getElementById("dealerCard5").src =
			`
picturesOfCards/${botHand[4][1]}.png
`
	}
}
