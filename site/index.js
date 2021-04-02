import { PokerDealer } from '../classes/Dealer'

const root = document.getElementById('root')
root.style.margin = '0'
root.style.backgroundColor = 'lightgrey'
const header = document.createElement('header')
const h1 = document.createElement('h1')

h1.innerHTML = 'Poker'
h1.style.backgroundColor = 'red'
h1.style.margin = '0'
h1.style.padding = '1rem'
header.appendChild(h1)
header.style.textAlign = 'center'
header.style.fontSize = ''

root.appendChild(header)

const shuffleBtn = document.createElement('button')

shuffleBtn.innerHTML = 'Shuffle'
root.appendChild(shuffleBtn)
shuffleBtn.id = 'shuffleBtn'

const dealer = new PokerDealer()
shuffleBtn.onclick = () => {
  dealer.shuffle()
  //dealer.deck.print()
  renderDeck()
}

function renderDeck() {
  let deckDiv = document.getElementById('deck')
  if (deckDiv) deckDiv.innerHTML = ''
  else deckDiv = document.createElement('div')
  deckDiv.id = 'deck'
  root.appendChild(deckDiv)
  for (const card of dealer.deck.cards) {
    const cardDiv = document.createElement('span')
    cardDiv.classList.add('card')
    cardDiv.innerHTML = card.toString()
    cardDiv.style.marginRight = '10px'
    cardDiv.style.color = card.color
    deckDiv.appendChild(cardDiv)
  }
}

renderDeck()
