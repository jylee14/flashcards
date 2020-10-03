import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useQuery } from '@apollo/client';

import DeckInfo from './DeckInfo';
import NewDeckForm from '../forms/NewDeckForm';

import { GET_PUBLIC_DECKS } from '../../queries';
import Filter from '../forms/Filter';

interface UserPageProps {
  notify(msg: string, isError?: boolean): void;
}

const UserPage: React.FC<UserPageProps> = ({ notify }) => {
  const publicDecks = useQuery(GET_PUBLIC_DECKS, { fetchPolicy: 'cache-and-network' })

  const [deckFilter, setDeckFilter] = useState('')
  const [buttonText, setButtonText] = useState('+')
  const [modalIsOpen, setModalIsOpen] = useState(false)

  if (publicDecks.loading) {
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

  return (
    <div style={{ marginTop: '1em' }}>
      <Filter filter={deckFilter} setFilter={setDeckFilter} />
      <DeckInfo decks={publicDecks.data.allDecks} />
      <NewDeckForm notify={notify} show={modalIsOpen} closeModal={closeModal} />
      <Button onClick={openModal} style={bottomButton} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>{buttonText}</Button>
    </div>
  )
}

export default UserPage