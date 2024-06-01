import React from "react";
import { FormControl, Button, Modal,Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,TextField } from '@mui/material';
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
      <form onSubmit={handleSubmit}>
        <DialogTitle>Edit Portfolio Name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Portfolio Name"
            type="text"
            fullWidth
            variant="outlined"
            value={name}
            onChange={handleChange}
          />
          <small style={{ color: '#888' }}>Name should be unique.</small>
          {formErrors.length > 0 && (
            <Alert severity="error" style={{ marginTop: 10 }}>
              {formErrors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </Alert>
          )}
          {formSuccess && (
            <Alert severity="success" style={{ marginTop: 10 }}>
              <p>Updated successfully.</p>
            </Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button type="submit" color="primary">
            Update
          </Button>
          <Button onClick={handleClose} color="secondary">
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Modal>
  )
}

export default EditNameModal
