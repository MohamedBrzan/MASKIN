import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import { toast } from 'react-toastify';
import RiyadhAreas from '../../helpers/RiyadhAreas';
import JeddahAreas from '../../helpers/JeddahAreas';
import { Mecca } from '../../helpers/MeccaDistricts';
import {
  RiyadhNorth,
  RiyadhSouth,
  RiyadhMiddle,
  RiyadhEast,
  RiyadhWest,
} from '../../helpers/RiyadhDistricts';
import {
  JeddahNorth,
  JeddahSouth,
  JeddahMiddle,
  JeddahEast,
} from '../../helpers/JeddahDistricts';
import FormSelect from 'react-bootstrap/esm/FormSelect';
import Countries from '../../helpers/Countries';

const Location = ({
  propertyType,
  propertyCity,
  setPropertyCity,
  propertyArea,
  setPropertyArea,
  propertyDistrict,
  setPropertyDistrict,
  propertyAddress,
  setPropertyAddress,
  blockNo,
  setBlockNo,
}) => {
  const riyadhRex = /riyadh/gi;
  const riyadhNorthRex = /riyadh north/gi;
  const riyadhSouthRex = /riyadh south/gi;
  const riyadhMiddleRex = /riyadh middle/gi;
  const riyadhEastRex = /riyadh east/gi;
  const riyadhWestRex = /riyadh west/gi;

  const jeddahRex = /jeddah/gi;
  const jeddahNorthRex = /jeddah north/gi;
  const jeddahSouthRex = /jeddah south/gi;
  const jeddahMiddleRex = /jeddah middle/gi;
  const jeddahEastRex = /jeddah east/gi;

  const meccaRex = /mecca/gi;

  return (
    <Row>
      <Col xs={12} md={6} lg={3} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label>المدينة :</Form.Label>
          <FormSelect
            type='text'
            required
            value={propertyCity}
            onChange={(e) => setPropertyCity(e.target.value)}
          >
            {Countries.map(({ name, value }, index) => (
              <option value={value} key={index}>
                {name}
              </option>
            ))}
          </FormSelect>
        </Form.Group>
      </Col>

      {propertyCity.match(riyadhRex) && (
        <Col xs={12} md={6} lg={3} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label>المنطقة :</Form.Label>
            <FormSelect
              type='text'
              required
              value={propertyArea}
              onChange={(e) => setPropertyArea(e.target.value)}
            >
              {RiyadhAreas.map(({ name, value }, index) => (
                <option value={value} key={index}>
                  {name}
                </option>
              ))}
            </FormSelect>
          </Form.Group>
        </Col>
      )}

      {propertyCity.match(jeddahRex) && (
        <Col xs={12} md={6} lg={3} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label>المنطقة :</Form.Label>
            <FormSelect
              type='text'
              required
              value={propertyArea}
              onChange={(e) => setPropertyArea(e.target.value)}
            >
              {JeddahAreas.map(({ name, value }, index) => (
                <option value={value} key={index}>
                  {name}
                </option>
              ))}
            </FormSelect>
          </Form.Group>
        </Col>
      )}

      {propertyCity.match(meccaRex) && (
        <Col xs={12} md={6} lg={3} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label>الحى :</Form.Label>
            <FormSelect
              type='text'
              required
              value={propertyDistrict}
              onChange={(e) => setPropertyDistrict(e.target.value)}
            >
              {Mecca.map(({ name, value }, index) => (
                <option value={value} key={index}>
                  {name}
                </option>
              ))}
            </FormSelect>
          </Form.Group>
        </Col>
      )}

      {propertyCity.match(riyadhRex) && propertyArea.match(riyadhNorthRex) && (
        <Col xs={12} md={6} lg={3} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label>الحى :</Form.Label>
            <FormSelect
              type='text'
              required
              value={propertyDistrict}
              onChange={(e) => setPropertyDistrict(e.target.value)}
            >
              {RiyadhNorth.map(({ name, value }, index) => (
                <option value={value} key={index}>
                  {name}
                </option>
              ))}
            </FormSelect>
          </Form.Group>
        </Col>
      )}

      {propertyCity.match(riyadhRex) && propertyArea.match(riyadhSouthRex) && (
        <Col xs={12} md={6} lg={3} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label>الحى :</Form.Label>
            <FormSelect
              type='text'
              required
              value={propertyDistrict}
              onChange={(e) => setPropertyDistrict(e.target.value)}
            >
              {RiyadhSouth.map(({ name, value }, index) => (
                <option value={value} key={index}>
                  {name}
                </option>
              ))}
            </FormSelect>
          </Form.Group>
        </Col>
      )}

      {propertyCity.match(riyadhRex) && propertyArea.match(riyadhMiddleRex) && (
        <Col xs={12} md={6} lg={3} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label>الحى :</Form.Label>
            <FormSelect
              type='text'
              required
              value={propertyDistrict}
              onChange={(e) => setPropertyDistrict(e.target.value)}
            >
              {RiyadhMiddle.map(({ name, value }, index) => (
                <option value={value} key={index}>
                  {name}
                </option>
              ))}
            </FormSelect>
          </Form.Group>
        </Col>
      )}

      {propertyCity.match(riyadhRex) && propertyArea.match(riyadhEastRex) && (
        <Col xs={12} md={6} lg={3} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label>الحى :</Form.Label>
            <FormSelect
              type='text'
              required
              value={propertyDistrict}
              onChange={(e) => setPropertyDistrict(e.target.value)}
            >
              {RiyadhEast.map(({ name, value }, index) => (
                <option value={value} key={index}>
                  {name}
                </option>
              ))}
            </FormSelect>
          </Form.Group>
        </Col>
      )}

      {propertyCity.match(riyadhRex) && propertyArea.match(riyadhWestRex) && (
        <Col xs={12} md={6} lg={3} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label>الحى :</Form.Label>
            <FormSelect
              type='text'
              required
              value={propertyDistrict}
              onChange={(e) => setPropertyDistrict(e.target.value)}
            >
              {RiyadhWest.map(({ name, value }, index) => (
                <option value={value} key={index}>
                  {name}
                </option>
              ))}
            </FormSelect>
          </Form.Group>
        </Col>
      )}

      {propertyCity.match(jeddahRex) && propertyArea.match(jeddahNorthRex) && (
        <Col xs={12} md={6} lg={3} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label>الحى :</Form.Label>
            <FormSelect
              type='text'
              required
              value={propertyDistrict}
              onChange={(e) => setPropertyDistrict(e.target.value)}
            >
              {JeddahNorth.map(({ name, value }, index) => (
                <option value={value} key={index}>
                  {name}
                </option>
              ))}
            </FormSelect>
          </Form.Group>
        </Col>
      )}

      {propertyCity.match(jeddahRex) && propertyArea.match(jeddahSouthRex) && (
        <Col xs={12} md={6} lg={3} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label>الحى :</Form.Label>
            <FormSelect
              type='text'
              required
              value={propertyDistrict}
              onChange={(e) => setPropertyDistrict(e.target.value)}
            >
              {JeddahSouth.map(({ name, value }, index) => (
                <option value={value} key={index}>
                  {name}
                </option>
              ))}
            </FormSelect>
          </Form.Group>
        </Col>
      )}

      {propertyCity.match(jeddahRex) && propertyArea.match(jeddahMiddleRex) && (
        <Col xs={12} md={6} lg={3} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label>الحى :</Form.Label>
            <FormSelect
              type='text'
              required
              value={propertyDistrict}
              onChange={(e) => setPropertyDistrict(e.target.value)}
            >
              {JeddahMiddle.map(({ name, value }, index) => (
                <option value={value} key={index}>
                  {name}
                </option>
              ))}
            </FormSelect>
          </Form.Group>
        </Col>
      )}

      {propertyCity.match(jeddahRex) && propertyArea.match(jeddahEastRex) && (
        <Col xs={12} md={6} lg={3} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label>الحى :</Form.Label>
            <FormSelect
              type='text'
              required
              value={propertyDistrict}
              onChange={(e) => setPropertyDistrict(e.target.value)}
            >
              {JeddahEast.map(({ name, value }, index) => (
                <option value={value} key={index}>
                  {name}
                </option>
              ))}
            </FormSelect>
          </Form.Group>
        </Col>
      )}

      {propertyType !== 'farm' && propertyType !== 'land' && (
        <Col xs={12} md={6} lg={3} className='mb-3'>
          <Form.Group className='mb-3'>
            <Form.Label>رقم المنشأة :</Form.Label>
            <FormControl
              type='number'
              required
              value={blockNo}
              onChange={(e) => {
                if (e.target.value <= 0 || '' || undefined) {
                  toast.error('رقم المنشأة لا يمكن ان يكون صفرا او اقل');
                } else {
                  setBlockNo(e.target.value);
                }
              }}
              disabled={propertyType === 'farm' || propertyType === 'land'}
            />
          </Form.Group>
        </Col>
      )}

      <Col xs={12} className='mb-3'>
        <Form.Group className='mb-3'>
          <Form.Label>العنوان :</Form.Label>
          <FormControl
            type='text'
            required
            value={propertyAddress}
            onChange={(e) => setPropertyAddress(e.target.value)}
          />
        </Form.Group>
      </Col>
    </Row>
  );
};

export default Location;
