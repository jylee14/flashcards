import React, { useState } from 'react'
import { Button } from 'react-bootstrap'
import { UserPageProps } from '../../interfaces'
import NewDeckForm from '../forms/NewDeckForm'

const UserPage: React.FC<UserPageProps> = ({ notify }) => {
  const [modalIsOpen, setModalIsOpen] = useState(false)
  const openModal = () => setModalIsOpen(true)
  const closeModal = () => setModalIsOpen(false)

  return (<div>
    <Button style={{ margin: '5px' }} size="lg" onClick={openModal} block>
      Create A New Deck
    </Button>
    <NewDeckForm notify={notify} show={modalIsOpen} closeModal={closeModal} />
  </div>)
}


export default UserPage