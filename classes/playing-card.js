class PlayingCard {
  constructor(suite, rank, id) {
    this.suite = suite
    this.rank = rank
    this.id = id
  }

  toString() {
    return `${this.rank} of ${this.suite}`
  }
}

const SUITES = {
  CLUBS: 'Clubs',
  DIAMONDS: 'Diamonds',
  HEARTS: 'Hearts',
  SPADES: 'Spades'
}

const RANKS = {
  ACE: 'Ace',
  TWO: 'Two',
  THREE: 'Three',
  FOUR: 'Four',
  FIVE: 'Five',
  SIX: 'Six',
  SEVEN: 'Seven',
  EIGHT: 'Eight',
  NINE: 'Nine',
  TEN: 'Ten',
  JACK: 'Jack',
  QUEEN: 'Queen',
  KING: 'King'
}

export { PlayingCard, SUITES, RANKS }