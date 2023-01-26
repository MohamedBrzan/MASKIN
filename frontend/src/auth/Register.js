import React, { useEffect, useRef, useState } from 'react';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { toast } from 'react-toastify';
import validator from 'validator';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { register, reset } from '../store/reducers/Authentication/AuthReducer';
import avatarImage from '../images/avatar_.png';
import PageTitle from '../utils/PageTitle';
import GoogleRegisterAuth from './GoogleAuth/GoogleRegisterAuth';
import './Auth.css';

const Register = () => {
  const loadingSpinner = useRef();
  const [avatar, setAvatar] = useState('' || avatarImage);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    rePassword: '',
  });

  const { name, email, password, rePassword } = formData;

  const uploadImage = () => {
    const file = document.getElementById('fileInput').files[0];
    let avatarPreview = document.getElementById('avatarPreview');

    const checkExtension = (file) => {
      if (/\.(jpe?g|png|gif)$/i.test(file.name)) {
        const reader = new FileReader();
        reader.addEventListener(
          'load',
          () => {
            avatarPreview.src = reader.result;
            setAvatar(reader.result);
          },
          false
        );
        reader.readAsDataURL(file);
      }
    };

    if (file) {
      checkExtension(file);
    }
  };

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name.length < 3) {
      return toast.error(
        'يجب أن يتكون الإسم من 3 أحرف على الأقل ويكون خالى من الرموز'
      );
    } else if (password !== rePassword) {
      return toast.error('الرقم السرى غير متطابق');
    } else if (!validator.isEmail(email)) {
      return toast.error('هذا الإيميل غير صالح');
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
        'يجب أن يتكون الرقم السرى من 8 أحرف بالإضافة إلى رقم ورمز على الأقل و حرف كابيتال'
      );
    } else {
      const userData = { avatar, name, email, password };
      dispatch(register(userData));
    }
  };

  const PasswordInput = useRef();
  const RePasswordInput = useRef();

  if (isLoading) {
    loadingSpinner.current.classList.add('loading');
  }

  if (isError) {
    loadingSpinner.current.classList.remove('loading');
    toast.error(message);
  }

  if (isSuccess) {
    navigate('/');
    loadingSpinner.current.classList.remove('loading');
  }

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
    <section className='auth register'>
      <PageTitle title={`مسكن | إشترك الأن`} />
      <Form
        onSubmit={handleSubmit}
        onError={(error) => toast.error(error.currentTarget.textContent)}
      >
        <div className='title'>إشــتـــــــرك الأن</div>

        <Form.Label htmlFor='avatar' className='mb-3'>
          الصورة الشخصية :
        </Form.Label>
        <div className='avatar'>
          <img src={avatar} alt='Avatar.' id='avatarPreview' />
          <Form.Group className='mb-3'>
            <FormControl
              type='file'
              name='avatar'
              id='fileInput'
              onChange={uploadImage}
            />
          </Form.Group>
        </div>

        <Form.Group className='mb-3'>
          <Form.Label>الإســــــــم :</Form.Label>
          <FormControl
            type='text'
            name='name'
            placeholder='الإســــــــم'
            required
            value={name}
            onChange={handleChange}
          />
        </Form.Group>
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
          <Form.Text>
            لن يتم مشاركة أى بيانات لك مع أى شخص أو منصه أو شركة .
          </Form.Text>
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
            <Form.Text className='error-text text-danger'>
              يجب أن يتكون الرقم السرى من 8 أحرف بالإضافة إلى رقم ورمز على الأقل
              و حرف كابيتال
            </Form.Text>
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

        <Button type='submit'>إشتـــــــــــرك</Button>
        <GoogleRegisterAuth
          setFormData={setFormData}
          setAvatar={setAvatar}
          buttontext='إستخدم بيانات حساب جوجل'
        />
      </Form>
      <p>
        لديك حســاب بالفعـــل ؟ <Link to='/login'>تسجيــل الــدخـــــول</Link>
      </p>
      <Link to='/'>الرجوع للصفحة الرئيسية</Link>{' '}
      <div className='isLoading' ref={loadingSpinner}>
        <Spinner animation='grow' variant='warning' />
      </div>
    </section>
  );
};

export default Register;
