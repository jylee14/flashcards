import React from 'react'
import { Form } from 'react-bootstrap'

interface FilterProps {
  filter: string;
  setFilter(term: string): void;
}

const Filter: React.FC<FilterProps> = ({ filter, setFilter }) => {
  return (
    <Form>
      <Form.Control placeholder="Search..." value={filter} onChange={({ target }) => setFilter(target.value)} />
    </Form>
  )
}

export default Filter