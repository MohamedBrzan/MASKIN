import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';

const Features = ({
  bedroom,
  setBedroom,
  bathroom,
  setBathroom,
  kitchen,
  setKitchen,
  balcony,
  setBalcony,
  garage,
  setGarage,
}) => {
  return (
    <Row>
      <Col xs={12} md={4} lg={2} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label>غرفة النوم :</Form.Label>
          <FormControl
            type='number'
            required
            value={bedroom}
            onChange={(e) => setBedroom(e.target.value)}
          />
        </Form.Group>
      </Col>
      <Col xs={12} md={4} lg={3} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label>دورة المياة :</Form.Label>
          <FormControl
            type='number'
            required
            value={bathroom}
            onChange={(e) => setBathroom(e.target.value)}
          />
        </Form.Group>
      </Col>
      <Col xs={12} md={4} lg={2} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label> الشرفات :</Form.Label>
          <FormControl
            type='number'
            required
            value={balcony}
            onChange={(e) => setBalcony(e.target.value)}
          />
        </Form.Group>
      </Col>
      <Col xs={12} md={4} lg={2} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label> المطبخ :</Form.Label>
          <FormControl
            type='number'
            required
            value={kitchen}
            onChange={(e) => setKitchen(e.target.value)}
          />
        </Form.Group>
      </Col>
      <Col xs={12} md={4} lg={3} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label>الجراج :</Form.Label>
          <FormControl
            type='number'
            required
            value={garage}
            onChange={(e) => setGarage(e.target.value)}
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default Features;
