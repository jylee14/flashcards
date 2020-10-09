import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import useWindowDimensions from '../../../hooks/windowDimensions';

interface CardViewProps {
  term: string;
  definition: string;
  termUp: boolean;
}

const CardView: React.FC<CardViewProps> = ({ term, definition, termUp }) => {
  const [flipped, setFlipped] = useState(termUp)
  const width = useWindowDimensions().width

  const cardContainerStyle: React.CSSProperties = {
    height: `${Math.min((3 / 7) * width, 350)}px`,
    position: 'relative'
  }

  const cardStyle: React.CSSProperties = {
    fontSize: `${3 * Math.log(width) + 20}px`,
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)'
  }

  useEffect(() => {
    setFlipped(termUp)
  }, [termUp])

  return (
    <Card border="secondary" onClick={() => setFlipped(!flipped)} body={true} style={cardContainerStyle}>
      {
        flipped ?
          <Card.Title style={cardStyle}>{term}</Card.Title> :
          <Card.Title style={cardStyle}>{definition}</Card.Title>
      }
    </Card>
  );
};

export default CardView;