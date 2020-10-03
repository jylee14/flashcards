import React from 'react'
import { useHistory } from 'react-router-dom'
import { Accordion, Table, Card, Button } from 'react-bootstrap'

interface DeckInfoProps {
  decks: any[]
}

const DeckInfo: React.FC<DeckInfoProps> = ({ decks }) => {
  const history = useHistory()

  return (
    <div style={{ marginTop: '1vh', zIndex: 0 }}>
      <Accordion>
        {
          decks.map(deck =>
            <Card key={deck.id}>
              <Accordion.Toggle as={Card.Header} eventKey={deck.id}>
                {deck.name} ({deck.cards.length} cards)
              </Accordion.Toggle>
              <Accordion.Collapse eventKey={deck.id}>
                <>
                  <Card.Body>{deck.description}</Card.Body>
                  <div style={{ margin: '1em' }}>
                    <Button variant="primary" onClick={() => history.push(`/deck/${deck.id}`)} block>Open Deck</Button>
                  </div>
                </>
              </Accordion.Collapse>
            </Card>
          )
        }
      </Accordion>
    </div>
  )
}

export default DeckInfo