import React, { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { Button, Col, Form, Row } from 'react-bootstrap'

import CardView from './CardView'

import { Card } from '../../../interfaces'
import { GET_DECK_BY_ID } from '../../../queries'

const CardsInDeck: React.FC<{ id: string }> = ({ id }) => {
  const [index, setIndex] = useState(0)
  const [loop, setLoop] = useState(true)
  const [cards, setCards] = useState<Card[]>([])
  const [termUp, setTermUp] = useState(true)
  const [currentCard, setCurrentCard] = useState<Card | null>(null)
  const getDeckById = useQuery(GET_DECK_BY_ID, { variables: { id } })

  useEffect(() => {
    if (!getDeckById.loading && getDeckById.data) {
      const deck = getDeckById.data.getDeck
      setCards(deck.cards)
    }
  }, [getDeckById, setCards])
  
  useEffect(() => {
    setCurrentCard(cards[index])
  }, [index, cards])

  if (getDeckById.loading) {
    return <>loading...</>
  }
  if (!getDeckById?.data?.getDeck) {
    return <>Deck not found :(</>
  }

  const shuffle = () => {
    setIndex(0)
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

  const deck = getDeckById.data.getDeck
  return (
    <div>
      <h1>{deck.name}</h1>
      <h4>{deck.description}</h4>
      <Form.Row style={{ padding: '10px' }}>
        <Form.Check inline style={{ marginRight: '25px' }} type="checkbox" onClick={() => setTermUp(!termUp)} defaultChecked={termUp} label="Show Term First" />
        <Form.Check inline type="checkbox" onClick={() => setLoop(!loop)} defaultChecked={loop} label="Loop Cards" />
      </Form.Row>
      <div>
        {
          currentCard ?
            <CardView key={currentCard.id} term={currentCard!.term} definition={currentCard!.definition} termUp={termUp} /> :
            null
        }
        <Row style={{ marginTop: '10px' }}>
          <Col><Button block onClick={() => setIndexOverflow(index - 1)} disabled={!index && !loop} >Prev</Button></Col>
          <Col><Button block onClick={shuffle}>Shuffle</Button></Col>
          <Col><Button block onClick={() => setIndexOverflow(index + 1)} disabled={!loop && (index === cards.length - 1)}>Next</Button></Col>
        </Row>
      </div>
    </div>
  )
}

export default CardsInDeck