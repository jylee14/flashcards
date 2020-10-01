import React, { FormEvent, useState } from 'react'
import { ApolloError, useMutation } from '@apollo/client'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import { Modal, ModalBody, Form, ModalTitle, Button } from 'react-bootstrap'

import { NewDeckFormProps } from '../../interfaces'
import { CREATE_NEW_DECK } from '../../queries'

interface FlashCardDatum {
  term: string;
  definition: string;
}

const NewDeckForm: React.FC<NewDeckFormProps> = ({ userToken, show, closeModal }) => {
  // common - shared states
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [sourceIsFile, setSourceIsFile] = useState(true)

  // if the user is uploading a file
  const [file, setFile] = useState<File | null>(null)

  // if the user is entering the data themselves
  const [separator, setSeparator] = useState(';')
  const [inputData, setInputData] = useState('')

  const [mutation, result] = useMutation(CREATE_NEW_DECK, {
    onError: (err) => {
      console.error(err)
    }
  })

  const createDeck = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault()

    console.log('name:', name, '\nisPublic:', isPublic, '\nSourceIsFile:', sourceIsFile)
    const deckData = new Array<FlashCardDatum>()
    const workingData = sourceIsFile ? await file!.text() : inputData
    const termSeparator = sourceIsFile ? '\t' : separator

    // separate the input into lines & separate the term - def pairing by the specified separator
    // as it is, we are trusting the user (GASP) that the input is valid
    // will add validation later
    const wordDefinitionPairs = workingData
      .split('\n')
      .map(pair => pair.split(termSeparator))

    for (const [term, definition] of wordDefinitionPairs) {
      const datum: FlashCardDatum = { term, definition }
      deckData.push(datum)
      if (deckData.length >= 150) { // impose a semi-arbitrary limit of 150 term-def pairs
        break
      }
    }
    mutation({
      variables: {
        name,
        description,
        isPublic,
        cards: deckData
      }
    })

    console.log(deckData)
    closeModal()
  }

  return (
    <Modal show={show} onHide={closeModal}>
      <ModalHeader closeButton>
        <ModalTitle>
          Create A New Deck
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={createDeck}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="input" placeholder="My Deck" value={name} onChange={({ target }) => setName(target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control type="input" placeholder="Deck of Awesome" value={description} onChange={({ target }) => setDescription(target.value)} />
          </Form.Group>
          <Form.Group>
            <Form.Check type="checkbox" label="Make Public" defaultChecked={isPublic} onClick={() => setIsPublic(!isPublic)} />
            <Form.Text className="text-muted">
              This will your deck visible to other users
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Label>Data Source</Form.Label>
            <Form.Text className="text-muted">Where should the data for the flashcards come from?</Form.Text>
            <Form.Row style={{ padding: '10px' }}>
              <Form.Check inline type="radio" name="fileSource" label="file" defaultChecked={sourceIsFile} onClick={() => setSourceIsFile(true)} />
              <Form.Check inline type="radio" name="fileSource" label="text" onClick={() => setSourceIsFile(false)} />
            </Form.Row>
          </Form.Group>
          <Form.Group>
            {
              sourceIsFile ?
                <Form.File accept=".tsv" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFile(event.target.files?.[0] ?? null)} />
                :
                <Form.Group>
                  <Form.Label>Separator</Form.Label>
                  <Form.Control type="input" placeholder=";" value={separator} onChange={({ target }) => setSeparator(target.value)} />
                  <Form.Text className="text-muted">character to separate term from definition</Form.Text>
                  <Form.Label>Terms and Definition</Form.Label>
                  <Form.Control as="textarea" value={inputData} onChange={({ target }) => setInputData(target.value)} placeholder={`term ${separator} definition`} />
                </Form.Group>
            }
          </Form.Group>
          <Button variant="primary" block type="submit" disabled={!(name && (file || (separator && inputData)))}>Create</Button>
          <Button variant="danger" block onClick={closeModal}>Cancel</Button>
        </Form>
      </ModalBody >
    </Modal >
  )
}

export default NewDeckForm