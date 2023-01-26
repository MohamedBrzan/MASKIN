import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router';

const options = [
  { value: 'true', name: 'عاجل' },
  { value: 'false', name: 'غير عاجل' },
];

export default function UrgentSelect({
  setQuery,
  urgentValue,
  setUrgentValue,
}) {
  const navigate = useNavigate();
  return (
    <Dropdown autoClose='outside' className='d-block text-center scroll-dropdown'>
      <Dropdown.Toggle
        variant='transparent'
        className='d-block w-100 border border-2'
      >
        {' '}
        <b>الحالة</b> <span className='px-1'>{urgentValue}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map(({ value, name }, i) => (
          <Dropdown.Item
            key={i}
            id={value}
            title={name}
            onClick={(e) => {
              navigate('/real-state');
              setUrgentValue(name);
              setQuery(`?urgent=${e.target.getAttribute('id')}`);
            }}
          >
            {name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
