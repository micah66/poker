import { StandardDeck } from './Deck'

class Dealer {
  constructor(deck) {
    this.deck = deck
  }

  shuffle() {
    const plusMinus = (Math.random() > 0.5) ? 1 : -1
    const cut = Math.floor(Math.random() * 5) * plusMinus
    const leftHand = this.deck.cards.splice(0, (this.deck.cards.length / 2) + cut)
    const rightHand = this.deck.cards.splice(0, this.deck.cards.length)
    
    while (leftHand.length && rightHand.length) {
      let mult = 0.5
      let hand = Math.random() > mult ? 'left' : 'right'
      if (hand === 'left') {
        this.deck.cards.push(leftHand.shift())
        mult += 0.1
      } else {
        this.deck.cards.push(rightHand.shift())
        mult -= 0.1
      }
    }

    while (leftHand.length) {
      this.deck.cards.push(leftHand.shift())
    }

    while (rightHand.length) {
      this.deck.cards.push(rightHand.shift())
    }
  }
}

class PokerDealer extends Dealer {
  constructor() {
    super(new StandardDeck())
  }
}

export { PokerDealer }