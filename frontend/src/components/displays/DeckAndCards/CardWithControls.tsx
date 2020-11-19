import React, { useEffect, useState } from 'react';
import { Button, Col, Form, Row } from 'react-bootstrap';

import CardView from './CardView';
import { Card, Deck } from '../../../interfaces';

interface CardWithControlsProps {
  deck: Deck;
}

const CardWithControls: React.FC<CardWithControlsProps> = ({ deck }) => {
  const [index, setIndex] = useState(0)
  const [loop, setLoop] = useState(true)
  const [termUp, setTermUp] = useState(true)
  const [cards, setCards] = useState<Card[]>(deck.cards)
  const [card, setCard] = useState<Card>(deck.cards[index])

  useEffect(() => {
    setCard(cards[index])
  }, [index, cards])

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

  const shuffle = () => {
    setIndex(0)
    setCards(cards.shuffled())
  }

  const handleKeyboardInput = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "ArrowRight":
        setIndexOverflow(index + 1)
        break
      case "ArrowLeft":
        setIndexOverflow(index - 1)
        break
      case "ArrowUp":
      case "ArrowDown":
      case " ":
        setTermUp(!termUp)
        break
      case "s":
        shuffle()
        break
      default:
        break
    }
  }

  return (
    <div onKeyDown={handleKeyboardInput} tabIndex={0}>
      <h1>{deck.name}</h1>
      <h4>{deck.description}</h4>
      <Form.Group>
        <Form.Check inline style={{ marginRight: '25px' }} type="checkbox" onClick={() => setTermUp(!termUp)} defaultChecked={termUp} label="Show Term First" />
        <Form.Check inline type="checkbox" onClick={() => setLoop(!loop)} defaultChecked={loop} label="Loop Cards" />
      </Form.Group>
      <div>
        {
          <CardView key={card.id} term={card!.term} definition={card!.definition} termUp={termUp} />
        }
        <Row style={{ marginTop: '10px', marginBottom: '10px' }}>
          <Col><Button block onClick={() => setIndexOverflow(index - 1)} disabled={!index && !loop} >Prev</Button></Col>
          <Col><Button block onClick={shuffle}>Shuffle</Button></Col>
          <Col><Button block onClick={() => setIndexOverflow(index + 1)} disabled={!loop && (index === cards.length - 1)}>Next</Button></Col>
        </Row>
      </div>
    </div>
  );
};

export default CardWithControls;