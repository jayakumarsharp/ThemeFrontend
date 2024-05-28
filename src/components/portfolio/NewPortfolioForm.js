import React, { useEffect } from 'react';
import { Box, TextField, InputAdornment, Button, Typography, Alert } from '@mui/material';
import { useAuth } from "../../hooks/useAuth";
import { useForm } from '../../hooks/useForm';
import PortfolioApi from '../../api/api';

const NewPortfolioForm = () => {
  const { currentUser, refresh } = useAuth();

  const createPortfolio = async (data) => {
    try {
      await PortfolioApi.newPortfolio(data);
      await refresh(currentUser.username);
      return { success: true }
    } catch (errors) {
      return { success: false, errors };
    }
  }

  const { formData, formErrors, formSuccess, handleChange, handleSubmit } = useForm(
    {
      name: "",
      cash: 0,
      notes: "",
      username: currentUser.username,
    },
    createPortfolio,
    '/home',
  );

  const { name, cash, notes } = formData;

  useEffect(() => {
    console.debug(
      "NewPortfolioForm",
      "createPortfolio=", typeof createPortfolio,
      "formData=", formData,
      "formErrors=", formErrors,
      "formSuccess=", formSuccess,
    );
  }, [createPortfolio, formData, formErrors, formSuccess]);

  const handleCashInput = (e) => {
    let t = e.target.value;
    e.target.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : +t;
  }

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        Create Portfolio
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box mb={3}>
          <TextField
            fullWidth
            variant="outlined"
            label="Portfolio Name"
            placeholder="Portfolio Name"
            name="name"
            value={name}
            onChange={handleChange}
            helperText="Name should be unique."
          />
        </Box>
        <Box mb={3}>
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
              startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
              ),
            }}
            helperText="Fractional cents is not allowed."
          />
        </Box>
        <Box mb={3}>
          <TextField
            fullWidth
            variant="outlined"
            multiline
            rows={3}
            label="Notes"
            placeholder="Notes"
            name="notes"
            value={notes}
            onChange={handleChange}
          />
        </Box>
        {formErrors.length ? (
          <Alert severity="error">
            {formErrors.map((error, index) => (
              <div key={index}>{error}</div>
            ))}
          </Alert>
        ) : null}
        <Button variant="contained" color="primary" type="submit">
          Submit
        </Button>
      </form>
    </>
  );
}

export default NewPortfolioForm;
