import React from "react";
import { Box, TextField, InputAdornment, Button, Modal, Typography, Alert } from '@mui/material';
import { useForm } from '../../hooks/useForm';
import { useTheme } from '@mui/material/styles';

const UpdateCashModal = ({ showModal, handleClose, handleEdit, portfolio }) => {
  const { formData, formErrors, formSuccess, handleChange, handleSubmit } = useForm(
    {
      cash: portfolio.cash,
    },
    handleEdit,
    "",
  );
  const { cash } = formData;

  const handleCashInput = (e) => {
    let t = e.target.value;
    e.target.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : +t;
  };

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography id="modal-title" variant="h6" component="h2" gutterBottom>
          Update Available Cash
        </Typography>
        <TextField
          fullWidth
          variant="outlined"
          type="number"
          label="Cash"
          placeholder="Available Cash"
          name="cash"
          value={cash}
          onInput={handleCashInput}
          onChange={handleChange}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          helperText="Fractional cents is not allowed."
          sx={{ mb: 3 }}
        />
        {formErrors.length ? (
          <Alert severity="error">
            {formErrors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </Alert>
        ) : null}
        {formSuccess ? (
          <Alert severity="success">
            <div>Updated successfully.</div>
          </Alert>
        ) : null}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
          <Button type="submit" variant="contained" color="primary">
            Update
          </Button>
          <Button onClick={handleClose} variant="outlined" color="secondary">
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default UpdateCashModal;
