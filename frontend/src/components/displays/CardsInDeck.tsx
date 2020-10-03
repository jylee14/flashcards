import React from 'react'
import { useQuery } from '@apollo/client'

import { Card } from '../../interfaces'
import { GET_DECK_BY_ID } from '../../queries'

const CardsInDeck: React.FC<{ id: string }> = ({ id }) => {
  const getDeckById = useQuery(GET_DECK_BY_ID, { variables: { id } })

  if (getDeckById.loading) {
    return <>'loading...'</>
  }

  const deck = getDeckById.data.getDeck

  const name = deck.name
  const description = deck.description
  const cards = deck.cards
  return (
    <div>
      <h1>{name}</h1>
      <h4>{description}</h4>
      <ul>
        {
          cards.map((card: Card) => <li key={card.id}>{card.term} : {card.definition}</li>)
        }
      </ul>
    </div>
  )
}

export default CardsInDeck