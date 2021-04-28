import { expect } from 'chai'
import { StandardDeck } from '../classes/deck'

describe('Deck', () => {
  describe('StandardDeck', () => {
    describe('Initialization', () => {
      const deck = new StandardDeck()
      it('should consist of 52 cards', () => {
  
        expect(deck.size()).to.equal(52)
      })
      it('should consist of the four standard suites with 13 cards per suite', () => {
        const cards = deck.cards.reduce((cards, card) => {
          cards[card.suite] = cards[card.suite] || []
          cards[card.suite].push(card.rank)
          return cards
        }, {})
  
        expect(cards).to.deep.equals({
          'Clubs': [
            'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'
          ],
          'Diamonds': [
            'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'
          ],
          'Hearts': [
            'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'
          ],
          'Spades': [
            'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Jack', 'Queen', 'King'
          ]
        })
      })
    })

    describe('Shuffle', () => {
      const deck = new StandardDeck()
      it('should contain 52 cards after a single riffle shuffle', () => {

        deck.riffleShuffle()

        expect(deck.size()).to.equal(52)
      })
      it('should contain 52 cards after 100 riffle shuffles', () => {
        for (let i = 0; i < 100; i++) {
          deck.riffleShuffle()
        }

        expect(deck.size()).to.equal(52)
      })
    })

    describe('Draw Card', () => {
      it('should return the drawn card', () => {
        const deck = new StandardDeck()
        const card = deck.drawCard(Math.floor(Math.random() * 52) + 1)

        expect(StandardDeck.isCard(card)).to.equal(true)
      })
      it('should remove the card from the deck', () => {
        const deck = new StandardDeck()
        const originalSize = deck.size()
        const card = deck.drawCard(1)
        const newSize = deck.size()

        expect(newSize).to.equal(originalSize - 1)
      })
      it('should allow drawing all cards in the deck', () => {
        const deck = new StandardDeck()
        const deckSize = deck.size()

        for (let i = 0; i < deckSize; i++) {
          const card = deck.drawCard(1)
        }
      })

      describe('Draw Top Card', () => {
        const deck = new StandardDeck()
        it('should return the top card of the deck', () => {
          const card = deck.drawTopCard()
  
          expect(card.getSuite()).to.equal('Spades')
          expect(card.getRank()).to.equal('King')
          expect(card.getId()).to.equal(52)
        })
        it('should return the next top card in the deck', () => {
          const card = deck.drawTopCard()
  
          expect(card.getSuite()).to.equal('Spades')
          expect(card.getRank()).to.equal('Queen')
          expect(card.getId()).to.equal(51)
        })
        it('should allow drawing the top card for all cards in deck', () => {
          const newDeck = new StandardDeck()
          const deckSize = newDeck.size()

          for (let i = 0; i < deckSize; i++) {
            newDeck.drawTopCard()
          }
        })
      })

      describe('Draw Bottom Card', () => {
        const deck = new StandardDeck()
        it('should return the bottom card of the deck', () => {
          const card = deck.drawBottomCard()
  
          expect(card.getSuite()).to.equal('Clubs')
          expect(card.getRank()).to.equal('Ace')
          expect(card.getId()).to.equal(1)
        })
        it('should return the next bottom card of the deck', () => {
          const card = deck.drawBottomCard()
  
          expect(card.getSuite()).to.equal('Clubs')
          expect(card.getRank()).to.equal('Two')
          expect(card.getId()).to.equal(2)
        })
        it('should allow drawing the bottom card for all cards in deck', () => {
          const newDeck = new StandardDeck()
          const deckSize = newDeck.size()

          for (let i = 0; i < deckSize; i++) {
            newDeck.drawBottomCard()
          }
        })
      })
    })

    describe('Insert Card', () => {
      it('should insert the card into the deck', () => {
        const deck = new StandardDeck()
        const deckSize = deck.size()
        const card = deck.drawTopCard()

        deck.insertCard(card, 10)
 
        expect(deck.size()).to.equal(deckSize)
      })
      it('should insert the card to the specified location in the deck', () => {
        const deck = new StandardDeck()
        const cardToInsert = deck.drawTopCard()
        const insertPosition = 10
        deck.insertCard(cardToInsert, insertPosition)

        let card
        for (let i = 0; i < insertPosition; i++) {
          card = deck.drawBottomCard()
        }

        expect(cardToInsert).to.equal(card)
      })

      describe('Insert Bottom', () => {
        it('should insert the card to the bottom of the deck', () => {
          const deck = new StandardDeck()
          const card = deck.drawTopCard()

          deck.insertCardBottom(card)

          expect(card).to.equal(deck.drawBottomCard())
        })
      })
      describe('Insert Top', () => {
        it('should insert the card to the top of the deck', () => {
          const deck = new StandardDeck()
          const card = deck.drawBottomCard()

          deck.insertCardTop(card)

          expect(card).to.equal(deck.drawTopCard())
        })
      })
    })

    describe('IsEmpty', () => {
      it('should return true when deck is empty, otherwise, false', () => {
        const deck = new StandardDeck()
        const deckSize = deck.size()

        let card
        for (let i = 0; i < deckSize; i++) {
          expect(deck.isEmpty()).to.equal(false)
          card = deck.drawTopCard()
        }

        expect(deck.isEmpty()).to.equal(true)

        deck.insertCardBottom(card)

        expect(deck.isEmpty()).to.equal(false)
      })
    })

    describe('IsFull', () => {
      it('should return true when deck is full, otherwise, false', () => {
        const deck = new StandardDeck()
        const deckSize = deck.size()
        
        expect(deck.isFull()).to.equal(true)

        const card = deck.drawTopCard()

        expect(deck.isFull()).to.equal(false)

        deck.insertCardTop(card)
        
        expect(deck.isFull()).to.equal(true)

        for (let i = 0; i < deckSize; i++) {
          deck.drawTopCard()
          expect(deck.isFull()).to.equal(false)
        }
      })
    })

    /*
    it('should throw an error when drawing from an empty deck', () => {
      const deck = new StandardDeck()
      while (deck.size()) {
        deck.drawTopCard()
      }
      expect(deck.size()).to.equal(0)
      expect(deck.drawTopCard()).to.throw('IllegalOperation: Cannot draw card, deck is empty')
      expect(deck.drawBottomCard()).to.throw('IllegalOperation: Cannot draw card, deck is empty')
      expect(deck.drawCard(5)).to.throw('IllegalOperation: Cannot draw card, deck is empty')
    })
    */
  })
})