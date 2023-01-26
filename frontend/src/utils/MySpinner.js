import Spinner from 'react-bootstrap/Spinner';

const MySpinner = ({ isLoading }) => {
  return (
    <div className='d-flex justify-content-center align-items-center'>
      <Spinner animation='border' size='lg' />
    </div>
  );
};

export default MySpinner;
