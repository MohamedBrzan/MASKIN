import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useGetMyProfileQuery } from '../../store/apis/User/Profile';
import RatingStars from '../../components/RatingStars';
import PageTitle from '../../utils/PageTitle';
import ProfileOffcanvas from './helpers/ProfileOffcanvas';
import MySocialMediaLinks from './helpers/MySocialMediaLinks';
import LoadingPage from '../../utils/LoadingPage';
import ServerErrorMessage from '../../error/ServerErrorMessage';
import './Profile.css';
import { useEffect } from 'react';

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, error, isError, data } = useGetMyProfileQuery(user._id);

  useEffect(() => {
    if (isError) return toast.error(ServerErrorMessage(error));
  }, [error, isError]);

  return (
    <section className='profile'>
      <ProfileOffcanvas />
      <Container fluid>
        {isLoading ? (
          <LoadingPage />
        ) : (
          data &&
          data.user &&
          data.user.name && (
            <>
              <PageTitle
                title={`الرئيسية | ${data?.user?.name || 'غير معروف'} `}
              />
              <Row>
                <Col xs={12} md={8} className='info-col'>
                  <div className='info'>
                    <div className='title'>الإســـم :</div>
                    <div className='title-value'>{data.user.name}</div>
                  </div>
                  <div className='info'>
                    <div className='title'>الإيميل :</div>
                    <div className='title-value'>{data.user.email}</div>
                  </div>
                  <div className='info'>
                    <div className='title'>التقييم : </div>
                    <div className='title-value'>
                      <RatingStars rating={data.user.rating} />
                    </div>
                  </div>
                  <div className='info'>
                    <div className='title'>رقم الهاتف :</div>
                    <div className='title-value'>
                      {data.user.location?.phone || 'غير معروف'}
                    </div>
                  </div>
                  <div className='info'>
                    <div className='title'>الدولة :</div>
                    <div className='title-value'>
                      {data.user.location?.state || 'غير معروف'}
                    </div>
                  </div>
                  <div className='info'>
                    <div className='title'>المحافظة :</div>
                    <div className='title-value'>
                      {data.user.location?.country || 'غير معروف'}
                    </div>
                  </div>
                  <div className='info'>
                    <div className='title'>المدينة :</div>
                    <div className='title-value'>
                      {data.user.location?.city || 'غير معروف'}
                    </div>
                  </div>
                  <div className='info'>
                    <div className='title'>الشارع :</div>
                    <div className='title-value'>
                      {data.user.location?.address || 'غير معروف'}
                    </div>
                  </div>
                  <div className='info'>
                    <div className='title'>رقم العمارة / الشقة :</div>
                    <div className='title-value'>
                      {data.user.location?.blockNo || 'غير معروف'}
                    </div>
                  </div>
                </Col>
                <Col xs={12} md={4} className='avatar-col'>
                  <div className='avatar'>
                    <img src={data.user.avatar} alt='' />
                  </div>
                </Col>
              </Row>
              <MySocialMediaLinks />
            </>
          )
        )}
      </Container>
    </section>
  );
};

export default Profile;
