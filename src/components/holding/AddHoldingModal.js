import { Button, Modal, Box, TextField, Typography } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import Alert from "../common/Alert";

const AddHoldingModal = ({ showModal, handleClose, handleAdd, portfolio_id }) => {
  const { formData, formErrors, formSuccess, handleChange, handleSubmit } = useForm(
    {
      symbol: "",
      shares_owned: 0,
      portfolio_id: portfolio_id,
      executed_price: 0,
      tran_code: "by",
    },
    handleAdd
  );
  const { symbol, shares_owned, executed_price, tran_code } = formData;

  const handleNumInput = (e) => {
    let t = e.target.value;
    e.target.value =
      t.indexOf(".") >= 0 ? t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 5) : +t;
  };

  const handleSymbolInput = (e) => {
    let t = e.target.value;
    e.target.value = t.toUpperCase();
  };

  return (
    <Modal open={showModal} onClose={handleClose}>
      <Box sx={{ width: 400, bgcolor: "background.paper", p: 4, borderRadius: 2 }}>
        <Typography variant="h6" gutterBottom>
          Add Holding
        </Typography>
        <form>
          <TextField
            fullWidth
            variant="outlined"
            label="Symbol"
            placeholder="Symbol"
            name="symbol"
            value={symbol}
            onInput={handleSymbolInput}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            label="Shares owned"
            placeholder="Shares owned"
            name="shares_owned"
            value={shares_owned}
            onInput={handleNumInput}
            onChange={handleChange}
            sx={{ mb: 3 }}
          />
          <TextField
            fullWidth
            variant="outlined"
            type="number"
            label="executed_price"
            placeholder="executed_price"
            name="executed_price"
            value={executed_price}
            onInput={handleNumInput}
            onChange={handleChange}
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
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Button type="submit" variant="contained" onClick={handleSubmit} color="primary">
              Add
            </Button>
            <Button onClick={handleClose} variant="outlined" color="secondary">
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddHoldingModal;
