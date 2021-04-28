import { SUITES, RANKS } from '../constants/playing-card'

class Deck {
  constructor(cards = []) {
    this.cards = cards
  }

  validateCanDrawCard(cardPosition) {
    if ((0 >= cardPosition) || (cardPosition > this.size())) {
      throw new Error(`RangeError: Cannot remove card from position (${cardPosition})`)
    }
  }

  validateCanInsertCard(cardPosition) {
    if ((0 >= cardPosition) || (cardPosition > this.size() + 1)) {
      throw new Error(`RangeError: Cannot insert card to position ${cardPosition}`)
    }
  }

  validateNotEmpty() {
    if (this.isEmpty()) {
      throw new Error(`IllegalOperation: Cannot draw card, deck is empty`)
    }
  }

  validateNotFull() {
    if (this.isFull()) {
      throw new Error(`IllegalOperation: Cannot insert card, deck is full`)
    }
  }

  print() {
    this.cards.forEach(console.log)
  }

  drawCard(cardPosition) {
    this.validateNotEmpty()
    this.validateCanDrawCard(cardPosition)

    return this.cards.splice(cardPosition - 1, 1)[0]
  }

  drawTopCard() {
    return this.drawCard(this.size())
  }
  
  drawBottomCard() {
    return this.drawCard(1)
  }

  insertCard(card, cardPosition) {
    this.validateNotFull()
    this.validateCanInsertCard(cardPosition)

    const { bottom, top } = this.split(cardPosition - 1)
    bottom.cards.push(card)
    
    this.stack(bottom.stack(top))
  }

  insertCardTop(card) {
    this.insertCard(card, this.size() + 1)
  }

  insertCardBottom(card) {
    this.insertCard(card, 1)
  }

  isEmpty() {
    return this.size() === 0
  }

  isFull() {
    throw new Error(`Missing implementation for this function`)
  }

  size() {
    return this.cards.length
  }

  stack(deck) {
    this.cards = this.cards.concat(deck.cards)

    return this
  }

  split(position) {
    return { 
      bottom: new Deck(this.cards.splice(0, position)),
      top: new Deck(this.cards.splice(0, this.cards.length))
    }
  }

  cut() {
    const plusMinus = (Math.random() > 0.5) ? 1 : -1
    const cut = Math.floor(Math.random() * Math.round(this.cards.length / 10)) * plusMinus

    const { bottom, top } = this.split((this.cards.length / 2) + cut)

    this.stack(top.stack(bottom))
  }

  riffleShuffle() {
    const { bottom: leftHand, top: rightHand } = this.split()

    let whichHand = 0.5
    while (!leftHand.isEmpty() && !rightHand.isEmpty()) {
      if (Math.random() > whichHand) {
        this.insertCardTop(leftHand.drawBottomCard())
        whichHand += 0.33
      } else {
        this.insertCardTop(rightHand.drawBottomCard())
        whichHand -= 0.33
      }
    }

    this.stack(rightHand.stack(leftHand))
  }

  sort(compare) {
    return this.cards.sort(compare)
  }
}

class StandardDeck extends Deck {
  static suites = Object.values(SUITES)
  static ranks = Object.values(RANKS)
  static cardColorMap = {
    clubs: 'green',
    diamonds: 'blue',
    hearts: 'red',
    spades: 'black'
  }
  static #MAX_SIZE = 52

  static #Card = class {
    constructor(suite, rank, color, id) {
      this.suite = suite
      this.rank = rank
      this.color = color
      this.id = id
    }

    getSuite() {
      return this.suite
    }

    getRank() {
      return this.rank
    }

    getId() {
      return this.id
    }
  
    toString() {
      return `${this.rank} of ${this.suite}`
    }
  }

  constructor() {
    super(StandardDeck.suites.reduce((acc, suite, i) => [
      ...acc, 
      ...StandardDeck.ranks.map((rank, j) => {
        return new StandardDeck.#Card(
          suite,
          rank,
          StandardDeck.cardColorMap[suite.toLowerCase()],
          (i * StandardDeck.ranks.length) + j + 1
        )
      })
    ], []))
  }

  sort() {
    super.sort((a,b) =>  a.id - b.id)
  }

  isFull() {
    return this.size() === StandardDeck.#MAX_SIZE
  }

  static isCard(card) {
    return (card instanceof StandardDeck.#Card)
  }
}

export { Deck, StandardDeck }