import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router';

const options = [
  { value: 'house', name: 'منزل' },
  { value: 'apartment', name: 'شقة' },
  { value: 'villa', name: 'فيلا' },
  { value: 'farm', name: 'مزرعة' },
  { value: 'land', name: 'أرض خاليه' },
  { value: 'room', name: 'غرفة' },
  { value: 'townhouse', name: 'تاون هاوس' },
  { value: 'office', name: 'مكتب' },
  { value: 'warehouse', name: 'مستودع' },
  { value: 'other', name: 'أخرى' },
];

export default function TypeSelect({ setQuery, typeValue, setTypeValue }) {
  const navigate = useNavigate();
  return (
    <Dropdown autoClose='outside' className='d-block text-center scroll-dropdown'>
      <Dropdown.Toggle variant='transparent' className='d-block w-100 border border-2'>
        {' '}
        <b>نوع العقار</b>{' '}
        <span className='px-1'>{typeValue}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map(({ value, name }, i) => (
          <Dropdown.Item
            key={i}
            id={value}
            title={name}
            onClick={(e) => {
              navigate('/real-state');
              setTypeValue(name);
              setQuery(`?type=${e.target.getAttribute('id')}`);
            }}
          >
            {name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
