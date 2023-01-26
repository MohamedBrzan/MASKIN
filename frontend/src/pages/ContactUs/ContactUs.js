import Form from 'react-bootstrap/esm/Form';
import Button from 'react-bootstrap/Button';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import PageTitle from '../../utils/PageTitle';
import ServerErrorMessage from '../../error/ServerErrorMessage';
import './ContactUs.css';
import { useState } from 'react';

const ContactUs = () => {
  const { user } = useSelector((state) => state.auth);
  const [message, setMessage] = useState('');

  const sendingMessage = async (e) => {
    try {
      e.preventDefault();
      await axios({
        method: 'POST',
        url: '/api/v1/user/contact-us',
        data: message,
      }).then((res) => toast.success(res.data.message));
    } catch (error) {
      return toast.error(ServerErrorMessage(error));
    }
  };

  return (
    <div className='contact-us'>
      <PageTitle title={`مسكن | تواصل معنا `} />
      <div className='contact-us-title'>
        <h1>تواصل معنا</h1>
        <p>هل تريد أن تساعدنا على تحسين خدماتنا؟</p>
      </div>
      <Form className='mt-4' onSubmit={sendingMessage}>
        <Form.Group controlId='formBasicPassword' className='mb-3'>
          <Form.Label>الرسالة</Form.Label>
          <Form.Control
            as='textarea'
            rows='8'
            placeholder='الرسالة'
            value={message}
            required
            onChange={(e) => setMessage(e.target.value)}
          />
        </Form.Group>

        <Button variant='primary' type='submit'>
          إرســـــال الرسالة
        </Button>
      </Form>
    </div>
  );
};

export default ContactUs;
