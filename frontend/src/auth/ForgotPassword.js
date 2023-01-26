import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom';
import { forgotPassword } from '../store/reducers/Authentication/AuthReducer';
import PageTitle from '../utils/PageTitle';
import './Auth.css';

const ForgotPassword = () => {
  const loadingSpinner = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    if (email === '') return toast.error(message);

    dispatch(forgotPassword(email));
    loadingSpinner.current.classList.remove('loading');
  };

  if (isLoading) {
    loadingSpinner.current.classList.add('loading');
  }

  useEffect(() => {
    if (user) {
      return (window.location.href = '/');
    }

    if (isError) {
      toast.error(message);
      loadingSpinner.current.classList.remove('loading');
    }
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  return (
    <section className='auth forgot-password'>
      <PageTitle title={`مسكن | التأكد من البريد الإلكترونى`} />
      <Form onSubmit={handleSubmit}>
        <div className='title'> البريد الإلكترونى</div>

        <Form.Group className='mb-3'>
          <Form.Label>البــريـد الإلكتــرونــى :</Form.Label>
          <FormControl
            type='email'
            name='email'
            placeholder='البــريـد الإلكتــرونــى'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />{' '}
        </Form.Group>

        <Button type='submit' disabled={isLoading}>
          فحص{' '}
        </Button>
      </Form>

      <div className='isLoading' ref={loadingSpinner}>
        <Spinner animation='grow' variant='warning' />
      </div>
    </section>
  );
};

export default ForgotPassword;
