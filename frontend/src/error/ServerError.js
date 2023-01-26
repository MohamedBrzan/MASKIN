import Alert from 'react-bootstrap/Alert';

const ServerError = ({ error, variant }) => {
  return (
    <Alert variant={variant ? variant : 'info'}>
      {error.response
        ? error.response
        : error.response.data
        ? error.response.data
        : error.response.data.message
        ? error.response.data.message
        : 'Something Went Wrong! Please Try Again Later '}
    </Alert>
  );
};

export default ServerError;
