import React from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery } from '@apollo/client'
import { Button } from 'react-bootstrap'

import Loading from '../Loading'
import { GET_DECK_BY_ID } from '../../../queries'
import CardWithControls from './CardWithControls'

const CardsInDeck: React.FC<{ id: string }> = ({ id }) => {
  const history = useHistory()
  const getDeckById = useQuery(GET_DECK_BY_ID, { variables: { id } })

  if (getDeckById.loading) {
    return <Loading />
  }

  if (!getDeckById?.data?.getDeck) {
    return <>Deck not found :(</>
  }

  const deck = getDeckById.data.getDeck

  const goToLearnDeck = () => {
    history.push({
      pathname: `/deck/${id}/learn`,
      state: { deck }
    })
  }

  return (
    <div>
      <CardWithControls deck={deck} />
      <Button block onClick={goToLearnDeck}>Study this Deck</Button>
    </div>
  )
}

export default CardsInDeck