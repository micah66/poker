import { PlayingCard } from './PlayingCard'

class Deck {
  constructor(suites, ranks) {
    const cards = []
    for (const suite of suites) {
      for (const rank of ranks) {
        cards.push(new PlayingCard(suite, rank))
      }
    }
    this.cards = cards
  }
}

class StandardDeck extends Deck {
  constructor() {
    super(['Clubs', 'Diamonds', 'Hearts', 'Spades'], [
      'Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'
    ])
  }
}

export { Deck, StandardDeck }