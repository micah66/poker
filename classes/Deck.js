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

  print() {
    for (const card of this.cards) {
      console.log(card.toString())
    }
  }
}

class StandardDeck extends Deck {
  constructor() {
    super(['Clubs', 'Diamonds', 'Hearts', 'Spades'], [
      'Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'
    ])

    const cardColorMap = {
      clubs: 'green',
      diamonds: 'blue',
      hearts: 'red',
      spades: 'black'
    }

    for (const card of this.cards) {
      card.color = cardColorMap[card.suite.toLowerCase()]
    }
  }
}

export { Deck, StandardDeck }