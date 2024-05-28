import React from "react";
import { FormControl, Button, Typography } from '@mui/material'; // Import necessary Material-UI components
import { useForm } from '../../hooks/useForm';
import Alert from '../common/Alert';

const Notes = ({ handleEdit, portfolio }) => {
  const { formData, formErrors, formSuccess, handleChange, handleSubmit } = useForm(
    {
      notes: portfolio.notes,
    },
    handleEdit,
    "",
  );
  
  const { notes } = formData;

  return (
    <form onSubmit={handleSubmit}> 
      <FormControl fullWidth sx={{ mb: 3 }}> 
        <Typography variant="h6" gutterBottom>Notes</Typography> 
        <textarea
          rows={3}
          placeholder="Notes"
          name="notes"
          value={notes}
          onChange={handleChange}
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ced4da' }}
        />
      </FormControl>
      {formErrors.length ? (
        <Alert type="danger" messages={formErrors} />
      ) : null}
      {formSuccess ? ( 
        <Alert type="success" messages={["Updated successfully."]} />
      ) : null}
      <Button type="submit" variant="contained" color="primary">Save Notes</Button> {/* Material-UI Button */}
    </form>
  );
}



export default Notes;