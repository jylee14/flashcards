import React from 'react';
import { useLocation } from 'react-router-dom';

import CardWithControls from './CardWithControls';
import { Card, Deck } from '../../../interfaces';
import { Button } from 'react-bootstrap';

interface LocationProps {
  pathname: string;
  deck: Deck;
}

interface LearnCard extends Card {
  learned: boolean;
}

const LearnDeck = () => {
  const location = useLocation<LocationProps>()
  const deck = location.state.deck

  return (
    <div>
      <CardWithControls deck={deck} />
      <Button block onClick={() => console.log("learned!")}>Mark as Learned</Button>
    </div>
  );
};

export default LearnDeck;