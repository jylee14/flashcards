import { useQuery } from '@apollo/client';
import React from 'react';
import GreetingBanner from './components/displays/GreetingBanner';
import { GET_PUBLIC_DECKS } from './queries';

interface Deck {
  id: string
  cards: Card[]
}

interface Card {
  id: string
  term: string
  definition: string
}

function App() {
  const cards = useQuery(GET_PUBLIC_DECKS)

  if (cards.loading) {
    return <div>loading</div>
  }

  console.log(cards)
  return (<div>
    <GreetingBanner username={'test'} />
    <ul>
      {
        cards.data.allDecks.map((deck: Deck) => {
          console.log(deck)
          return deck.cards.map((card: Card) =>
            <li key={card.id}>
              term: {card.term}
              definition: {card.definition}
            </li>
          )
        })
      }
    </ul>
  </div >);
}

export default App;
