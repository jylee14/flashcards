import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { useQuery } from '@apollo/client';

import DeckInfo from './DeckInfo';
import NewDeckForm from '../forms/NewDeckForm';

import { GET_PUBLIC_DECKS } from '../../queries';

interface UserPageProps {
  notify(msg: string, isError?: boolean): void;
}

const UserPage: React.FC<UserPageProps> = ({ notify }) => {
  const publicDecks = useQuery(GET_PUBLIC_DECKS, { fetchPolicy: 'cache-and-network' })

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  if (publicDecks.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <Button onClick={openModal} block>Create A New Deck</Button>
      <DeckInfo decks={publicDecks.data.allDecks} />
      <NewDeckForm notify={notify} show={modalIsOpen} closeModal={closeModal} />
    </div>
  )
}

export default UserPage