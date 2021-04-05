import { PlayingCard } from './playing-card'

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

  takeTopCard() {
    return this.cards.pop()
  }
  
  takeBottomCard() {
    return this.cards.shift()
  }

  cut() {
    const [ top, bottom ] = this.split()

    return bottom.concat(top)
  }

  split() {
    const plusMinus = (Math.random() > 0.5) ? 1 : -1
    const cut = Math.floor(Math.random() * 5) * plusMinus
    const leftHand = this.cards.splice(0, (this.cards.length / 2) + cut)
    const rightHand = this.cards.splice(0, this.cards.length)

    return [ leftHand, rightHand ]
  }

  shuffle() {
    const [ leftHand, rightHand ] = this.splitDeck(this.cards)

    let whichHand = 0.5
    while (leftHand.length && rightHand.length) {
      if (Math.random() > whichHand) {
        this.cards.push(this.takeBottomCard(leftHand))
        whichHand += 0.33
      } else {
        this.cards.push(this.takeBottomCard(rightHand))
        whichHand -= 0.33
      }
    }

    leftHand.forEach(card => this.cards.push(this.takeBottomCard(leftHand)))
    rightHand.forEach(card => this.cards.push(this.takeBottomCard(rightHand)))
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