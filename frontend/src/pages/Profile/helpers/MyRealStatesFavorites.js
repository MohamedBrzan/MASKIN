import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useGetMyRealStatesFavoritesQuery } from '../../../store/apis/User/Profile';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import unknownImage from '../../../images/unknown.png';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDistance } from 'date-fns';
import { ar } from 'date-fns/locale';
import axios from 'axios';
import { useEffect } from 'react';
import ProfileOffcanvas from '../helpers/ProfileOffcanvas';
import '../Profile.css';
import PageTitle from '../../../utils/PageTitle';
import { useSelector } from 'react-redux';
import LoadingPage from '../../../utils/LoadingPage';
import ServerErrorMessage from '../../../error/ServerErrorMessage';
import ErrorMessage from '../../../error/ErrorMessage';

const MyRealStatesFavorites = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, error, isError, data, refetch } =
    useGetMyRealStatesFavoritesQuery();

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

  const handleDelete = async (id) => {
    await axios({
      method: 'DELETE',
      url: `/api/v1/user/real-states/favorites`,
      data: { id },
    })
      .then(() => {
        refetch();
        toast.info('تمت عملية الحذف بنجاح');
      })
      .catch(() => toast.error('حدث خطأ ما'));
  };

  let pages = [];

  if (!isLoading && data) {
    for (let i = 1; i <= data.pagesCount; i++) {
      pages.push(i);
    }
  }

  useEffect(() => {
    if (isError) return toast.error(ServerErrorMessage(error));
    refetch();
  }, [error, isError, refetch]);

  return (
    <div className='favorites'>
      <PageTitle
        title={`مفضلتى | ${
          user && user.name
            ? user.name
            : user && user.user && user.user.name
            ? user.user.name
            : ''
        } `}
      />
      <ProfileOffcanvas />
      <h3 className='title'>
        <b>عقاراتى المفضلة</b>{' '}
      </h3>
      <Container fluid>
        <Row>
          <hr />
          {isLoading ? (
            <LoadingPage />
          ) : data && data.favorites.length > 0 ? (
            data.favorites.map((realState, index) => (
              <Col xs={12} md={6} lg={4} className='my-3 col-item' key={index}>
                <div className='real-state-card'>
                  <Link to={`/real-state/${realState._id}`}>
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
                    <Link to={`/real-state/${realState._id}`}>
                      <p>
                        المساحة : {''}
                        {realState.space}
                        م2
                      </p>
                      <p>السعر : {formatter(realState.price)}</p>
                      <p>الدولة : {realState.location.state}</p>
                      <p>عدد المشاهدات : {realState.views.length}</p>
                      <p>الوقت : منذ {dataFormatter(realState.createdAt)}</p>
                    </Link>
                    <div className='action-btn'>
                      <Link
                        to='/me/real-states/favorite'
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
              </Col>
            ))
          ) : (
            <ErrorMessage>
              لا يوجد مفضلات لديك حتى الأن{' '}
              <Link to='/real-state'>تصفح العقارات الأن</Link>
            </ErrorMessage>
          )}
        </Row>
      </Container>
    </div>
  );
};

export default MyRealStatesFavorites;
