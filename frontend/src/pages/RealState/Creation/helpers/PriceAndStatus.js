import React from 'react';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';

const PriceAndStatus = ({
  propertyStatus,
  setPropertyStatus,
  propertyPlacement,
  setPropertyPlacement,
  price,
  setPrice,
  urgent,
  setUrgent,
}) => {
  return (
    <Row>
      <Col xs={12} md={6} lg={4} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label>حالة المنشأة :</Form.Label>
          <FormControl
            as={'select'}
            required
            value={propertyPlacement}
            onChange={(e) => setPropertyPlacement(e.target.value)}
          >
            <option value='sale'>بيع</option>
            <option value='rent'>إيجار</option>
          </FormControl>
        </Form.Group>
      </Col>
      {propertyPlacement === 'rent' ? (
        <Col xs={12} md={6} lg={4} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label>الإيجار الشهرى ( ريال سعودى ) </Form.Label>
            <FormControl
              type='number'
              value={price}
              onChange={(e) => {
                if (e.target.value <= 0) {
                  return;
                } else {
                  setPrice(e.target.value);
                }
              }}
            />
          </Form.Group>
        </Col>
      ) : (
        <Col xs={12} md={6} lg={4} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label> السعر ( ريال سعودى ) </Form.Label>
            <FormControl
              type='number'
              value={price}
              onChange={(e) => {
                if (e.target.value <= 0) {
                  return;
                } else {
                  setPrice(e.target.value);
                }
              }}
            />
          </Form.Group>
        </Col>
      )}
      <Col xs={12} md={6} lg={4} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label> حالة المنشأة الأن : </Form.Label>
          <FormControl
            as={'select'}
            required
            value={propertyStatus}
            onChange={(e) => setPropertyStatus(e.target.value)}
          >
            <option value='available'>متاح</option>
            <option value='sold'>تم البيع</option>
            <option value='rented'>تم الإيجار</option>
          </FormControl>
        </Form.Group>
      </Col>

      <Form.Group className='mb-3'>
        <Form.Check
          label='الخدمة عاجلة'
          inline
          type='checkbox'
          checked={urgent}
          onChange={(e) => setUrgent(e.target.checked)}
        />
      </Form.Group>
    </Row>
  );
};

export default PriceAndStatus;
