import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';

const Coordinates = ({ latitude, setLatitude, longitude, setLongitude }) => {
  return (
    <Row>
      <Col xs={12} md={6} lg={4} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label> خط العرض :</Form.Label>
          <FormControl
            type='text'
            required
            value={latitude}
            onChange={(e) => {
              if (e.target.value <= 0) {
                return;
              } else {
                setLatitude(e.target.value);
              }
            }}
          />
        </Form.Group>
      </Col>
      <Col xs={12} md={6} lg={4} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label> خط الطول :</Form.Label>
          <FormControl
            type='text'
            required
            value={longitude}
            onChange={(e) => {
              if (e.target.value <= 0) {
                return;
              } else {
                setLongitude(e.target.value);
              }
            }}
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default Coordinates;
