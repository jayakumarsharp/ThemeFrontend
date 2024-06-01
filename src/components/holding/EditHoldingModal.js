import { FormControl, Button, Modal } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import Alert from '../common/Alert'

const EditHoldingModal = ({ showModal, handleClose, handleEdit, handleDelete, holding, portfolio_id }) => {

  const { formData, formErrors, formSuccess, handleChange, handleSubmit } = useForm(
    {
      shares_owned: holding?.shares_owned,
    },
    handleEdit,
    `/portfolio/${portfolio_id}`,
  )

  const { shares_owned } = formData;

  const handleNumInput = (e) => {
    let t = e.target.value;
    e.target.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 5)) : +t;
  }

  return (
    <Modal show={showModal} onHide={handleClose}>
      <form onSubmit={handleSubmit}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Holding</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="shares_owned">
            <Form.Label>Shares owned</Form.Label>
            <Form.Control type="number" placeholder="Shares owned" name="shares_owned" value={shares_owned} onInput={handleNumInput} onChange={handleChange} />
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
          <Button variant="danger" onClick={() => handleDelete(holding.id)}>Delete</Button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}

export default EditHoldingModal
