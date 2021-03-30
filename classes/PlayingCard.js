class PlayingCard {
  constructor(suite, rank) {
    this.suite = suite
    this.rank = rank
  }

  toString() {
    return `${this.rank} of ${this.suite}`
  }
}

export { PlayingCard }