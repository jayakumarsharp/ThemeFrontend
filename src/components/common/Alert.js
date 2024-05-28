import { useEffect } from 'react';
import { Alert as BootstrapAlert } from '@mui/material';

/** Presentational component for showing bootstrap-style alerts.
 *
 * { LoginForm, SignupForm, ProfileForm } -> Alert
 **/

function Alert({ type = "danger", messages = [] }) {
  useEffect(() => {
    console.debug("Alert", "type=", type, "messages=", messages);
  })

  return (
    <>
      {messages.map((message, index) => <BootstrapAlert variant={type} key={`${type}-${index}`}>{message}</BootstrapAlert>)}
    </>
  );
}

export default Alert;