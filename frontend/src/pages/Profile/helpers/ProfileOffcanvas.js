import React, { useEffect, useState } from 'react';
import Badge from 'react-bootstrap/Badge';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBlog,
  faDoorOpen,
  faHome,
  faMessage,
  faGear,
  faHeart,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { useGetMyMessagesQuery } from '../../../store/apis/User/MyMessages';
import LoadingPage from '../../../utils/LoadingPage';
import ServerErrorMessage from '../../../error/ServerErrorMessage';

const ProfileOffcanvas = () => {
  const [show, setShow] = useState(false);
  const [dataLength, setDataLength] = useState(0);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { isLoading, error, isError, data, refetch } = useGetMyMessagesQuery();

  useEffect(() => {
    if (data) {
      const filteredData = data.messages.filter(
        (message) => message.isRead === false
      );
      if (isError) return toast.error(ServerErrorMessage(error));
      setDataLength(filteredData.length);
    }
  }, [data, error, isError]);

  if (isLoading) return <LoadingPage />;

  return (
    <>
      <div className='buttons'>
        <Button className='offcanvas-control-btn' onClick={handleShow}>
          لوحة التحكم
        </Button>
        <Link to='/ad/create' className='btn add-ad-btn'>
          إضــافة إعلان
        </Link>
      </div>

      <Offcanvas show={show} onHide={handleClose} placement='start'>
        <Offcanvas.Header>
          <Offcanvas.Title></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul className='list-unstyled'>
            <Link to='/me'>
              <li>
                <div className='icon'>
                  <FontAwesomeIcon icon={faHome} />
                </div>
                <div className='text'>الرئيـسيـة</div>
              </li>
            </Link>
            <Link to='/me/messages'>
              <li className='message-icon'>
                <div className='icon'>
                  <FontAwesomeIcon icon={faMessage} />
                </div>
                {dataLength > 0 && (
                  <Badge className='bg-danger data-length'>{dataLength}</Badge>
                )}

                <div className='text'>الرسـائـل</div>
              </li>
            </Link>
            <Link to='/me/real-states'>
              <li>
                <div className='icon'>
                  <FontAwesomeIcon icon={faDoorOpen} />
                </div>
                <div className='text'>المنشـــأت</div>
              </li>
            </Link>
            <Link to='/me/blogs'>
              <li>
                <div className='icon'>
                  <FontAwesomeIcon icon={faBlog} />
                </div>
                <div className='text'>المـدونات</div>
              </li>
            </Link>
            <Link to='/me/real-states/favorite'>
              <li>
                <div className='icon'>
                  <FontAwesomeIcon icon={faHeart} />
                </div>
                <div className='text'>المفضلات</div>
              </li>
            </Link>
            <Link to='/me/real-states/reviews'>
              <li>
                <div className='icon'>
                  <FontAwesomeIcon icon={faStar} />
                </div>
                <div className='text'>التقييمات</div>
              </li>
            </Link>

            <Link to='/me/settings'>
              <li>
                <div className='icon'>
                  <FontAwesomeIcon icon={faGear} />
                </div>
                <div className='text'>الإعـــدادات</div>
              </li>
            </Link>
          </ul>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default ProfileOffcanvas;
