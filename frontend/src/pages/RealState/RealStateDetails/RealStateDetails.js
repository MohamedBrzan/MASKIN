import Container from 'react-bootstrap/Container';
import ImagesDisplay from '../helpers/ImagesDisplay';
import RealStateInfo from '../RealStateDetails/helpers/RealStateInfo';
import './RealStateDetails.css';

const RealState = () => {

  
  return (
    <Container className='real-state-details'>
      <ImagesDisplay />
      <RealStateInfo />
    </Container>
  );
};

export default RealState;
