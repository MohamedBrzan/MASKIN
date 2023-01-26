import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';

const Dimensions = ({
  propertyLength,
  setPropertyLength,
  propertyWidth,
  setPropertyWidth,
}) => {
  const propertySpace = propertyLength * propertyWidth;

  return (
    <Row>
      <Col xs={12} md={6} lg={4} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label>طول المنشأة بالمتر المربع :</Form.Label>
          <FormControl
            type='number'
            required
            value={propertyLength}
            onChange={(e) => {
              if (e.target.value <= 0) {
                return;
              } else {
                setPropertyLength(e.target.value);
              }
            }}
          />
        </Form.Group>
      </Col>
      <Col xs={12} md={6} lg={4} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label>عرض المنشأة بالمتر المربع :</Form.Label>
          <FormControl
            type='number'
            required
            value={propertyWidth}
            onChange={(e) => {
              if (e.target.value <= 0) {
                return;
              } else {
                setPropertyWidth(e.target.value);
              }
            }}
          />
        </Form.Group>
      </Col>
      <Col xs={12} md={6} lg={4} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label>مساحة المنشأة بالمتر المربع :</Form.Label>
          <FormControl type='number' required value={propertySpace} disabled />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default Dimensions;
