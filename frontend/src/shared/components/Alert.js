import React from "react";
import { Alert, Button } from "react-bootstrap";
const AlertNotification = () => {
  return (
    <>
      <Alert variant="warning">
        <Alert.Heading>Note!</Alert.Heading>
        <p>
          Please Reload the page after performing any of the CRUD Operations, to
          see the effect.
        </p>
        <hr />
      </Alert>
    </>
  );
};

export default AlertNotification;
