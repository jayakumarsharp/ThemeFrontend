import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import { useForm } from "../../hooks/useForm";
import Alert from "../common/Alert";
import Dropdown from "../controlcomponent/securitydropdown";
import PortfolioApi from "../../api/api";

const AddHoldingDialog = ({ showDialog, handleClose, handleAdd, portfolio_id }) => {
  const validateForm = (formData, setFormErrors) => {
    const errors = [];
    if (!formData.symbol) {
      errors.push("Symbol is required.");
    }
    if (formData.shares_owned <= 0) {
      errors.push("Shares owned must be greater than 0.");
    }
    if (formData.executed_price <= 0) {
      errors.push("Executed price must be greater than 0.");
    }
    setFormErrors(errors);
    return errors.length === 0;
  };

  const { formData, formErrors, formSuccess, handleChange, handleSubmit, setFormErrors } = useForm(
    {
      symbol: "",
      shares_owned: 0,
      portfolio_id: portfolio_id,
      executed_price: 0,
      tran_code: "by",
    },
    handleAdd,
    validateForm
  );

  const { symbol, shares_owned, executed_price, tran_code } = formData;
  const [secrowData, setSecrowData] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);

  const fetchSecData = async () => {
    try {
      const response = await PortfolioApi.getSecurities();
      setSecrowData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchSecData();
  }, []);

  const handleNumInput = (e) => {
    let t = e.target.value;
    e.target.value =
      t.indexOf(".") >= 0 ? t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 5) : +t;
  };

  const handleSelectChange = (selected) => {
    console.log("selected", selected);
    setSelectedOption(selected);
    handleChange({ target: { name: "symbol", value: selected.value } }); // Update formData symbol
  };

  return (
    <Dialog open={showDialog} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>Add Holding</DialogTitle>
      <DialogContent>
        <form>
          <Dropdown options={secrowData} onSelectChange={handleSelectChange} />
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
            label="Executed Price"
            placeholder="Executed Price"
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
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit} variant="contained" color="primary">
          Add
        </Button>
        <Button onClick={handleClose} variant="outlined" color="secondary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddHoldingDialog;
