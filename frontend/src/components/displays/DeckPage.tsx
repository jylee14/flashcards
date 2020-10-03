import React, { useState } from 'react'
import { Button } from 'react-bootstrap'

import DeckInfo from './DeckInfo';
import NewDeckForm from '../forms/NewDeckForm';
import { UserPageProps } from '../../interfaces';
import useWindowDimensions from '../../hooks/windowDimensions';

const DeckPage: React.FC<UserPageProps> = ({ notify, loadedDecks }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  const width = useWindowDimensions
  return (
    <div className="userContent">
      <Button onClick={openModal} block>Create A New Deck</Button>
      <div>
        {
          loadedDecks.called ?
            (
              loadedDecks.loading ?
                "loading..." :
                <DeckInfo decks={loadedDecks.data.allDecks} />
            )
            : null
        }
      </div>
      <NewDeckForm notify={notify} show={modalIsOpen} closeModal={closeModal} />
    </div>
  );
};

export default DeckPage;
