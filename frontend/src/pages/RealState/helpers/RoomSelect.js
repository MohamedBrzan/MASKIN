import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router';

const options = [
  {
    name: '1',
  },
  {
    name: '2',
  },
  {
    name: '3',
  },
  {
    name: '4',
  },
  {
    name: 'أكثر من 4',
  },
];

export default function RoomSelect({ setQuery, roomsValue, setRoomsValue }) {
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
        <b>عدد الغرف</b> <span className='px-1'>{roomsValue}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map(({ name }, i) => (
          <Dropdown.Item
            key={i}
            title={name}
            onClick={(e) => {
              navigate('/real-state');
              setRoomsValue(name);
              if (name === '1') {
                setQuery('?rooms=1');
              } else if (name === '2') {
                setQuery('?rooms=2');
              } else if (name === '3') {
                setQuery('?rooms=3');
              } else if (name === '4') {
                setQuery('?rooms=4');
              } else {
                setQuery('?rooms[gte]=4');
              }
            }}
          >
            {name}
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
