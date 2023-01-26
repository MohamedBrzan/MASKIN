import Alert from 'react-bootstrap/Alert';
import React from 'react';

const ErrorHandler = ({ children, variant }) => {
  return <Alert variant={variant ? variant : 'info'}>{children}</Alert>;
};

export default ErrorHandler;
