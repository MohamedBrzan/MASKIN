import Dropdown from 'react-bootstrap/Dropdown';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useNavigate } from 'react-router';
import { useRef } from 'react';

const gteOptions = [
  {
    value: 100,
  },
  {
    value: 150,
  },
  {
    value: 200,
  },
  {
    value: 250,
  },
  {
    value: 300,
  },
  {
    value: 350,
  },
  {
    value: 400,
  },
  {
    value: 450,
  },
  {
    value: 500,
  },
  {
    value: 550,
  },
];

const lteOptions = [
  {
    value: 150,
  },
  {
    value: 200,
  },
  {
    value: 250,
  },
  {
    value: 300,
  },
  {
    value: 350,
  },
  {
    value: 400,
  },
  {
    value: 450,
  },
  {
    value: 500,
  },
  {
    value: 550,
  },
  {
    value: 600,
  },
];

export default function SpaceSelect({
  setQuery,
  minSpaceValue,
  setMinSpaceValue,
  maxSpaceValue,
  setMaxSpaceValue,
}) {
  const navigate = useNavigate();
  const selectedText = useRef();
  return (
    <Dropdown
      autoClose='outside'
      className='d-block text-center inherit-dropdown'
    >
      <Dropdown.Toggle
        variant='transparent'
        className='d-block w-100 border border-2'
      >
        {' '}
        <b>مساحة العقار</b>{' '}
        <span className='px-1 selected-text' ref={selectedText}>
          {Number(minSpaceValue) && !Number(maxSpaceValue)
            ? `${minSpaceValue}`
            : Number(maxSpaceValue) && !Number(maxSpaceValue)
            ? `${maxSpaceValue}`
            : Number(maxSpaceValue)
            ? Number(maxSpaceValue) && `${minSpaceValue} - ${maxSpaceValue}`
            : ''}
        </span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <p className='text-muted text-center'>المساحة بالمتر المربع م2</p>
        <button
          className='btn mb-3 d-block m-auto border border-dark'
          onClick={(e) => {
            setQuery(`?space[lte]=100`);
            selectedText.current.textContent = 'أقل من 100 م2';
          }}
        >
          أقل من 100 م2
        </button>
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
                <b>من</b> <span className='px-1'>{minSpaceValue}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {gteOptions.map(({ value }, i) => (
                  <Dropdown.Item
                    key={i}
                    id={value}
                    title={value}
                    onClick={(e) => {
                      navigate('/real-state');
                      setMinSpaceValue(value);
                      if (Number(maxSpaceValue)) {
                        if (Number(maxSpaceValue) < value) {
                          setQuery(
                            `?space[gte]=${maxSpaceValue}&space[lte]=${value}`
                          );
                        } else {
                          setQuery(
                            `?space[gte]=${value}&space[lte]=${maxSpaceValue}`
                          );
                        }
                      } else {
                        setQuery(`?space[gte]=${value}`);
                      }
                    }}
                  >
                    {value}
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
                <span className='px-1 selected-text'>{maxSpaceValue}</span>
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {lteOptions.map(({ value }, i) => (
                  <Dropdown.Item
                    key={i}
                    id={value}
                    title={value}
                    onClick={(e) => {
                      navigate('/real-state');
                      setMaxSpaceValue(value);
                      if (Number(minSpaceValue)) {
                        if (Number(minSpaceValue) > value) {
                          setQuery(
                            `?space[gte]=${value}&space[lte]=${minSpaceValue}`
                          );
                        } else {
                          setQuery(
                            `?space[gte]=${minSpaceValue}&space[lte]=${value}`
                          );
                        }
                      } else {
                        setQuery(`?space[lte]=${value}`);
                      }
                    }}
                  >
                    {value}
                  </Dropdown.Item>
                ))}
              </Dropdown.Menu>
            </Dropdown>
          </Col>
        </Row>
        <button
          className='btn mt-3 d-block m-auto border border-dark'
          onClick={(e) => {
            setQuery(`?space[gte]=600`);

            selectedText.current.textContent = 'أكثر من 600 م2';
          }}
        >
          أكثر من 600 م2
        </button>
      </Dropdown.Menu>
    </Dropdown>
  );
}
