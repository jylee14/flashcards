import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import OutlinedLabel, { OutlineColors } from '../OutlinedLabel'
import { Card, Deck } from '../../../interfaces';
import { Button, Card as ReactCard, Form} from 'react-bootstrap';

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

  const checkAnswer = () => {
    if(answer.toLowerCase() === currentCard.definition.toLowerCase()) {
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
    const [head, ...tail] = remainingCards

    setRemainingCards([...tail, head])
    setCurrentCard(remainingCards[0])
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
    </div>
  );
};

export default LearnDeck;