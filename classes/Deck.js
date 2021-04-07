import { PlayingCard } from './playing-card'

class Deck {
  constructor(cards) {
    this.cards = cards
  }

  static of(suites, ranks) {
    const cards = []
    for (const suite of suites) {
      for (const rank of ranks) {
        cards.push(new PlayingCard(suite, rank))
      }
    }
    return cards
  }

  takeTopCard() {
    const card = this.cards.pop()
    this.updateIsEmpty()

    return card
  }
  
  takeBottomCard() {
    const card = this.cards.shift()
    this.updateIsEmpty()

    return card
  }

  insertCardTop(card) {
    this.cards.push(card)
    this.updateIsEmpty()
  }

  insertCardBottom(card) {
    this.cards.unshift(card)
    this.updateIsEmpty()
  }

  updateIsEmpty() {
    this.isEmpty = this.cards.length === 0
  }

  cut() {
    const [ top, bottom ] = this.split()

    this.cards = bottom.cards.concat(top.cards)
  }

  split() {
    const plusMinus = (Math.random() > 0.5) ? 1 : -1
    const cut = Math.floor(Math.random() * 5) * plusMinus
    const leftHand = this.cards.splice(0, (this.cards.length / 2) + cut)
    const rightHand = this.cards.splice(0, this.cards.length)

    return [ new Deck(leftHand), new Deck(rightHand) ]
  }

  shuffle() {
    let [ leftHand, rightHand ] = this.split()

    let whichHand = 0.5
    while (!leftHand.isEmpty && !rightHand.isEmpty) {
      if (Math.random() > whichHand) {
        this.cards.push(leftHand.takeBottomCard())
        whichHand += 0.33
      } else {
        this.cards.push(rightHand.takeBottomCard())
        whichHand -= 0.33
      }
    }

    this.cards = this.cards.concat(leftHand.cards)
    this.cards = this.cards.concat(rightHand.cards)
  }
}

class StandardDeck extends Deck {
  constructor() {
    super(Deck.of(['Clubs', 'Diamonds', 'Hearts', 'Spades'], [
      'Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'
    ]))
  }
}

export { Deck, StandardDeck }