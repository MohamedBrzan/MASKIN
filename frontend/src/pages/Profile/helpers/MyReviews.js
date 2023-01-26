import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileOffcanvas from './ProfileOffcanvas';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import { formatDistance } from 'date-fns';
import { ar } from 'date-fns/locale';
import { useGetMyReviewsQuery } from '../../../store/apis/User/MyReviews';
import unknownImage from '../../../images/unknown.png';
import PageTitle from '../../../utils/PageTitle';
import LoadingPage from '../../../utils/LoadingPage';
import ServerErrorMessage from '../../../error/ServerErrorMessage';
import '../Profile.css';
import { useEffect } from 'react';
import ErrorMessage from '../../../error/ErrorMessage';

const MyReviews = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, error, isError, data, refetch } = useGetMyReviewsQuery();

  const dataFormatter = (dateValue) =>
    formatDistance(
      new Date(dateValue),
      new Date(Date.now()),
      { locale: ar } // Pass the locale as an option
    );

  useEffect(() => {
    if (isError) return toast.error(ServerErrorMessage(error));
  }, [error, isError]);

  return (
    <>
      <PageTitle
        title={`تقيماتى | ${
          user && user.name
            ? user.name
            : user && user.user && user.user.name
            ? user.user.name
            : ''
        } `}
      />
      <ProfileOffcanvas />
      <div className='profile-message'>
        <Container fluid>
          <Row>
            {isLoading ? (
              <LoadingPage />
            ) : data.reviews.length > 0 ? (
              <>
                {data.reviews.map((review, index) => (
                  <Col
                    className='position-relative message-col'
                    key={index}
                    xs={12}
                    md={5}
                  >
                    <Col xs={12}>
                      <div className='text-end date-display'>
                        <span className='p-1'>
                          {' '}
                          منذ {dataFormatter(review.createdAt)}
                        </span>
                        <span>
                          <FontAwesomeIcon icon={faBell} />
                        </span>
                      </div>
                      <div className='avatar'>
                        <img
                          src={review.user.avatar || unknownImage}
                          alt='User Avatar'
                        />
                      </div>
                    </Col>

                    <div className='text'>
                      <p>
                        <span className='text-primary'>
                          <b>الإسم :</b>
                        </span>

                        {review.user.name}
                      </p>
                      <p>
                        <span className='text-primary'>
                          <b>الإيميل :</b>
                        </span>
                        {review.user.email}
                      </p>
                      <p>
                        <span className='text-primary'>
                          <b> التعليق :</b>
                        </span>
                        {review.review}
                      </p>
                    </div>
                  </Col>
                ))}
              </>
            ) : (
              <ErrorMessage>لا يوجد تقييمات حتى الأن</ErrorMessage>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MyReviews;
