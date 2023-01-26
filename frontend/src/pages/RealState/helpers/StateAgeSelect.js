import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router';

const options = [
  {
    gte: new Date().getFullYear() - 4,
    lte: new Date().getFullYear(),
    name: 'جديد',
  },
  {
    gte: new Date().getFullYear() - 10,
    lte: new Date().getFullYear(),
    name: 'من 5 إلى 10 سنوات',
  },
  {
    gte: new Date().getFullYear() - 20,
    lte: new Date().getFullYear(),
    name: 'من 10 إلى 20 سنة',
  },
  {
    lte: new Date().getFullYear() - 20,
    name: 'أكثر من 20 سنة',
  },
];

export default function StateAgeSelect({
  setQuery,
  stateAgeValue,
  setStateAgeValue,
}) {
  const navigate = useNavigate();
  return (
    <Dropdown autoClose='outside' className='d-block text-center'>
      <Dropdown.Toggle
        variant='transparent'
        className='d-block w-100 border border-2'
      >
        {' '}
        <b>عمر العقار</b> <span className='px-1'>{stateAgeValue}</span>
      </Dropdown.Toggle>

      <Dropdown.Menu>
        {options.map(({ gte, lte, name }, i) => (
          <Dropdown.Item
            key={i}
            title={name}
            onClick={(e) => {
              navigate('/real-state');
              setStateAgeValue(name);
              if (gte && lte) {
                setQuery(`?stateAge[gte]=${gte}&stateAge[lte]=${lte}`);
              } else if (gte && !lte) {
                setQuery(`?stateAge[gte]=${gte}`);
              } else if (!gte && lte) {
                setQuery(`?stateAge[lte]=${lte}`);
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
