import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { UserPageProps } from '../../interfaces'
import NewDeckForm from '../forms/NewDeckForm'

const UserPage: React.FC<UserPageProps> = ({ notify, loadedDecks }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  console.log(loadedDecks)
  return (<div>
    <Button style={{ margin: '5px' }} size="lg" onClick={openModal} block>
      Create A New Deck
    </Button>
    <NewDeckForm notify={notify} show={modalIsOpen} closeModal={closeModal} />
    {
      loadedDecks.called ?
        (
          loadedDecks.loading ?
            "loading..." :
            <ul>
              {
                loadedDecks.data.allDecks.map((deck: any) => <li key={deck.id}>{deck.name}-{deck.description}</li>)
              }
            </ul>

        )
        : null
    }
  </div>)
}


export default UserPage