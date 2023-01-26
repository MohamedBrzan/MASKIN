import React from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useGetMyProfileQuery } from '../../../store/apis/User/Profile';
import LoadingPage from '../../../utils/LoadingPage';
import ErrorMessage from '../../../error/ErrorMessage';

const MySocialMediaLinks = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, error, data } = useGetMyProfileQuery(user._id);
  return (
    <section className='my-social-media-links'>
      {isLoading ? (
        <LoadingPage />
      ) : error ? (
        <p>Error</p>
      ) : data.user ? (
        <Row className='justify-content-center align-items-center'>
          {data && data.user && data.user.links && data.user.links.facebook && (
            <Link to={`${data.user.links.facebook}`} target='_blank'>
              <Col className='social-media-links facebook position-relative'>
                <i className='fa-brands fa-facebook fs-1'></i>
              </Col>
            </Link>
          )}
          {data && data.user && data.user.links && data.user.links.twitter && (
            <Link to={`${data.user.links.twitter}`} target='_blank'>
              <Col className='social-media-links twitter position-relative'>
                <i className='fa-brands fa-twitter fs-1'></i>
              </Col>
            </Link>
          )}
          {data && data.user && data.user.links && data.user.links.instagram && (
            <Link to={`${data.user.links.instagram}`} target='_blank'>
              <Col className='social-media-links instagram position-relative'>
                <i className='fa-brands fa-instagram fs-1'></i>
              </Col>
            </Link>
          )}
          {data && data.user && data.user.links && data.user.links.youtube && (
            <Link to={`${data.user.links.youtube}`} target='_blank'>
              <Col className='social-media-links youtube position-relative'>
                <i className='fa-brands fa-youtube fs-1'></i>
              </Col>
            </Link>
          )}
          {data && data.user && data.user.links && data.user.links.linkedin && (
            <Link to={`${data.user.links.linkedin}`} target='_blank'>
              <Col className='social-media-links linkedin position-relative'>
                {' '}
                <i className='fa-brands fa-linkedin fs-1'></i>
              </Col>
            </Link>
          )}
          {data && data.user && data.user.links && data.user.links.snapchat && (
            <Link to={`${data.user.links.snapchat}`} target='_blank'>
              <Col className='social-media-links snapchat position-relative'>
                <i className='fa-brands fa-snapchat fs-1'></i>
              </Col>
            </Link>
          )}
        </Row>
      ) : (
        <ErrorMessage>المستخدم غير موجود</ErrorMessage>
      )}
    </section>
  );
};

export default MySocialMediaLinks;
