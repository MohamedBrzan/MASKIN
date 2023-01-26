import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import '../RealState.css';

const gteOptions = [
  { name: '0', value: 0 },
  { name: '50', value: 50 },
  { name: '200', value: 200 },
  { name: '1M', value: 1000000 },
  { name: '2M', value: 2000000 },
  { name: '3M', value: 3000000 },
];

const lteOptions = [
  { name: '50K', value: 50000 },
  { name: '200K', value: 200000 },
  { name: '1M', value: 1000000 },
  { name: '2M', value: 2000000 },
  { name: '3M', value: 3000000 },
  { name: '4M', value: 4000000 },
  { name: '5M', value: 5000000 },
];

export default function PriceSelect({
  setQuery,
  minPriceValue,
  setMinPriceValue,
  maxPriceValue,
  setMaxPriceValue,
}) {
  const navigate = useNavigate();
  const selectedText = useRef();
  return (
    <Dropdown autoClose='outside' className='d-block text-center inherit-dropdown'>
      <Dropdown.Toggle
        variant='transparent'
        className='d-block w-100 border border-2'
      >
        {' '}
        <b>السعر</b>{' '}
        <span className='px-1 selected-text' ref={selectedText}>
          {Number(minPriceValue) && !Number(maxPriceValue)
            ? `${minPriceValue}`
            : Number(maxPriceValue) && !Number(maxPriceValue)
            ? `${maxPriceValue}`
            : Number(maxPriceValue)
            ? Number(maxPriceValue) && `${minPriceValue} - ${maxPriceValue}`
            : ''}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <p className='text-muted text-center'>السعر بالريال السعودى</p>
        <Row className='px-1'>
          <Col>
            {' '}
            <Dropdown
              autoClose='outside'
              className='select d-block text-center'
            >
              <Dropdown.Toggle
                variant='transparent'
                className='d-block w-100 border border-2'
              >
                {' '}
                <b>من</b> <span className='px-1'>{minPriceValue}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {gteOptions.map(({ name, value }, i) => (
                  <Dropdown.Item
                    key={i}
                    id={value}
                    title={value}
                    onClick={(e) => {
                      navigate('/real-state');
                      setMinPriceValue(value);
                      if (Number(maxPriceValue)) {
                        if (Number(maxPriceValue) < value) {
                          setQuery(
                            `?price[gte]=${maxPriceValue}&price[lte]=${value}`
                          );
                        } else {
                          setQuery(
                            `?price[gte]=${value}&price[lte]=${maxPriceValue}`
                          );
                        }
                      } else {
                        setQuery(`?price[gte]=${value}`);
                      }
                    }}
                  >
                    {name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
          <Col>
            {' '}
            <Dropdown
              autoClose='outside'
              className='select d-block text-center'
            >
              <Dropdown.Toggle
                variant='transparent'
                className='d-block w-100 border border-2'
              >
                {' '}
                <b>إلى</b>{' '}
                <span className='px-1 selected-text'>{maxPriceValue}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {lteOptions.map(({ name, value }, i) => (
                  <Dropdown.Item
                    key={i}
                    id={value}
                    title={name}
                    onClick={(e) => {
                      navigate('/real-state');
                      setMaxPriceValue(value);
                      if (Number(minPriceValue)) {
                        if (Number(minPriceValue) > value) {
                          setQuery(
                            `?price[gte]=${value}&price[lte]=${minPriceValue}`
                          );
                        } else {
                          setQuery(
                            `?price[gte]=${minPriceValue}&price[lte]=${value}`
                          );
                        }
                      } else {
                        setQuery(`?price[lte]=${value}`);
                      }
                    }}
                  >
                    {name}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <button
          className='btn mt-3 d-block m-auto border border-dark'
          onClick={(e) => {
            setQuery(`?price[gte]=5000000`);

            selectedText.current.textContent = 'أكبر من 5M';
          }}
        >
          أكبر من 5M SAR
        </button>
      </Dropdown.Menu>
    </Dropdown>
  );
}
