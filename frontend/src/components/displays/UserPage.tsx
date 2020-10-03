import React from 'react'

import DeckPage from './DeckPage'
import { UserPageProps } from '../../interfaces'

const UserPage: React.FC<UserPageProps> = ({ notify, loadedDecks }) => {
  return <DeckPage notify={notify} loadedDecks={loadedDecks} />
}

export default UserPage