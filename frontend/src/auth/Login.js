import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { login, reset } from '../store/reducers/Authentication/AuthReducer';
import PageTitle from '../utils/PageTitle';
import GoogleLoginAuth from './GoogleAuth/GoogleLoginAuth';
import './Auth.css';

const Login = () => {
  const loadingSpinner = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const userData = { email, password };
    console.log(email, password);
    dispatch(login(userData));
    loadingSpinner.current.classList.remove('loading');
  };

  const PasswordInput = useRef();

  if (isLoading) {
    loadingSpinner.current.classList.add('loading');
  }

  useEffect(() => {
    if (user) {
      return (window.location.href = '/');
    }

    const hidePassword = document.querySelector('.eye-icon.hide-password');
    const showPassword = document.querySelector('.eye-icon.show-password');

    showPassword.onclick = () => {
      PasswordInput.current.type = 'text';
      hidePassword.classList.remove('hide');
      showPassword.classList.add('hide');
    };

    hidePassword.onclick = () => {
      PasswordInput.current.type = 'password';
      hidePassword.classList.add('hide');
      showPassword.classList.remove('hide');
    };

    if (isError) {
      loadingSpinner.current.classList.remove('loading');
      toast.error(message);
    }

    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  return (
    <section className='auth login'>
      <PageTitle title={`مسكن | تسجيل الدخول`} />
      <Form onSubmit={handleSubmit}>
        <div className='title'>تسجــــيل الدخـــول</div>

        <Form.Group className='mb-3'>
          <Form.Label>البــريـد الإلكتــرونــى :</Form.Label>
          <FormControl
            type='email'
            name='email'
            placeholder='البــريـد الإلكتــرونــى'
            required
            value={email}
            onChange={handleChange}
          />{' '}
        </Form.Group>
        <Form.Group className='mb-3'>
          <Form.Label> الــرقم الســرى : </Form.Label>
          <div className='form-group'>
            {' '}
            <FormControl
              type='password'
              name='password'
              placeholder='الــرقم الســرى'
              required
              className='password-input'
              ref={PasswordInput}
              value={password}
              onChange={handleChange}
            />
            <FontAwesomeIcon
              icon={faEye}
              className='eye-icon hide-password hide'
            />
            <FontAwesomeIcon
              icon={faEyeSlash}
              className='eye-icon show-password'
            />
          </div>
        </Form.Group>

        <Button type='submit' disabled={isLoading}>
          تسجيل الدخــــــــول{' '}
        </Button>
      </Form>

      <GoogleLoginAuth
        setFormData={setFormData}
        buttontext='تسجيل الدخول بحساب جوجل'
      />

      <p>
        ليس لديك حساب ؟ <Link to='/register'>إنشــــاء حســــاب</Link>
      </p>
      <p>
        <Link to='/forgot-password'>نسيت كلمة المرور ؟</Link>
      </p>
      <Link to='/'>الرجوع للصفحة الرئيسية</Link>

      <div className='isLoading' ref={loadingSpinner}>
        <Spinner animation='grow' variant='warning' />
      </div>
    </section>
  );
};

export default Login;
