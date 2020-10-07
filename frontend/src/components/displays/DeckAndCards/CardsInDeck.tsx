import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'

import { Card } from '../../../interfaces'
import { GET_DECK_BY_ID } from '../../../queries'
import CardView from './CardView'
import { Button, Col, Row } from 'react-bootstrap'

const CardsInDeck: React.FC<{ id: string }> = ({ id }) => {
  const [index, setIndex] = useState(0)
  const [cards, setCards] = useState([])
  const getDeckById = useQuery(GET_DECK_BY_ID, { variables: { id } })

  useEffect(() => {
    if (!getDeckById.loading) {
      const deck = getDeckById.data.getDeck
      setCards(deck.cards.map((card: Card) => <CardView
        key={card.id}
        term={card.term}
        definition={card.definition}
        termUp={true} />
      ))
    }
  }, [getDeckById, setCards])

  if (getDeckById.loading) {
    return <>loading...</>
  }

  const deck = getDeckById.data.getDeck
  const name = deck.name
  const description = deck.description

  const shuffle = () => {
    setCards(cards.shuffled())
  }

  const setIndexOverflow = (index: number) => {
    const maxIndex = cards.length - 1
    if (index < 0) {
      setIndex(maxIndex)
    } else if (index > maxIndex) {
      setIndex(0)
    } else {
      setIndex(index)
    }
  }

  return (
    <div>
      <h1>{name}</h1>
      <h4>{description}</h4>
      <div>
        {
          cards[index]
        }
        <Row>
          <Col><Button block variant="primary" style={{ position: 'relative' }} onClick={() => setIndexOverflow(index - 1)}>Prev</Button></Col>
          <Col><Button block variant="primary" style={{ position: 'relative' }} onClick={shuffle}>Shuffle</Button></Col>
          <Col><Button block variant="primary" style={{ position: 'relative' }} onClick={() => setIndexOverflow(index + 1)}>Next</Button></Col>
        </Row>
      </div>
    </div>
  )
}

export default CardsInDeck