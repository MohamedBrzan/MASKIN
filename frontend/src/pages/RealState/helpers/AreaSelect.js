import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router';
import JeddahAreas from './JeddahAreas';
import RiyadhAreas from './RiyadhAreas';

export default function AreaSelect({
  setQuery,
  countryValue,
  areaValue,
  setAreaValue,
}) {
  const navigate = useNavigate();

  if (countryValue === 'الرياض') {
    return (
      <Dropdown autoClose='outside' className='d-block text-center'>
        <Dropdown.Toggle
          variant='transparent'
          className='d-block w-100 border border-2'
        >
          {' '}
          <b>المنطقة</b> <span className='px-1'>{areaValue}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className='scroll-dropdown'>
          {RiyadhAreas.map(({ value, name }, i) => (
            <Dropdown.Item
              key={i}
              id={value}
              title={name}
              onClick={(e) => {
                navigate('/real-state');
                setAreaValue(name);
                setQuery(`?area=${e.target.getAttribute('id')}`);
              }}
            >
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  } else if (countryValue === 'جدة') {
    return (
      <Dropdown autoClose='outside'>
        <Dropdown.Toggle
          variant='transparent'
          className='d-block w-100 border border-2'
        >
          {' '}
          <b>المنطقة</b> <span className='px-1'>{areaValue}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className='scroll-dropdown'>
          {JeddahAreas.map(({ value, name }, i) => (
            <Dropdown.Item
              key={i}
              id={value}
              title={name}
              onClick={(e) => {
                navigate('/real-state');
                setAreaValue(name);
                setQuery(`?area=${e.target.getAttribute('id')}`);
              }}
            >
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  }
}
