import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import OutlinedLabel, { OutlineColors } from '../OutlinedLabel'
import { Card, Deck } from '../../../interfaces';
import { Button, Card as ReactCard, Form, Table} from 'react-bootstrap';

interface LocationProps {
  pathname: string;
  deck: Deck;
}

const LearnDeck = () => {
  const location = useLocation<LocationProps>()
  const deck = location.state.deck
  
  // idea - grab a random word that has not YET been learned & present to the user. 
  // basically doing term -> type out def or vice versa for all the words in the deck 
  const cards = deck.cards.shuffled()
  const [head, ...tail] = cards

  const [answer, setAnswer] = useState('')
  const [correct, setCorrect] = useState<boolean | null>(null)
  const [remainingCards, setRemainingCards] = useState(tail)
  const [currentCard, setCurrentCard] = useState<Card>(head)

  const [learned, setLearned] = useState<Card[]>([])

  const checkAnswer = () => {
    if(answer.toLowerCase() === currentCard.definition.toLowerCase()) {
      setLearned(learned.concat(currentCard))
      
      const [head, ...tail] = remainingCards
      setRemainingCards(tail)
      setCurrentCard(head)

      setAnswer('')
      setCorrect(true)
    } else {
      setCorrect(false)
    }

    setTimeout(() => setCorrect(null), 500) // kinda janky but it works.
  }

  const skipCard = () => {
    const completeDeck = remainingCards.concat(currentCard)
    const [head, ...tail] = completeDeck

    setCurrentCard(head)
    setRemainingCards(tail)
  }

  const handleKeyboard = (e: React.KeyboardEvent) => {
    switch (e.key) {
      case "Enter":
        checkAnswer()
        break
      default:
        break
    }
  }

  if(remainingCards.length === 0) {
    return (
      <div>
        Deck finished!
      </div>
    )
  }

  return (
    <div>
      <h1>{deck.name}</h1>
      <h4>{deck.description}</h4>

      <ReactCard border="secondary" body={true}>
      {
          <ReactCard.Title>{currentCard.term}</ReactCard.Title> 
      }
      </ReactCard>

      <Form.Group>
        <div onKeyDown={handleKeyboard}>
          <OutlinedLabel 
            input={answer} 
            setInput={setAnswer} 
            placeholder="Enter your answer" 
            color={
              correct === null ? 
              null : 
              (
                correct ?
                OutlineColors.Green : 
                OutlineColors.Red
              ) 
            }
          />
          <Button block onClick={checkAnswer}>Check</Button>
          <Button block variant="danger" onClick={skipCard}>Skip</Button>
        </div>
      </Form.Group>
    
    {
      learned.length > 0 ?
      <div>
        <h4>Learned Words</h4>
        <Table striped bordered>
          <thead>
            <tr>
              <td>Term</td>
              <td>Definition</td>
            </tr>
          </thead>
          <tbody>
            {
              learned.map(term => {
                return (
                  <tr key={term.id}>
                    <td>{term.term}</td>
                    <td>{term.definition}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </Table>
      </div> 
      : null
    }
    </div>
  );
};

export default LearnDeck;