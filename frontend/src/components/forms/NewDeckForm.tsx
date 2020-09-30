import React, { FormEvent, useState } from 'react'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import { Modal, ModalBody, Form, ModalTitle, Button } from 'react-bootstrap'

import { NewDeckFormProps } from '../../misc/interfaces'


interface flashCardDatum {
  term: string
  definition: string
}

const NewDeckForm: React.FC<NewDeckFormProps> = ({ userToken, show, closeModal }) => {
  const [name, setName] = useState('')
  const [isPublic, setIsPublic] = useState(false)
  const [sourceIsFile, setSourceIsFile] = useState(true)
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<flashCardDatum[] | null>(null)

  const createNote = async (e: FormEvent<HTMLElement>) => {
    e.preventDefault()

    console.log('name:', name, '\nisPublic:', isPublic, '\nSourceIsFile:', sourceIsFile)
    var text = await file?.text()
    console.log(text)
    closeModal()
  }

  return (
    <Modal show={show} onHide={closeModal}>
      <ModalHeader closeButton>
        <ModalTitle>
          Create new coffee note
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={createNote}>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control type="input" placeholder="Deck of Awesome" value={name} onChange={({ target }) => setName(target.value)} />
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
                <Form.File onChange={(event: React.ChangeEvent<HTMLInputElement>) => setFile(event.target.files?.[0] ?? null)} />
                :
                // text setting/parse code here
                null
            }
          </Form.Group>
          <Button variant="primary" block type="submit" disabled={!(name && (data || file))}>Create</Button>
          <Button variant="danger" block onClick={closeModal}>Cancel</Button>
        </Form>
      </ModalBody >
    </Modal >
  )
}

export default NewDeckForm