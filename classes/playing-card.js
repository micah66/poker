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

export { PlayingCard }