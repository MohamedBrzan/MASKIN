import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Link } from 'react-router-dom';
import unknownImage from '../../../images/unknown.png';
import './RealStateFeatures.css';
import Countries from '../../../pages/RealState/helpers/Countries';

const RealStateFeatures = ({ realStateFeaturesData, handleCreateView }) => {
  return (
    <section className='real-state-features'>
      <Container>
        {realStateFeaturesData.realStates.length > 0 && (
          <Link to='/real-state' className='go-to-real-state-page-btn mb-3'>
            <div className='title'>
              <h1>
                مسكن <br /> معك لتجد عقارك وأنت في مسكنك
              </h1>
            </div>
          </Link>
        )}

        <Row className='m-auto'>
          {realStateFeaturesData.realStates.map((realState, index) => (
            <Col xs={12} md={4} lg={3} className='my-3 col-item' key={index}>
              <div className='real-state-card'>
                <Link
                  to={`/real-state?city=${realState.location.city}`}
                  onClick={() => handleCreateView(realState._id)}
                >
                  <div className='card-img'>
                    <img
                      src={
                        realState.propertyStatus !== 'available'
                          ? unknownImage
                          : realState.general.images[0].startsWith(
                              'data:image'
                            ) || realState.general.images[0].startsWith('https')
                          ? realState.general.images[0]
                          : unknownImage
                      }
                      alt='real-state-img'
                    />
                  </div>
                </Link>

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

                <div className='country'>
                  {Countries?.map(
                    ({ value, name }, i) =>
                      value === realState.location.city && name
                  )}
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default RealStateFeatures;
