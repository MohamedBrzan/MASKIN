import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormSelect from 'react-bootstrap/FormSelect';
import FormControl from 'react-bootstrap/FormControl';
import FormGroup from 'react-bootstrap/FormGroup';
import FormCheckLabel from 'react-bootstrap/FormCheckLabel';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';
import { formatDistance } from 'date-fns';
import { ar } from 'date-fns/locale';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router';
import { toast } from 'react-toastify';
import axios from 'axios';
import MySocialMediaLinks from '../Profile/helpers/MySocialMediaLinks';
import RatingStars from '../../components/RatingStars';
import { useGetGetUserByIdByIdQuery } from '../../store/apis/User/GetUserById';
import unknownImage from '../../images/unknown.png';
import PageTitle from '../../utils/PageTitle';
import ServerErrorMessage from '../../error/ServerErrorMessage';
import LoadingPage from '../../utils/LoadingPage';
import '../Profile/Profile.css';

const UserPage = () => {
  const { id } = useParams();
  const { isLoading, error, isError, data, refetch } =
    useGetGetUserByIdByIdQuery(id);
  const [review, setReview] = useState('');
  const [reviewNum, setReviewNum] = useState(1);

  const makeUserReview = async (e) => {
    e.preventDefault();
    await axios({
      method: 'POST',
      url: `/api/v1/user/reviews`,
      data: {
        userId: id,
        review,
        reviewNum,
      },
    })
      .then((res) => {
        toast.success(res.data.message);
        refetch();
      })
      .catch((err) => {
        toast.error(err.response.data.message || err.message);
        refetch();
      });
  };

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
    <section className='my-5 profile'>
      {data && data.user && <PageTitle title={`مسكن | ${data.user.name}`} />}
      <Container fluid>
        {' '}
        {isLoading ? (
          <LoadingPage />
        ) : (
          <>
            {' '}
            <Row>
              <Col xs={12} md={8} className='info-col'>
                <div className='info'>
                  {' '}
                  <div className='title'>الإســـم :</div>{' '}
                  <div className='title-value'>{data.user.name}</div>
                </div>
                <div className='info'>
                  {' '}
                  <FormGroup className='mb-3'>
                    <FormCheckLabel>نبذة مختصرة</FormCheckLabel>
                    <FormControl
                      as={'textarea'}
                      rows='3'
                      name='bio'
                      value={data.user.bio}
                      placeholder='نبذة مختصرة'
                    />
                  </FormGroup>
                </div>
                <div className='info'>
                  {' '}
                  <div className='title'>التقييم : </div>{' '}
                  <div className='title-value'>
                    <RatingStars rating={data.user.rating} /> ({' '}
                    {data.user.reviews.length} )
                  </div>
                </div>
                <div className='info'>
                  {' '}
                  <div className='title'>رقم الهاتف :</div>{' '}
                  <div className='title-value'>
                    {data.user.location?.phone || 'غير معروف'}
                  </div>
                </div>
                <div className='info'>
                  {' '}
                  <div className='title'>الدولة :</div>{' '}
                  <div className='title-value'>
                    {data.user.location?.state || 'غير معروف'}
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
            <hr />
            <Form onSubmit={makeUserReview}>
              <Row>
                {' '}
                <Col xs={12} md={6} lg={10}>
                  <FormGroup>
                    <Form.Label>أكتب رأيك</Form.Label>
                    <FormControl
                      as='textarea'
                      rows='5'
                      value={review}
                      onChange={(e) => setReview(e.target.value)}
                      placeholder='أكتب رأيك عن المستخدم'
                      required
                    />
                  </FormGroup>
                </Col>
                <Col xs={12} md={6} lg={2}>
                  <FormGroup>
                    <Form.Label>التقييم</Form.Label>
                    <br />
                    <FormSelect
                      required
                      value={reviewNum}
                      onChange={(e) => setReviewNum(e.target.value)}
                    >
                      <option value='1'>1</option>
                      <option value='1.5'>1.5</option>
                      <option value='2'>2</option>
                      <option value='2.5'>2.5</option>
                      <option value='3'>3</option>
                      <option value='3.5'>3.5</option>
                      <option value='4'>4</option>
                      <option value='4.5'>4.5</option>
                      <option value='5'>5</option>
                    </FormSelect>
                  </FormGroup>
                </Col>
              </Row>
              <Button type='submit' className='my-3 submit-btn'>
                أرسل التقييم
              </Button>
            </Form>
            <Row className='reviews m-0 p-0'>
              {data.user.reviews.length > 0 ? (
                data.user.reviews.map((review, index) => (
                  <Col xs={12} md={10} className='review my-2' key={index}>
                    <Row className='justify-content-center align-items-center'>
                      {' '}
                      <Col xs={12} md={6} lg={2}>
                        {' '}
                        <div className='avatar'>
                          <img
                            src={
                              (review.user.avatar &&
                                review.user.avatar.startsWith('data:image')) ||
                              review.user.avatar.startsWith('https')
                                ? review.user.avatar
                                : unknownImage
                            }
                            alt='Avatar.'
                          />
                        </div>
                      </Col>
                      <Col xs={12} md={6} lg={10} className='p-3'>
                        <div className='text-end text-muted'>
                          {' '}
                          منذ {dataFormatter(review.createdAt)}{' '}
                          <FontAwesomeIcon icon={faBell} />
                        </div>
                        <p>
                          <span className='text-primary'>الإسم</span> :{' '}
                          {review.user.name || 'غير معروف'}
                        </p>
                        <p>
                          <span className='text-primary'>الإيميل</span> :{' '}
                          {review.user.email || 'غير معروف'}
                        </p>
                        <p>
                          <span className='text-primary'>التقييم</span> :{' '}
                          {review.reviewNum ? (
                            <RatingStars rating={review.reviewNum} />
                          ) : (
                            <RatingStars rating={0} />
                          )}
                        </p>
                        <p>
                          <span className='text-primary'>التعليق</span> :{' '}
                          {review.review || 'غير معروف'}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                ))
              ) : (
                <p className='text-center text-muted fs-1'>لا يوجد تقييمات</p>
              )}
            </Row>
          </>
        )}
      </Container>
    </section>
  );
};

export default UserPage;
