import React from 'react'
import { Card, ListGroup, ListGroupItem, Accordion } from 'react-bootstrap'

interface DeckInfoProps {
  deck: any
  width: number
}

const DeckInfo: React.FC<DeckInfoProps> = ({ deck, width }) => {
  const calculateCardCount = (width: number) => Math.ceil(width / 250)
  const cardStyle: React.CSSProperties = {
    border: 'black',
    borderStyle: 'solid',
    borderWidth: '1px',
    maxWidth: '350px',
    minWidth: `${width < 425 ? width - 30 : 250}px`,
    width: `${width < 425 ? width - 30 : Math.floor(width / calculateCardCount(width))}px`,
    position: 'relative',
    margin: '3px'
  }

  return (
    <Card style={cardStyle}>
      <Card.Body>
        <Card.Title>{deck.name}</Card.Title>
        <ListGroup variant="flush">
          <ListGroupItem>{deck.description}</ListGroupItem>

          <ListGroupItem as="button" onClick={() => {}} variant="danger">
            Delete
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  )
}

export default DeckInfo