import { Deck, StandardDeck } from './deck'

class Dealer {
  constructor(deck) {
    this.deck = deck
    this.discardPile = new Deck([])
  }

  dealCard(player) {
    player.receiveCard(this.deck.drawTopCard())
  }

  shuffle() {
    this.deck.riffleShuffle()
  }

  sort() {
    this.deck.sort()
  }

  dealCards(players, amount) {
    while(amount--) {
      players.forEach(player => this.dealCard(player))
    }
  }
}

class PokerDealer extends Dealer {
  constructor() {
    super(new StandardDeck())
  }

  dealCards(players) {
    super.dealCards(players, 2)
  }

  burnCard() {
    this.discardPile.insertCardTop(this.deck.drawTopCard())
  }

  dealFlop(table) {
    this.burnCard()
    for (const i = 0; i < 3; i++) {
      this.table.playCard(this.deck.drawTopCard())
    }
  }

  dealTurn() {
    this.burnCard()
    this.table.playCard(this.deck.drawTopCard())
  }

  dealRiver() {
    this.dealTurn()
  }
}

export { PokerDealer }