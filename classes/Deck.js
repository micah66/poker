import { PlayingCard } from './playing-card'

class Deck {
  constructor(cards) {
    this.cards = cards
  }

  static from(suites, ranks) {
    const cards = []
    let i = 0
    for (const suite of suites) {
      for (const rank of ranks) {
        cards.push(new PlayingCard(suite, rank, i++))
      }
    }
    return cards
  }

  print() {
    for (const card of this.cards) {
      console.log(card.toString())
    }
  }

  drawTopCard() {
    this.validateNotEmpty('drawTopCard')

    const card = this.cards.pop()
    this.checkIsEmpty()

    return card
  }
  
  drawBottomCard() {
    this.validateNotEmpty('drawBottomCard')

    const card = this.cards.shift()
    this.checkIsEmpty()

    return card
  }

  insertCardTop(card) {
    this.cards.push(card)
  }

  insertCardBottom(card) {
    this.cards.unshift(card)
  }

  checkIsEmpty() {
    this.isEmpty = this.cards.length === 0
  }

  validateNotEmpty(action) {
    if (this.isEmpty) throw new Error(`Illegal action "${action}": Deck is empty`)
  }

  cut() {
    const [ top, bottom ] = this.split()

    this.cards = bottom.cards.concat(top.cards)
  }

  split() {
    const plusMinus = (Math.random() > 0.5) ? 1 : -1
    const cut = Math.floor(Math.random() * Math.round(this.cards.length / 10)) * plusMinus
    const leftHand = this.cards.splice(0, (this.cards.length / 2) + cut)
    const rightHand = this.cards.splice(0, this.cards.length)

    return [ new Deck(leftHand), new Deck(rightHand) ]
  }

  riffleShuffle() {
    let [ leftHand, rightHand ] = this.split()

    let whichHand = 0.5
    while (!leftHand.isEmpty && !rightHand.isEmpty) {
      if (Math.random() > whichHand) {
        this.cards.push(leftHand.drawBottomCard())
        whichHand += 0.33
      } else {
        this.cards.push(rightHand.drawBottomCard())
        whichHand -= 0.33
      }
    }

    this.cards = this.cards.concat(leftHand.cards)
    this.cards = this.cards.concat(rightHand.cards)
  }
}

class StandardDeck extends Deck {
  constructor() {
    super(Deck.from(['Clubs', 'Diamonds', 'Hearts', 'Spades'], [
      'Ace', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'Jack', 'Queen', 'King'
    ]))

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

  sort() {
    this.cards.sort((a,b) => a.id - b.id)
  }
}

export { Deck, StandardDeck }