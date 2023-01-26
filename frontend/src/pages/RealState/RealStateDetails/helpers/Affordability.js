import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/esm/Row';
import Col from 'react-bootstrap/esm/Col';
import FormGroup from 'react-bootstrap/esm/FormGroup';
import { LastRechart } from '../../../Profile/helpers/RealStateCharts';
import { useState } from 'react';

const Affordability = ({ realStatePrice }) => {
  const [formData, setFormData] = useState({
    initialBatch: 0,
    interestRate: 0,
    loanType: '',
  });

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const { initialBatch, interestRate, loanType } = formData;

  return (
    <Form className='affordability-form'>
      <Row>
        <Col>
          {' '}
          <FormGroup>
            <Form.Label>سعر المنزل ( ر.س )</Form.Label>

            <Form.Control
              type='number'
              name='affordability'
              onChange={onChange}
              placeholder='سعر المنزل'
              value={realStatePrice}
            />
          </FormGroup>
        </Col>
        <Col>
          {' '}
          <FormGroup>
            <Form.Label>دفعة مبدئية ( ر.س )</Form.Label>
            <Form.Control
              type='number'
              name='initialBatch'
              value={initialBatch}
              onChange={onChange}
              placeholder='دفعة مبدئية'
            />
          </FormGroup>
        </Col>
        <Col>
          {' '}
          <FormGroup>
            <Form.Label>سعر الفائدة %</Form.Label>
            <Form.Control
              type='number'
              name='interestRate'
              value={interestRate}
              onChange={onChange}
              placeholder='سعر الفائدة'
            />
          </FormGroup>
        </Col>
        <Col>
          {' '}
          <FormGroup>
            <Form.Label>نوع القرض</Form.Label>
            <Form.Control
              as='select'
              name='loanType'
              onChange={onChange}
              value={loanType}
            >
              <option value='5 years'>5 سنوات</option>
              <option value='10 years'>10 سنوات</option>
              <option value='15 years'>15 سنة</option>
              <option value='20 years'>20 سنة</option>
              <option value='25 years'>25 سنة</option>
              <option value='30 years'>30 سنة</option>
            </Form.Control>
          </FormGroup>
        </Col>
      </Row>
      <LastRechart />
    </Form>
  );
};

export default Affordability;
