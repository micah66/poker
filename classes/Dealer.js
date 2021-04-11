import { StandardDeck } from './deck'

class Dealer {
  constructor(deck) {
    this.deck = deck
  }

  shuffle() {
    this.deck.riffleShuffle()
  }

  sort() {
    this.deck.sort()
  }
}

class PokerDealer extends Dealer {
  constructor() {
    super(new StandardDeck())
  }
}

export { PokerDealer }