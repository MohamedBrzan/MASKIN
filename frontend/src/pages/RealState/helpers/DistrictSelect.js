import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router';
import {
  RiyadhEast,
  RiyadhMiddle,
  RiyadhNorth,
  RiyadhSouth,
  RiyadhWest,
} from './RiyadhDistricts';
import {
  JeddahEast,
  JeddahMiddle,
  JeddahNorth,
  JeddahSouth,
} from './JeddahDistricts';
import { Mecca } from './MeccaDistricts';
import '../RealState.css';

export default function DistrictSelect({
  setQuery,
  areaValue,
  countryValue,
  districtValue,
  setDistrictValue,
}) {
  const navigate = useNavigate();
  // setDistrictValue('');
  if (areaValue === 'شمال الرياض') {
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
          <b>الحى</b> <span className='px-1'>{districtValue}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className='scroll-dropdown'>
          {RiyadhNorth.map(({ value, name }, i) => (
            <Dropdown.Item
              key={i}
              id={value}
              title={name}
              onClick={(e) => {
                navigate('/real-state');
                setDistrictValue(name);
                setQuery(`?district=${e.target.getAttribute('id')}`);
              }}
            >
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  } else if (areaValue === 'جنوب الرياض') {
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
          <b>الحى</b> <span className='px-1'>{districtValue}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className='scroll-dropdown'>
          {RiyadhSouth.map(({ value, name }, i) => (
            <Dropdown.Item
              key={i}
              id={value}
              title={name}
              onClick={(e) => {
                navigate('/real-state');
                setDistrictValue(name);
                setQuery(`?district=${e.target.getAttribute('id')}`);
              }}
            >
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  } else if (areaValue === 'شرق الرياض') {
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
          <b>الحى</b> <span className='px-1'>{districtValue}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className='scroll-dropdown'>
          {RiyadhEast.map(({ value, name }, i) => (
            <Dropdown.Item
              key={i}
              id={value}
              title={name}
              onClick={(e) => {
                navigate('/real-state');
                setDistrictValue(name);
                setQuery(`?district=${e.target.getAttribute('id')}`);
              }}
            >
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  } else if (areaValue === 'غرب الرياض') {
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
          <b>الحى</b> <span className='px-1'>{districtValue}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className='scroll-dropdown'>
          {RiyadhWest.map(({ value, name }, i) => (
            <Dropdown.Item
              key={i}
              id={value}
              title={name}
              onClick={(e) => {
                navigate('/real-state');
                setDistrictValue(name);
                setQuery(`?district=${e.target.getAttribute('id')}`);
              }}
            >
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  } else if (areaValue === 'وسط الرياض') {
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
          <b>الحى</b> <span className='px-1'>{districtValue}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className='scroll-dropdown'>
          {RiyadhMiddle.map(({ value, name }, i) => (
            <Dropdown.Item
              key={i}
              id={value}
              title={name}
              onClick={(e) => {
                navigate('/real-state');
                setDistrictValue(name);
                setQuery(`?district=${e.target.getAttribute('id')}`);
              }}
            >
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  } else if (areaValue === 'شمال جدة') {
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
          <b>الحى</b> <span className='px-1'>{districtValue}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className='scroll-dropdown'>
          {JeddahNorth.map(({ value, name }, i) => (
            <Dropdown.Item
              key={i}
              id={value}
              title={name}
              onClick={(e) => {
                navigate('/real-state');
                setDistrictValue(name);
                setQuery(`?district=${e.target.getAttribute('id')}`);
              }}
            >
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  } else if (areaValue === 'وسط جدة') {
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
          <b>الحى</b> <span className='px-1'>{districtValue}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className='scroll-dropdown'>
          {JeddahMiddle.map(({ value, name }, i) => (
            <Dropdown.Item
              key={i}
              id={value}
              title={name}
              onClick={(e) => {
                navigate('/real-state');
                setDistrictValue(name);
                setQuery(`?district=${e.target.getAttribute('id')}`);
              }}
            >
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  } else if (areaValue === 'جنوب جدة') {
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
          <b>الحى</b> <span className='px-1'>{districtValue}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className='scroll-dropdown'>
          {JeddahSouth.map(({ value, name }, i) => (
            <Dropdown.Item
              key={i}
              id={value}
              title={name}
              onClick={(e) => {
                navigate('/real-state');
                setDistrictValue(name);
                setQuery(`?district=${e.target.getAttribute('id')}`);
              }}
            >
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  } else if (areaValue === 'شرق جدة') {
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
          <b>الحى</b> <span className='px-1'>{districtValue}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className='scroll-dropdown'>
          {JeddahEast.map(({ value, name }, i) => (
            <Dropdown.Item
              key={i}
              id={value}
              title={name}
              onClick={(e) => {
                navigate('/real-state');
                setDistrictValue(name);
                setQuery(`?district=${e.target.getAttribute('id')}`);
              }}
            >
              {name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    );
  } else if (countryValue === 'مكة المكرمة') {
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
          <b>الحى</b> <span className='px-1'>{districtValue}</span>
        </Dropdown.Toggle>

        <Dropdown.Menu className='scroll-dropdown'>
          {Mecca.map(({ value, name }, i) => (
            <Dropdown.Item
              key={i}
              id={value}
              title={name}
              onClick={(e) => {
                navigate('/real-state');
                setDistrictValue(name);
                setQuery(`?district=${e.target.getAttribute('id')}`);
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
