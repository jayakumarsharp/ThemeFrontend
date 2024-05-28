import React from "react";
import { FormControl, Button, Modal } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import Alert from '../common/Alert'

const EditNameModal = ({ showModal, handleClose, handleEdit, portfolio }) => {
  const { formData, formErrors, formSuccess, handleChange, handleSubmit } = useForm(
    {
      name: portfolio.name,
    },
    handleEdit,
    "",
  )
  const { name } = formData;

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit portfolio name</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Portfolio Name</Form.Label>
            <Form.Control type="text" placeholder="Portfolio name" name="name" value={name} onChange={handleChange} />
            <Form.Text muted>Name should be unique.</Form.Text>
          </Form.Group>
          {formErrors.length
            ? <Alert type="danger" messages={formErrors} />
            : null}
          {formSuccess
            ? <Alert type="success" messages={["Updated successfully."]} />
            : null}
        </Modal.Body>
        <Modal.Footer>
          <Button type="submit">Update</Button>
          <Button onClick={handleClose}>Cancel</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  )
}

export default EditNameModal
