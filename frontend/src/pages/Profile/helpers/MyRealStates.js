import { useEffect, useState } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Pagination from 'react-bootstrap/Pagination';
import { Link } from 'react-router-dom';
import ProfileOffcanvas from './ProfileOffcanvas';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faTrash,
  faHandPointDown,
} from '@fortawesome/free-solid-svg-icons';
import { formatDistance } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useDeleteRealStateMutation } from '../../../store/apis/RealState';
import { useCreateViewMutation } from '../../../store/apis/User/Profile';
import PageTitle from '../../../utils/PageTitle';
import FilterSec from '../../RealState/helpers/FilterSec';
import unknownImage from '../../../images/unknown.png';
import { useSelector } from 'react-redux';
import LoadingPage from '../../../utils/LoadingPage';
import { useGetMyRealStatesQuery } from '../../../store/apis/User/MyRealStates';
import ServerErrorMessage from '../../../error/ServerErrorMessage';
import ErrorMessage from '../../../error/ErrorMessage';
import '../../RealState/RealState.css';

const MyRealStates = () => {
  const { user } = useSelector((state) => state.auth);
  const [deleteRealState] = useDeleteRealStateMutation();
  const [query, setQuery] = useState('');
  const [sorting, setSorting] = useState('');
  let [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [price, setPrice] = useState({
    low: 0,
    high: 0,
  });

  let { low, high } = price;

  const [features, setFeatures] = useState('');
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

  let { isLoading, error, data, isSuccess, isError, isFetching, refetch } =
    useGetMyRealStatesQuery(`${query}`);

  if (!isLoading && data) {
    for (let i = 1; i <= data.pagesCount; i++) {
      pages.push(i);
    }
  }

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('???? ???????? ?????? ??????????????');

    if (confirmDelete) {
      await deleteRealState(id);
      refetch();
    }
  };

  useEffect(() => {
    if (sorting) {
      setQuery(`?sorting=${sorting}`);
    }
    if (isError) return toast.error(ServerErrorMessage(error));
    refetch();
  }, [
    data,
    error,
    features,
    isError,
    isSuccess,
    page,
    refetch,
    search,
    sorting,
  ]);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <PageTitle
        title={`???????????? | ${
          user && user.name
            ? user.name
            : user && user.user && user.user.name
            ? user.user.name
            : ''
        } `}
      />
      <ProfileOffcanvas />
      <div className='real-state-home-img'>
        {/* <img src={homeImage} alt='Home.' />
        <div className='modal'></div> */}
      </div>
      <section className='real-state my-real-states'>
        <Link
          to='/me/real-states/create'
          className='create-btn'
          title='?????????? ?????????? ??????????'
        >
          <i className='fa-solid fa-plus'></i>
        </Link>{' '}
        <h4 className='search-title mt-3'>
          ???????? <FontAwesomeIcon icon={faHandPointDown} />{' '}
        </h4>
        <Form>
          <FormControl
            name='search'
            type='search'
            placeholder='???????? ???? ????????????'
            className={
              isSuccess && data.length > 0
                ? 'search-input'
                : 'search-input mb-3'
            }
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onBlur={() => setQuery(`?search=${search}`)}
          />
        </Form>
        {isSuccess && data.realStates.length > 0 ? (
          <Row>
            <Col xs={12} md={4} lg={2}>
              <div className='filter-section'>
                <FilterSec
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
                  onChangePrice={onChangePrice}
                  propertyType={propertyType}
                  setPropertyType={setPropertyType}
                  placement={placement}
                  setPlacement={setPlacement}
                  urgent={urgent}
                  setUrgent={setUrgent}
                  query={query}
                  setQuery={setQuery}
                />
              </div>
            </Col>

            <Col xs={12} md={8} lg={10}>
              <Row>
                <Row className='align-items-center'>
                  <Col className='text-end mt-3'>
                    <select
                      value={sorting}
                      onChange={(e) => {
                        setSorting(e.target.value);
                        setQuery('?sorting=' + e.target.value);
                      }}
                    >
                      <option value='new'>????????????</option>
                      <option value='old'>????????????</option>
                      <option value='high-price'> ?????????? ( ???????????? )</option>
                      <option value='low-price'> ?????????? ( ?????????? )</option>
                      <option value='high-space'>?????????????? ( ???????????? )</option>
                      <option value='low-space'>?????????????? ( ???????????? )</option>
                    </select>
                  </Col>
                </Row>
                {data.realStates.map((realState, index) => (
                  <Col
                    xs={12}
                    md={6}
                    lg={4}
                    className='my-3 col-item'
                    key={index}
                  >
                    <div className='real-state-card'>
                      <Link
                        to={`/real-state/${realState._id}`}
                        onClick={() => createViewHandler(realState._id)}
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

                      <div className='info-container'>
                        <Link
                          to={`/real-state/${realState._id}`}
                          onClick={() => createViewHandler(realState._id)}
                        >
                          <p>
                            ?????????????? : {''}
                            {realState.space}
                            ??2
                          </p>
                          <p>?????????? : {formatter(realState.price)}</p>
                          <p>???????????? : {realState.location.state}</p>
                          <p>?????? ?????????????????? : {realState.views.length}</p>
                          <p>
                            ?????????? : ?????? {dataFormatter(realState.createdAt)}
                          </p>
                        </Link>
                        <div className='action-btn'>
                          <Link
                            to={`/me/real-states/${realState._id}/update`}
                            className='edit'
                          >
                            <FontAwesomeIcon icon={faEdit} size='3x' />
                          </Link>
                          <Link
                            to='/me/real-states'
                            className='delete'
                            onClick={() => handleDelete(realState._id)}
                          >
                            <FontAwesomeIcon icon={faTrash} size='3x' />
                          </Link>
                        </div>
                      </div>
                      {new Date(realState.createdAt).getMonth() + 1 >
                        new Date().getMonth() &&
                        !realState.propertyStatus === 'rented' &&
                        !realState.propertyStatus === 'sold' && (
                          <p className='new'>????????????</p>
                        )}
                      {realState.placement === 'sale' &&
                        realState.propertyStatus === 'available' && (
                          <div className='sale'>??????</div>
                        )}
                      {realState.placement === 'rent' &&
                        realState.propertyStatus === 'available' && (
                          <div className='rent'>??????????</div>
                        )}
                      {realState.placement === 'rent' &&
                        realState.propertyStatus === 'rented' && (
                          <div className='rented'>???? ??????????????</div>
                        )}
                      {realState.placement === 'sale' &&
                        realState.propertyStatus === 'sold' && (
                          <div className='sold'>???? ??????????</div>
                        )}

                      {realState.propertyStatus === 'available' &&
                        realState.urgent === true && (
                          <div className='urgent'>????????</div>
                        )}
                    </div>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        ) : (
          <ErrorMessage>
            ???? ???????? ????????????{' '}
            <Link to='/me/real-states/create'>?????????? ???????? ????????</Link>
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
                    {pageNumber}
                  </Pagination.Item>
                ))}
              <Pagination.Next
                onClick={() => {
                  if (page < data.pagesCount) {
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
      </section>
    </>
  );
};

export default MyRealStates;
