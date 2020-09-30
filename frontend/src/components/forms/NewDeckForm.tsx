import React, { FormEvent } from 'react'
import ModalHeader from 'react-bootstrap/esm/ModalHeader'
import { Modal, ModalBody, Form, ModalTitle, FormLabel, FormGroup, Row, Col, Button } from 'react-bootstrap'
import { NewDeckFormProps } from '../../misc/interfaces'


const NewDeckForm: React.FC<NewDeckFormProps> = ({ userToken, show, closeModal }) => {

  const createNote = (e: FormEvent<HTMLElement>) => {
    e.preventDefault()
    closeModal()
  }

  const padding = { padding: '3px' }

  return (
    <Modal show={show} onHide={closeModal}>
      <ModalHeader closeButton>
        <ModalTitle>
          Create new coffee note
        </ModalTitle>
      </ModalHeader>
      <ModalBody>
        <Form onSubmit={createNote}>
          <FormGroup>
            <Row style={padding}>
              <Col><FormLabel>Name</FormLabel></Col>
            </Row>
          </FormGroup>
          <Button variant="primary" block type="submit">Create</Button>
          <Button variant="danger" block onClick={closeModal}>Cancel</Button>
        </Form>
      </ModalBody >
    </Modal >
  )
}

export default NewDeckForm