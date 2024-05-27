import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useIsMountedRef from "./useIsMountedRef";

function useForm(initialState = {}, onSubmit, location) {
  const [formData, setFormData] = useState(initialState);
  const [formErrors, setFormErrors] = useState([]);
  const [formSuccess, setFormSuccess] = useState(false);
  const navigate = useNavigate();
  const isMountedRef = useIsMountedRef();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.type === "number" ? Number(e.target.value) : e.target.value,
    });
    setFormErrors([]);
    setFormSuccess(false);
  };

  const handleSubmit = async (e) => {
    debugger;
    e.preventDefault();
    let result = await onSubmit?.(formData);
    if (result.success) {
      if (isMountedRef.current) {
        setFormSuccess(true);
      }
      console.log(location);
      location && navigate(location);
    } else {
      if (isMountedRef.current) {
        setFormErrors(result.errors);
        setFormSuccess(false);
      }
    }
  };

  return { formData, formErrors, formSuccess, handleChange, handleSubmit };
}

export { useForm };
