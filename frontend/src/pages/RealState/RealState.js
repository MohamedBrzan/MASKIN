import {
  faBath,
  faBed,
  faHandPointDown,
  faSearch,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistance } from 'date-fns';
import { ar } from 'date-fns/locale';
import CurrencyFormat from 'react-currency-format';

import { useEffect, useState } from 'react';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import FormControl from 'react-bootstrap/FormControl';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useLocation, useNavigate } from 'react-router';
import FilterSec from './helpers/FilterSec';
import unknownImage from '../../images/unknown.png';
import { useGetAllRealStatesQuery } from '../../store/apis/RealState';
import { useCreateViewMutation } from '../../store/apis/User/Profile';
import PageTitle from '../../utils/PageTitle';
import { toast } from 'react-toastify';
import ErrorMessage from '../../error/ErrorMessage';
import ServerErrorMessage from '../../error/ServerErrorMessage';
import MySpinner from '../../utils/MySpinner';
import StaticFilter from './helpers/StaticFilter';
import JeddahAreas from './helpers/JeddahAreas';
import RiyadhAreas from './helpers/RiyadhAreas';
import MeccaAreas from './helpers/MeccaAreas';

const RealStates = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const location = useLocation();
  const url = location.search;
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [sorting, setSorting] = useState('');
  let [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState({
    low: 0,
    high: 0,
  });

  let { low, high } = price;

  const [features, setFeatures] = useState('garage');
  const [createView] = useCreateViewMutation();

  const [bedroom, setBedroom] = useState(0);
  const [bathroom, setBathroom] = useState(0);
  const [kitchen, setKitchen] = useState(0);
  const [balcony, setBalcony] = useState(0);
  const [garage, setGarage] = useState(0);

  const [propertyType, setPropertyType] = useState('');
  const [urgent, setUrgent] = useState(false);
  const [placement, setPlacement] = useState('');

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'SAR',
    maximumFractionDigits: 2,
  }).format;

  const dataFormatter = (dateValue) =>
    formatDistance(
      new Date(dateValue),
      new Date(Date.now()),
      { locale: ar } // Pass the locale as an option
    );

  const onChangePrice = (e) => {
    const { name, value } = e.target;
    setPrice({ ...price, [name]: value });
  };

  let pages = [];

  const createViewHandler = async (id) => {
    await createView({
      id,
    });
  };

  let { isLoading, isSuccess, error, data, isError, isFetching, refetch } =
    useGetAllRealStatesQuery(`${query}`);

  if (!isLoading && data) {
    for (let i = 1; i <= data.pagesCount; i++) {
      pages.push(i);
    }
  }

  useEffect(() => {
    if (sorting) {
      setQuery(`?sorting=${sorting}`);
    } else if (url === '?sale') {
      setQuery(`?placement=sale`);
    } else if (url === '?rent') {
      setQuery(`?placement=rent`);
    } else if (url.startsWith('?city')) {
      setQuery(`${url}`);
      console.log(data)
    }

    if (isError) return toast.error(ServerErrorMessage(error));

    refetch();
  }, [
    data,
    error,
    isError,
    isLoading,
    isSuccess,
    navigate,
    page,
    refetch,
    sorting,
    url,
  ]);

  return (
    <section className='real-state'>
      <PageTitle title={'مسكن | العقارات'} />
      {search && isSuccess && !data?.realStates?.length && (
        <ErrorMessage>ما تبحث عنه غير متاح حاليا</ErrorMessage>
      )}{' '}
      <FilterSec
        isSuccess={isSuccess && isSuccess}
        data={isSuccess && data && data}
        features={features}
        setFeatures={setFeatures}
        bedroom={bedroom}
        setBedroom={setBedroom}
        bathroom={bathroom}
        setBathroom={setBathroom}
        kitchen={kitchen}
        setKitchen={setKitchen}
        balcony={balcony}
        setBalcony={setBalcony}
        garage={garage}
        setGarage={setGarage}
        low={low}
        high={high}
        setQuery={setQuery}
        onChangePrice={onChangePrice}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        placement={placement}
        setPlacement={setPlacement}
        urgent={urgent}
        setUrgent={setUrgent}
        show={show}
        handleClose={handleClose}
      />
      <Row className='align-items-center mb-2'>
        <Col>
          <Form.Group>
            {/* <h4 className='search-title mt-3 text-center'>
              إبحث هنــــا
              <FontAwesomeIcon
                icon={faHandPointDown}
                className='text-warning'
              />
            </h4> */}
            <div className='search-container mt-3'>
              <FormControl
                name='search'
                type='search'
                placeholder='أكتب كلمة البحث هنا.....'
                value={search}
                className='search-input'
                onChange={(e) => setSearch(e.target.value)}
              />
              <FontAwesomeIcon
                icon={faSearch}
                size='lg'
                className='btn btn-danger search-icon'
                onClick={(e) => {
                  if (search.length > 0) {
                    setQuery(`?search=${search}`);
                  } else {
                    navigate('/real-state');
                    setQuery(`?search=`);
                  }
                }}
              />
              {/* <span className='btn btn-success' onClick={handleShow}>
                فلتر البحث
              </span> */}
            </div>
          </Form.Group>
        </Col>
        <div className='top-sec d-flex justify-content-end align-items-center'>
          <select value={sorting} onChange={(e) => setSorting(e.target.value)}>
            <option value='new'>الأحدث</option>
            <option value='old'>الأقدم</option>
            <option value='high-price'> السعر ( الأعلى )</option>
            <option value='low-price'> السعر ( الأقل )</option>
            <option value='high-space'>المساحة ( الأكبر )</option>
            <option value='low-space'>المساحة ( الأصغر )</option>
          </select>
        </div>
      </Row>
      <StaticFilter
        isSuccess={isSuccess && isSuccess}
        data={isSuccess && data && data}
        features={features}
        setFeatures={setFeatures}
        bedroom={bedroom}
        setBedroom={setBedroom}
        bathroom={bathroom}
        setBathroom={setBathroom}
        kitchen={kitchen}
        setKitchen={setKitchen}
        balcony={balcony}
        setBalcony={setBalcony}
        garage={garage}
        setGarage={setGarage}
        low={low}
        high={high}
        setQuery={setQuery}
        onChangePrice={onChangePrice}
        propertyType={propertyType}
        setPropertyType={setPropertyType}
        placement={placement}
        setPlacement={setPlacement}
        urgent={urgent}
        setUrgent={setUrgent}
        show={show}
        handleClose={handleClose}
      />
      {isLoading || isFetching ? (
        <MySpinner />
      ) : (
        <Row>
          {data.realStates.length > 0 ? (
            <>
              {data.realStates.map((realState, index) => (
                <Col xs={12} lg={3} className='my-3 col-item' key={index}>
                  <div className='real-state-card'>
                    <Link
                      to={`/real-state/${realState._id}`}
                      onClick={() => {
                        createViewHandler(realState._id);
                        refetch();
                      }}
                    >
                      <div className='card-img'>
                        <img
                          src={
                            realState.propertyStatus !== 'available'
                              ? unknownImage
                              : !realState.general.images[0]
                              ? unknownImage
                              : realState.general.images[0][0] === 'd'
                              ? realState.general.images[0]
                              : unknownImage
                          }
                          alt='real-state-img'
                        />
                      </div>
                    </Link>

                    {new Date(realState.createdAt).getMonth() + 1 >=
                      new Date().getMonth() &&
                      !realState.propertyStatus === 'rented' &&
                      !realState.propertyStatus === 'sold' && (
                        <p className='new'>حديثاً</p>
                      )}
                    {realState.placement === 'sale' &&
                      realState.propertyStatus === 'available' && (
                        <div className='sale'>بيع</div>
                      )}
                    {realState.placement === 'rent' &&
                      realState.propertyStatus === 'available' && (
                        <div className='rent'>إيجار</div>
                      )}
                    {realState.placement === 'rent' &&
                      realState.propertyStatus === 'rented' && (
                        <div className='rented'>تم الإيجار</div>
                      )}
                    {realState.placement === 'sale' &&
                      realState.propertyStatus === 'sold' && (
                        <div className='sold'>تم البيع</div>
                      )}

                    {realState.propertyStatus === 'available' &&
                      realState.urgent === true && (
                        <div className='urgent'>عاجل</div>
                      )}
                  </div>
                  <div className='card-details'>
                    <div className='price'>
                      <CurrencyFormat
                        suffix={' ريال سعودى'}
                        value={realState.price}
                        displayType={'text'}
                        thousandSeparator={true}
                        renderText={(value) => <div>{value}</div>}
                      />
                    </div>
                    <div className='state-year-build'>
                      {' '}
                      <span>
                        {new Date().getFullYear() -
                          realState.general.yearBuilt >
                          0 &&
                          new Date().getFullYear() -
                            realState.general.yearBuilt}
                      </span>
                      <span className='pe-1'>
                        {new Date().getFullYear() -
                          realState.general.yearBuilt <=
                        0
                          ? 'أقل من سنة'
                          : new Date().getFullYear() -
                              realState.general.yearBuilt >
                              0 &&
                            new Date().getFullYear() -
                              realState.general.yearBuilt <
                              1
                          ? ' سنة واحدة'
                          : ' سنة'}
                      </span>
                    </div>

                    <div className='info'>
                      <div className='numbers'>
                        {' '}
                        <span>
                          {' '}
                          <FontAwesomeIcon
                            icon={faBed}
                            size='sm'
                            className='px-1'
                          />
                          {realState.features.bedroom} نوم
                        </span>
                        <span>
                          {' '}
                          <FontAwesomeIcon
                            icon={faBath}
                            size='sm'
                            className='px-1'
                          />
                          {realState.features.bathroom} حمام
                        </span>
                        <span>
                          {' '}
                          <FontAwesomeIcon
                            icon={faVectorSquare}
                            size='sm'
                            className='px-1'
                          />
                          {realState.space} م2
                        </span>
                      </div>
                      <div className='address'>
                        <div>{realState.location.address}</div>
                        {realState.location.city.match(/riyadh/gi) ? (
                          <div>
                            <span>
                              {' '}
                              {RiyadhAreas.map(
                                ({ value, name }, i) =>
                                  value === realState.location.area && name
                              )}
                            </span>
                            <span>
                              {RiyadhAreas.map(
                                ({ value, name, data: dataField }, i) =>
                                  value === realState.location.area &&
                                  dataField.map(
                                    ({ name, value }, i) =>
                                      value === realState.location.district &&
                                      ' ,' + name
                                  )
                              )}
                            </span>
                          </div>
                        ) : realState.location.city.match(/jeddah/gi) ? (
                          <div>
                            <span>
                              {' '}
                              {JeddahAreas.map(
                                ({ value, name }, i) =>
                                  value === realState.location.area && name
                              )}
                            </span>
                            <span>
                              {JeddahAreas.map(
                                ({ value, name, data: dataField }, i) =>
                                  value === realState.location.area &&
                                  dataField.map(
                                    ({ name, value }, i) =>
                                      value === realState.location.district &&
                                      ' ,' + name
                                  )
                              )}
                            </span>
                          </div>
                        ) : realState.location.city.match(/mecca/gi) ? (
                          <span>
                            {MeccaAreas.map(
                              ({ value, name, data: dataField }, i) =>
                                dataField.map(
                                  ({ name, value }, i) =>
                                    value === realState.location.district &&
                                    ' ,' + name
                                )
                            )}
                          </span>
                        ) : (
                          ''
                        )}
                      </div>
                    </div>
                  </div>
                </Col>
              ))}
            </>
          ) : (
            <ErrorMessage>
              لا يوجد عقارات{' '}
              <Link
                to='/real-state'
                onClick={() => {
                  setQuery(`?search=`);
                }}
              >
                الرجوع لصفحة العقارات السابقة
              </Link>
            </ErrorMessage>
          )}

          {isSuccess && data.realStates.length > 0 && (
            <div className='pagination-container'>
              <Pagination>
                <Pagination.First onClick={() => setQuery(`?page=${1}`)} />
                <Pagination.Prev
                  onClick={() => {
                    if (page > 1) {
                      setPage(page - 1);
                      setQuery(`?page=${page}`);
                    } else {
                      setQuery(`?page=${1}`);
                    }
                  }}
                />
                {pages &&
                  pages.map((pageNumber, index) => (
                    <Pagination.Item
                      key={index}
                      onClick={() => {
                        setQuery(`?page=${+pageNumber}`);
                      }}
                      active={+pageNumber === +data.page}
                    >
                      {+pageNumber}
                    </Pagination.Item>
                  ))}
                <Pagination.Next
                  onClick={() => {
                    if (+page < +data.pagesCount) {
                      setPage(page + 1);
                      setQuery(`?page=${page}`);
                    } else {
                      setPage(data.pagesCount);
                      setQuery(`?page=${data.pagesCount}`);
                    }
                  }}
                />
                <Pagination.Last
                  onClick={() => setQuery(`?page=${data.pagesCount}`)}
                />
              </Pagination>
            </div>
          )}
        </Row>
      )}
    </section>
  );
};

export default RealStates;
