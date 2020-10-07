import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useQuery, useMutation } from '@apollo/client';

import DeckInfo from '../DeckAndCards/DeckInfo';
import Filter from '../../forms/Filter';
import NewDeckForm from '../../forms/NewDeckForm';

import { Deck } from '../../../interfaces';
import { GET_MY_DECKS, GET_PUBLIC_DECKS, DELETE_DECK } from '../../../queries';

interface UserPageProps {
  notify(msg: string, isError?: boolean): void;
  getPublicDeck: boolean;
}

const UserPage: React.FC<UserPageProps> = ({ notify, getPublicDeck }) => {
  const query = getPublicDeck ? GET_PUBLIC_DECKS : GET_MY_DECKS
  const decks = useQuery(query, { fetchPolicy: 'cache-and-network' })
  const [deleteDeckMutation] = useMutation(DELETE_DECK, {
    refetchQueries: [{ query }],
    onError: (err) => notify(err.message, true)
  })

  const [deckFilter, setDeckFilter] = useState('')
  const [buttonText, setButtonText] = useState('+')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  if (decks.loading) {
    return <div>loading...</div>
  }
  const bottomButton: React.CSSProperties = {
    right: 10,
    bottom: 10,
    borderRadius: 100,
    position: 'fixed'
  }

  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  const onMouseEnter = () => setButtonText('Create a New Deck')
  const onMouseLeave = () => setButtonText('+')

  const workingDecks = getPublicDeck ? decks.data.allDecks : decks.data.myDecks
  const filteredDecks = workingDecks
    .filter((deck: Deck) => deck.name.ignoreCaseIncludes(deckFilter || ''))

  const deleteDeck = (id: string) => {
    if (window.confirm('Delete this deck? This action CANNOT be undone')) {
      deleteDeckMutation({ variables: { id } })
    }
  }

  return (
    <div style={{ marginTop: '1em' }}>
      <Filter filter={deckFilter} setFilter={setDeckFilter} />
      <DeckInfo decks={filteredDecks} myDeck={!getPublicDeck} deleteDeck={getPublicDeck ? undefined : deleteDeck} />
      <NewDeckForm notify={notify} show={modalIsOpen} closeModal={closeModal} />
      <Button onClick={openModal} style={bottomButton} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{buttonText}</Button>
    </div>
  )
}

export default UserPage