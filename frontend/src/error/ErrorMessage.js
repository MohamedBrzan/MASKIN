import Alert from 'react-bootstrap/Alert';

const ErrorMessage = ({ variant, children }) => {
  return <Alert variant={variant || 'info'} className='my-3'>{children}</Alert>;
};

export default ErrorMessage;
