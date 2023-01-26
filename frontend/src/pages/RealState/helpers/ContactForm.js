import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';

const ContactForm = ({ realStateId, userId }) => {
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (!localStorage.getItem('user')) return navigate('/login');

    await axios({
      method: 'POST',
      url: '/api/v1/user/messages',
      data: {
        message,
        realStateId,
        userId,
      },
    })
      .then(() => toast.success('تم إرسال الرسالة بنجاح'))
      .catch(() => toast.error('حدث خطأ ما'));
  };

  return (
    <Form onSubmit={handleSendMessage}>
      <div className='contact-title'>تواصــل معــى</div>

      <FormControl
        as='textarea'
        rows='3'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder='الرســـاله'
        required
      />
      <Button type='submit' className='btn-danger'>
        إرســـال
      </Button>
      <div className='pt-3 bg-info p-3 rounded mt-3'>
        <FontAwesomeIcon
          icon={faExclamationCircle}
          className='px-2 text-success'
        />{' '}
        <br />
        من فضلك تأكد من أنك قد قمت من إدخال جميع البيانات المطلوبه بشكل صحيح حيث
        أن الموقع غير مسؤل عن أي خطأ في البيانات المدخله
      </div>
    </Form>
  );
};

export default ContactForm;
