import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ContactForm from '../../helpers/ContactForm';
import AllRealStateDetails from '../../helpers/AllRealStateDetails';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBath,
  faBed,
  faVectorSquare,
} from '@fortawesome/free-solid-svg-icons';
import GoogleMaps from '../../helpers/GoogleMaps';
import { useParams } from 'react-router';
import { useGetRealStateByIdQuery } from '../../../../store/apis/RealState';
import MySpinner from '../../../../utils/MySpinner';
import unknownImage from '../../../../images/unknown.png';
import Affordability from './Affordability';
import RatingStars from '../../../../components/RatingStars';
import { Link } from 'react-router-dom';
import PageTitle from '../../../../utils/PageTitle';
import { useSelector } from 'react-redux';
import ServerErrorMessage from '../../../../error/ServerErrorMessage';
import { toast } from 'react-toastify';
import { useEffect } from 'react';

const RealStateInfo = () => {
  const { user } = useSelector((state) => state.auth);
  const { id } = useParams();
  const { data, isLoading, error, isError, refetch } =
    useGetRealStateByIdQuery(id);

  useEffect(() => {
    refetch();
    if (isError) return toast.error(ServerErrorMessage(error));
  }, [error, isError, refetch]);

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'SAR',
    maximumFractionDigits: 2,
  }).format;
  return (
    <section className='real-state-info'>
      {isLoading ? (
        <MySpinner />
      ) : data ? (
        <>
          {data && data.realState && (
            <PageTitle title={`مسكن | ${data.realState.general.title} `} />
          )}
          <Row>
            {user?.user._id === data.realState.owner._id ? (
              <Col xs={12}>
                <Row className='mini-info'>
                  <Col xs={12} lg={4} className='general-sec'>
                    <div className='text-center'>
                      <FontAwesomeIcon icon={faBed} className='px-2 fs-3' />
                    </div>
                    <h4 className='text-center'>
                      <b>{data.realState.features.bedroom}</b>
                    </h4>
                  </Col>
                  <Col xs={12} lg={4} className='general-sec'>
                    <div className='text-center'>
                      <FontAwesomeIcon icon={faBath} className='px-2 fs-3' />
                    </div>
                    <h4 className='text-center'>
                      <b> {data.realState.features.bathroom}</b>
                    </h4>
                  </Col>
                  <Col xs={12} lg={4} className='general-sec'>
                    <div className='text-center'>
                      <FontAwesomeIcon
                        icon={faVectorSquare}
                        className='px-2 fs-3'
                      />
                    </div>
                    <h4 className='text-center'>
                      <b>
                        {data.realState.dimensions.height *
                          data.realState.dimensions.width}
                        م2
                      </b>
                    </h4>
                  </Col>
                </Row>
                <div className='heads-info'>
                  <div className='title'>{data.realState.general.title}</div>

                  <div className='price'>
                    {currencyFormatter(data.realState.price)}
                  </div>
                </div>
                <hr />
                <div className='description'>
                  {data.realState.general.description}
                </div>
                {/* <hr />
                <div className='google-map real-state-info-title'>
                  موقــع العقــار على الخـريطــة
                </div>
                <GoogleMaps
                  center={{
                    lat: data.realState.coordinates.latitude,
                    lng: data.realState.coordinates.longitude,
                  }}
                /> */}
                <hr />
                <div className='real-state-info-title'>تفاصيـــل العقــار</div>
                <AllRealStateDetails />
              </Col>
            ) : (
              <Row>
                <Col xs={12} md={9}>
                  <Row className='mini-info'>
                    <Col xs={12} lg={4} className='general-sec'>
                      <div className='text-center'>
                        <FontAwesomeIcon icon={faBed} className='px-2 fs-1' />
                      </div>
                      <h1 className='text-center'>
                        <b>{data.realState.features.bedroom}</b>
                      </h1>
                    </Col>
                    <Col xs={12} lg={4} className='general-sec'>
                      <div className='text-center'>
                        <FontAwesomeIcon icon={faBath} className='px-2 fs-1' />
                      </div>
                      <h1 className='text-center'>
                        <b> {data.realState.features.bathroom}</b>
                      </h1>
                    </Col>
                    <Col xs={12} lg={4} className='general-sec'>
                      <div className='text-center'>
                        <FontAwesomeIcon
                          icon={faVectorSquare}
                          className='px-2 fs-1'
                        />
                      </div>
                      <h1 className='text-center'>
                        <b>
                          {data.realState.dimensions.height *
                            data.realState.dimensions.width}
                          م2
                        </b>
                      </h1>
                    </Col>
                  </Row>
                  <div className='heads-info'>
                    <div className='title'>{data.realState.general.title}</div>

                    <div className='price'>
                      {currencyFormatter(data.realState.price)}
                    </div>
                  </div>
                  <hr />
                  <div className='description'>
                    {data.realState.general.description}
                  </div>
                  {/* <hr />
                  <div className='google-map real-state-info-title'>
                    موقــع العقــار على الخـريطــة
                  </div>
                  <GoogleMaps
                    center={{
                      lat: data.realState.coordinates.latitude,
                      lng: data.realState.coordinates.longitude,
                    }}
                  /> */}
                  <hr />
                  <div className='real-state-info-title'>
                    تفاصيـــل العقــار
                  </div>
                  <AllRealStateDetails />
                </Col>
                <Col xs={12} md={3}>
                  <ContactForm
                    realStateId={data.realState._id}
                    userId={data.realState.owner}
                  />
                </Col>
              </Row>
            )}
          </Row>
          <div className='analytics-title'>القدرة على تحمل التكاليف</div>
          <div className='border-bottom border-1 border-secondary p-1'>
            <b> احسب أقساط الرهن العقاري الشهرية</b>
            <p className='mt-1'>
              الدفعة المقدرة: <b>4981</b> ر.س في الشهر
            </p>
          </div>

          <Affordability realStatePrice={data.realState.price} />

          {user?.user._id !== data.realState.owner._id && (
            <>
              <hr />
              <div className='analytics-title'>معلومات المالك / المعلن</div>
              {user?.user.name ? (
                <Link
                  className='owner-info'
                  to={`/user/${data.realState.owner._id}`}
                >
                  <div className='avatar'>
                    <img
                      src={
                        data.realState.owner.avatar &&
                        data.realState.owner.avatar.startsWith('data:image')
                          ? data.realState.owner.avatar
                          : unknownImage
                      }
                      alt='avatar'
                    />
                  </div>
                  <p>
                    <span className='text-primary'>الإســم : </span>
                    {data.realState.owner.name || 'غير معروف'}
                  </p>
                  <p>
                    <span className='text-primary'>رقم الهاتف : </span>
                    {data.realState.owner?.location?.phone || 'لا يوجد'}
                  </p>
                  <p>
                    <span className='text-primary'>التقييم : </span>
                    <RatingStars rating={data.realState.owner.rating} />
                  </p>
                </Link>
              ) : (
                <div className='owner-info'>
                  <div className='avatar'>
                    <img
                      src={
                        data.realState.owner.avatar &&
                        data.realState.owner.avatar.startsWith('data:image')
                          ? data.realState.owner.avatar
                          : unknownImage
                      }
                      alt='avatar'
                    />
                  </div>
                  <p>
                    <span className='text-primary'>الإســم : </span>
                    {data.realState.owner.name || 'غير معروف'}
                  </p>
                  <p>
                    <span className='text-primary'>التقييم : </span>
                    <RatingStars rating={data.realState.owner.rating} />
                  </p>
                </div>
              )}
            </>
          )}
        </>
      ) : (
        'No Data Found'
      )}
    </section>
  );
};

export default RealStateInfo;
