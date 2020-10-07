import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Button, Col, Form, Row } from 'react-bootstrap'

import CardView from './CardView'

import { Card } from '../../../interfaces'
import { GET_DECK_BY_ID } from '../../../queries'

const CardsInDeck: React.FC<{ id: string }> = ({ id }) => {
  const [index, setIndex] = useState(0)
  const [cards, setCards] = useState([])
  const [termUp, setTermUp] = useState(true)
  const getDeckById = useQuery(GET_DECK_BY_ID, { variables: { id } })

  useEffect(() => {
    if (!getDeckById.loading && getDeckById.data) {
      const deck = getDeckById.data.getDeck
      setCards(deck.cards.map((card: Card) => <CardView
        key={card.id}
        term={card.term}
        definition={card.definition}
        termUp={termUp} />
      ))
    }
  }, [getDeckById, setCards, termUp])

  if (getDeckById.loading) {
    return <>loading...</>
  }
  if (!getDeckById?.data?.getDeck) {
    return <>Deck not found :(</>
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
      <Form.Check type="checkbox" onClick={() => { setTermUp(!termUp) }} defaultChecked={termUp} label="Show Term First" />
      <div>
        {
          cards[index]
        }
        <Row style={{ marginTop: '10px' }}>
          <Col><Button block variant="primary" style={{ position: 'relative' }} onClick={() => setIndexOverflow(index - 1)}>Prev</Button></Col>
          <Col><Button block variant="primary" style={{ position: 'relative' }} onClick={shuffle}>Shuffle</Button></Col>
          <Col><Button block variant="primary" style={{ position: 'relative' }} onClick={() => setIndexOverflow(index + 1)}>Next</Button></Col>
        </Row>
      </div>
    </div>
  )
}

export default CardsInDeck