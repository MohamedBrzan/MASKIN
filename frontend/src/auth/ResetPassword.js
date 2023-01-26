import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import validator from 'validator';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import {
  resetPassword,
  reset,
} from '../store/reducers/Authentication/AuthReducer';
import { toast } from 'react-toastify';
import PageTitle from '../utils/PageTitle';
import './Auth.css';

const ResetPassword = () => {
  const loadingSpinner = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const { id } = useParams();

  const [formData, setFormData] = useState({
    password: '',
    rePassword: '',
  });

  const { password, rePassword } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== rePassword) {
      return toast.error('الرقم السرى غير متطابق');
    } else if (
      !validator.isStrongPassword(password, {
        hasUppercase: true,
        minLength: 8,
        minNumbers: 1,
        minSymbols: 1,
      })
    ) {
      document.querySelector('.error-text').style.display = 'block';
      return toast.error(
        'يجب أن يتكون الرقم السرى من 8 أحرف بالإضافة إلى رقم ورمز على الأقل بالإضافة إلى حرف كابيتال'
      );
    } else {
      toast.success('تم تغير كلمة المرور بنجاح');
      const data = { userId: id, password, rePassword };
      setTimeout(() => dispatch(resetPassword(data)), 1000);
    }
  };

  const PasswordInput = useRef();
  const RePasswordInput = useRef();

  useEffect(() => {
    if (user) {
      return (window.location.href = '/');
    }

    const hidePassword = document.querySelector('.eye-icon.hide-password');
    const showPassword = document.querySelector('.eye-icon.show-password');

    const hideRePassword = document.querySelector('.eye-icon.hide-re-password');
    const showRePassword = document.querySelector('.eye-icon.show-re-password');

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

    showRePassword.onclick = () => {
      RePasswordInput.current.type = 'text';
      hideRePassword.classList.remove('hide');
      showRePassword.classList.add('hide');
    };

    hideRePassword.onclick = () => {
      RePasswordInput.current.type = 'password';
      hideRePassword.classList.add('hide');
      showRePassword.classList.remove('hide');
    };

    dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, navigate, dispatch]);

  return (
    <section className='auth reset-password'>
      <PageTitle title={`مسكن | تغير كلمة المرور`} />
      <Form
        onSubmit={handleSubmit}
        onError={(error) => toast.error(error.currentTarget.textContent)}
      >
        <div className='title'>تغيير كلمة المرور</div>

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
            <div className='mt-3'>
              {' '}
              <Form.Text className='error-text text-danger'>
                يجب أن يتكون الرقم السرى من 8 أحرف بالإضافة إلى رقم ورمز على
                الأقل بالإضافة إلى حرف كابيتال
              </Form.Text>
            </div>
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
        <Form.Group className='mb-3'>
          <Form.Label>تــأكـيـــد الــرقم الســرى : </Form.Label>
          <div className='form-group'>
            {' '}
            <FormControl
              type='password'
              name='rePassword'
              placeholder='إدخل الرقـــم الســرى مــرة أخــرى'
              required
              className='password-input'
              ref={RePasswordInput}
              value={rePassword}
              onChange={handleChange}
            />{' '}
            <FontAwesomeIcon
              icon={faEye}
              className='eye-icon hide-re-password hide'
            />
            <FontAwesomeIcon
              icon={faEyeSlash}
              className='eye-icon show-re-password'
            />
          </div>
        </Form.Group>

        <Button type='submit'>تغيير </Button>
      </Form>

      <div className='isLoading' ref={loadingSpinner}>
        <Spinner animation='grow' variant='warning' />
      </div>
    </section>
  );
};

export default ResetPassword;
