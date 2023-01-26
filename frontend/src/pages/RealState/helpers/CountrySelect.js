import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router';
import Countries from './Countries';

export default function CountrySelect({
  setQuery,
  setAreaValue,
  setDistrictValue,
  countryValue,
  setCountryValue,
}) {
  const navigate = useNavigate();

  return (
    <Dropdown
      autoClose='outside'
      className='d-block text-center scroll-dropdown'
    >
      <Dropdown.Toggle
        variant='transparent'
        className='d-block w-100 border border-2'
      >
        {' '}
        <b>المدينة</b> <span className='px-1'>{countryValue}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu className='scroll-dropdown'>
        {Countries.map(({ value, name }, i) => (
          <Dropdown.Item
            key={i}
            id={value}
            title={name}
            onClick={(e) => {
              setAreaValue('');
              setDistrictValue('');
              navigate('/real-state');
              setCountryValue(name);
              setQuery(`?country=${e.target.getAttribute('id')}`);
            }}
          >
            {name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
