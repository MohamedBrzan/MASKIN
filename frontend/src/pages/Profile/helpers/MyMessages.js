import { useEffect } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileOffcanvas from './ProfileOffcanvas';
import { Link } from 'react-router-dom';
import { ar } from 'date-fns/locale';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faBookReader,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { formatDistance } from 'date-fns';
import {
  useDeleteMessageMutation,
  useGetMyMessagesQuery,
} from '../../../store/apis/User/MyMessages';
import unknown from '../../../images/avatar.png';
import PageTitle from '../../../utils/PageTitle';
import { useSelector } from 'react-redux';
import LoadingPage from '../../../utils/LoadingPage';
import ServerErrorMessage from '../../../error/ServerErrorMessage';
import '../Profile.css';
import ErrorMessage from '../../../error/ErrorMessage';

const MyMessages = () => {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, error, isError, data, refetch } = useGetMyMessagesQuery();

  const [deleteMessage, { isLoading: messageLoading, error: errorMessage }] =
    useDeleteMessageMutation();

  const deleteMessageHandler = async (id) => {
    const confirmDelete = window.confirm(
      'هل أنت متأكد أنك تريد أن تحذف هذه الرسالة?'
    );

    if (confirmDelete) {
      await deleteMessage(id);
      refetch();
      toast.error('تم حذف الرسالة بنجاح');
    }
  };

  const readMessageHandler = async (id) => {
    await axios({
      method: 'PUT',
      url: `/api/v1/user/messages`,
      data: {
        messageId: id,
      },
    });

    refetch();
  };

  const dataFormatter = (dateValue) =>
    formatDistance(
      new Date(dateValue),
      new Date(Date.now()),
      { locale: ar } // Pass the locale as an option
    );

  useEffect(() => {
    if (messageLoading) toast.info('جاري حذف الرسالة');

    if (errorMessage) toast.error(errorMessage.message);
    if (isError) return toast.error(ServerErrorMessage(error));
  }, [error, errorMessage, isError, messageLoading]);

  return (
    <>
      <PageTitle
        title={`رسائلى | ${
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
          {data && data.messages && (
            <Row>
              <Col xs={12} md={4}>
                عدد الرسائل ( {data && Number(data.messages.length)} )
              </Col>
              <Col xs={12} md={4}>
                لم تقرأ (
                {(data &&
                  data.messages.filter((message) => message.isRead === false)
                    .length) ||
                  0}
                )
              </Col>
              <Col xs={12} md={4}>
                تمت القرائة (
                {(data &&
                  data.messages.filter((message) => message.isRead === true)
                    .length) ||
                  0}
                )
              </Col>
            </Row>
          )}
          <hr />
          <Row>
            {isLoading ? (
              <LoadingPage />
            ) : data.messages.length > 0 ? (
              <>
                {data.messages.map((message, index) => (
                  <Col
                    className='position-relative message-col'
                    key={index}
                    xs={12}
                    md={5}
                  >
                    <Col xs={12}>
                      <div className='text-start date-display'>
                        <span>
                          <FontAwesomeIcon icon={faBell} />
                        </span>
                        <span> منذ {dataFormatter(message.createdAt)}</span>
                      </div>
                      <div className='avatar'>
                        <img
                          src={message.user.avatar || unknown}
                          alt='User Avatar'
                        />
                      </div>
                    </Col>

                    <div className='text'>
                      <p>
                        <span className='text-primary'>
                          <b>الإسم :</b>
                        </span>

                        {message.user.name}
                      </p>
                      <p>
                        <span className='text-primary'>
                          <b>الإيميل :</b>
                        </span>
                        {message.user.email}
                      </p>
                      <p>
                        <span className='text-primary'>
                          <b>لينك العقار :</b>
                        </span>
                        <Link
                          to={`/real-state/${message.realState}`}
                          className='real-state-link'
                        >
                          إذهب إلى العقار
                        </Link>
                      </p>
                      <p>
                        <span className='text-primary'>
                          <b> الرسالة :</b>
                        </span>
                        {message.message}
                      </p>
                    </div>

                    <div
                      className='action-btn delete'
                      onClick={() => deleteMessageHandler(message._id)}
                    >
                      <FontAwesomeIcon icon={faTrash} />
                    </div>
                    <div
                      className={
                        message.isRead === true
                          ? 'action-btn read done'
                          : 'action-btn read'
                      }
                      onClick={() => readMessageHandler(message._id)}
                      title={
                        message.isRead === true
                          ? 'تمت القراءة'
                          : 'إنقر فوقها لإتمام قرائة الرسالة'
                      }
                    >
                      <FontAwesomeIcon icon={faBookReader} />
                    </div>
                  </Col>
                ))}
              </>
            ) : (
              <ErrorMessage>لا يوجد رسائل وارده لديك حتى الأن</ErrorMessage>
            )}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default MyMessages;
