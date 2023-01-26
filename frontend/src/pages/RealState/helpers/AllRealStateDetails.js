import React, { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams } from 'react-router-dom';
import { useGetRealStateByIdQuery } from '../../../store/apis/RealState';
import MySpinner from '../../../utils/MySpinner';
import { toast } from 'react-toastify';
import ServerErrorMessage from '../../../error/ServerErrorMessage';
import Countries from '../helpers/Countries';
import RiyadhAreas from '../helpers/RiyadhAreas';
import JeddahAreas from '../helpers/JeddahAreas';
import MeccaAreas from '../helpers/MeccaAreas';
import '../RealStateDetails/RealStateDetails.css';

const AllRealStateDetails = () => {
  const { id } = useParams();
  const { data, isLoading, error, isError } = useGetRealStateByIdQuery(id);

  useEffect(() => {
    const toggleShowDiv = document.querySelectorAll('.details.toggle-show');
    toggleShowDiv.forEach((div) => {
      div.classList.add('hide');
    });
    const btn = document.getElementById('toggle-show-btn');

    btn.onclick = () => {
      toggleShowDiv.forEach((div) => {
        if (div.classList.contains('hide')) {
          div.classList.remove('hide');
          btn.textContent = 'إخفاء التفاصيل';
        } else {
          div.classList.add('hide');
          btn.textContent = 'عرض المزيد ...';
        }
      });
    };
    if (isError) return toast.error(ServerErrorMessage(error));
  }, [error, isError]);

  return (
    <section className='all-real-state-details'>
      {isLoading ? (
        <MySpinner />
      ) : (
        <>
          <div className='all-details' id='allInfo'>
            {/*  Section 1 */}
            <div className='details'>
              <div className='title'>التفاصيل العامة </div>
              <Row className='description'>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>سنة البناء </span> :{' '}
                      {data.realState.general.yearBuilt || ' لا يـوجـد'}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'> نوع المنشأة </span> :
                      {data.realState.general.propertyType === 'house'
                        ? ' منزل'
                        : data.realState.general.propertyType === 'room'
                        ? ' غرفة'
                        : data.realState.general.propertyType === 'apartment'
                        ? ' شقة'
                        : data.realState.general.propertyType === 'townhouse'
                        ? ' تاون هاوس'
                        : data.realState.general.propertyType === 'villa'
                        ? ' فيلا'
                        : data.realState.general.propertyType === 'land'
                        ? ' أرض خالية'
                        : data.realState.general.propertyType === 'office'
                        ? ' مكتب'
                        : data.realState.general.propertyType === 'warehouse'
                        ? ' مستودع'
                        : data.realState.general.propertyType === 'farm'
                        ? ' مزرعة'
                        : data.realState.general.propertyType === 'other'
                        ? ' أخرى'
                        : ' لا يـوجـد'}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>الغرض من العرض</span> :{' '}
                      {data.realState.general.propertyPurpose === 'personal'
                        ? ' شخصى'
                        : data.realState.general.propertyPurpose === 'سكنى'
                        ? ' غرفة'
                        : data.realState.general.propertyPurpose ===
                          'industrial'
                        ? ' صناعى'
                        : data.realState.general.propertyPurpose ===
                          'commercial'
                        ? '  تجارى'
                        : data.realState.general.propertyPurpose === 'other'
                        ? ' أخرى'
                        : ' لا يـوجـد'}
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>

            {/* Section 2 */}

            <div className='details'>
              <div className='title'>الأبعــــاد ( بالمتر المربع ) م2</div>
              <Row className='description'>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>الطول</span> :{' '}
                      {data.realState.dimensions.height}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>العرض</span> :{' '}
                      {data.realState.dimensions.width}
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>

            {/* Section 3 */}

            <div className='details toggle-show'>
              <div className='title'>الموقع</div>
              <Row className='description'>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>المدينة </span> :{' '}
                      {Countries.map(
                        ({ value, name }, i) =>
                          value === data.realState.location.city && name
                      )}
                    </li>
                  </ul>
                </Col>

                {data.realState.location.city.match(/riyadh/gi) ? (
                  <>
                    <Col xs={12} md={6}>
                      <ul className='px-3'>
                        <li>
                          <span className='info'>المنطقة </span> :{' '}
                          {RiyadhAreas.map(
                            ({ value, name }, i) =>
                              value === data.realState.location.area && name
                          )}
                        </li>
                      </ul>
                    </Col>{' '}
                    <Col xs={12} md={6}>
                      <ul className='px-3'>
                        <li>
                          <span className='info'>الحى </span> :
                          {RiyadhAreas.map(
                            ({ value, name, data: dataField }, i) =>
                              value === data.realState.location.area &&
                              dataField.map(
                                ({ name, value }, i) =>
                                  value === data.realState.location.district &&
                                  name
                              )
                          )}
                        </li>
                      </ul>
                    </Col>
                  </>
                ) : data.realState.location.city.match(/jeddah/gi) ? (
                  <>
                    <Col xs={12} md={6}>
                      <ul className='px-3'>
                        <li>
                          <span className='info'>المنطقة </span> :{' '}
                          {JeddahAreas.map(
                            ({ value, name }, i) =>
                              value === data.realState.location.area && name
                          )}
                        </li>
                      </ul>
                    </Col>{' '}
                    <Col xs={12} md={6}>
                      <ul className='px-3'>
                        <li>
                          <span className='info'>الحى </span> :
                          {JeddahAreas.map(
                            ({ value, name, data: dataField }, i) =>
                              value === data.realState.location.area &&
                              dataField.map(
                                ({ name, value }, i) =>
                                  value === data.realState.location.district &&
                                  name
                              )
                          )}
                        </li>
                      </ul>
                    </Col>
                  </>
                ) : data.realState.location.city.match(/mecca/gi) ? (
                  <Col xs={12} md={6}>
                    <ul className='px-3'>
                      <li>
                        <span className='info'>الحى </span> :
                        {MeccaAreas.map(({ value, name, data: dataField }, i) =>
                          dataField.map(
                            ({ name, value }, i) =>
                              value === data.realState.location.district && name
                          )
                        )}
                      </li>
                    </ul>
                  </Col>
                ) : (
                  ''
                )}

                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>العنوان </span> :{' '}
                      {data.realState.location.address}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>رقم المنشأة </span> :{' '}
                      {data.realState.location.blockNo}
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>

            {/* Section 4 */}

            <div className='details toggle-show'>
              <div className='title'>التفاصيل الداخلية</div>
              <Row className='description'>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>غرف النوم</span> :{' '}
                      {data.realState.features.bedroom}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>دورات المياه</span> :{' '}
                      {data.realState.features.bathroom}
                    </li>
                  </ul>
                </Col>{' '}
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>المطابخ</span> :{' '}
                      {data.realState.features.kitchen}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>الشرفات</span> :{' '}
                      {data.realState.features.balcony}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>الجراج</span> :{' '}
                      {data.realState.features.garage}
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>

            {/* Section 5 */}

            <div className='details toggle-show'>
              <div className='title'>وســـــائل الـــراحة</div>
              <Row className='description'>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>حمام سباحة</span> :{' '}
                      {data.realState.amenities.pool ? (
                        <span className='text-success'>نعم</span>
                      ) : (
                        <span className='text-danger'>لا</span>
                      )}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>مصعد كهربائى</span> :{' '}
                      {data.realState.amenities.elevator ? (
                        <span className='text-success'>نعم</span>
                      ) : (
                        <span className='text-danger'>لا</span>
                      )}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>مكيف هوائى </span> :{' '}
                      {data.realState.amenities.airConditioner ? (
                        <span className='text-success'>نعم</span>
                      ) : (
                        <span className='text-danger'>لا</span>
                      )}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>موقف سيارات </span> :{' '}
                      {data.realState.amenities.parking ? (
                        <span className='text-success'>نعم</span>
                      ) : (
                        <span className='text-danger'>لا</span>
                      )}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>إنترنت</span> :{' '}
                      {data.realState.amenities.internet ? (
                        <span className='text-success'>نعم</span>
                      ) : (
                        <span className='text-danger'>لا</span>
                      )}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>أمن وحراسة</span> :{' '}
                      {data.realState.amenities.security ? (
                        <span className='text-success'>نعم</span>
                      ) : (
                        <span className='text-danger'>لا</span>
                      )}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>تدفأة</span> :{' '}
                      {data.realState.amenities.fireplace ? (
                        <span className='text-success'>نعم</span>
                      ) : (
                        <span className='text-danger'>لا</span>
                      )}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>حديقة</span> :{' '}
                      {data.realState.amenities.garden ? (
                        <span className='text-success'>نعم</span>
                      ) : (
                        <span className='text-danger'>لا</span>
                      )}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>حمام ضيوف</span> :{' '}
                      {data.realState.amenities.guestWC ? (
                        <span className='text-success'>نعم</span>
                      ) : (
                        <span className='text-danger'>لا</span>
                      )}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>مخزن</span> :{' '}
                      {data.realState.amenities.storeRoom ? (
                        <span className='text-success'>نعم</span>
                      ) : (
                        <span className='text-danger'>لا</span>
                      )}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>إمتلاك حيوانات أليفة</span> :{' '}
                      {data.realState.amenities.pets ? (
                        <span className='text-success'>نعم</span>
                      ) : (
                        <span className='text-danger'>لا</span>
                      )}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>صالة ألعاب رياضية</span> :{' '}
                      {data.realState.amenities.gym ? (
                        <span className='text-success'>نعم</span>
                      ) : (
                        <span className='text-danger'>لا</span>
                      )}
                    </li>
                  </ul>
                </Col>
                <Col xs={12} md={6}>
                  <ul className='px-3'>
                    <li>
                      <span className='info'>غرفة لغسيل الملابس</span> :{' '}
                      {data.realState.amenities.laundry ? (
                        <span className='text-success'>نعم</span>
                      ) : (
                        <span className='text-danger'>لا</span>
                      )}
                    </li>
                  </ul>
                </Col>
              </Row>
            </div>
          </div>
          <a href='#*' className='see-more-btn' id='toggle-show-btn'>
            عرض المزيد ...
          </a>
        </>
      )}
    </section>
  );
};

export default AllRealStateDetails;
