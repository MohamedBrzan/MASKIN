import FormGroup from 'react-bootstrap/esm/FormGroup';
import FormLabel from 'react-bootstrap/esm/FormLabel';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import ProfileOffcanvas from './ProfileOffcanvas';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import {
  useGetMyProfileQuery,
  useUpdateMyProfileMutation,
} from '../../../store/apis/User/Profile';
import PageTitle from '../../../utils/PageTitle';
import LoadingPage from '../../../utils/LoadingPage';
import ServerErrorMessage from '../../../error/ServerErrorMessage';
import '../Profile.css';

const Settings = () => {
  const { user, isLoading, isError, error, isSuccess, message } = useSelector(
    (state) => state.updateUser
  );
  const {
    data,
    isLoading: dataLoading,
    isSuccess: dataSuccess,
    isFetching,
    refetch,
  } = useGetMyProfileQuery(user._id);

  const [updateMyProfile, { isLoading: updatingLoading }] =
    useUpdateMyProfileMutation();

  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(dataSuccess ? data.user.avatar : '');

  const [formData, setFormData] = useState({
    name: dataSuccess ? data.user.name : '',
    bio: dataSuccess ? data.user.bio : '',
    oldPassword: '',
    newPassword: '',
    state: dataSuccess ? data.user.location.state : '',
    country: dataSuccess ? data.user.location.country : '',
    city: dataSuccess ? data.user.location.city : '',
    blockNo: dataSuccess ? data.user.location.blockNo : '',
    address: dataSuccess ? data.user.location.address : '',
    zipCode: dataSuccess ? data.user.location.zipCode : 0,
    phone: dataSuccess ? data.user.location.phone : '',

    facebook: dataSuccess ? data.user.links.facebook : '',
    twitter: dataSuccess ? data.user.links.twitter : '',
    instagram: dataSuccess ? data.user.links.instagram : '',
    youtube: dataSuccess ? data.user.links.youtube : '',
    linkedin: dataSuccess ? data.user.links.linkedin : '',
    snapchat: dataSuccess ? data.user.links.snapchat : '',
  });

  const resetFormData = () => {
    setAvatar(user && user.avatar);
    setFormData({
      name: user && user.name,
      bio: user && user.bio,
      oldPassword: '',
      newPassword: '',
      state: user && user.location && user.location.state,
      country: user && user.location && user.location.country,
      city: user && user.location && user.location.city,
      blockNo: user && user.location && user.location.blockNo,
      address: user && user.location && user.location.address,
      zipCode: user && user.location && user.location.zipCode,
      phone: user && user.location && user.location.phone,
      facebook: user && user.links && user.links.facebook,
      twitter: user && user.links && user.links.twitter,
      instagram: user && user.links && user.links.instagram,
      youtube: user && user.links && user.links.youtube,
      linkedin: user && user.links && user.links.linkedin,
      snapchat: user && user.links && user.links.snapchat,
    });
  };

  const {
    name,
    bio,
    oldPassword,
    newPassword,
    state,
    country,
    city,
    blockNo,
    address,
    zipCode,
    phone,
    facebook,
    twitter,
    instagram,
    youtube,
    linkedin,
    snapchat,
  } = formData;

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const uploadAvatar = () => {
    const file = document.querySelector('input[name="avatar"').files[0];
    const avatarPreview = document.getElementById('avatarPreview');

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userData = {
      avatar,
      name,
      bio,
      oldPassword,
      newPassword,
      location: {
        state,
        country,
        city,
        blockNo,
        address,
        zipCode,
        phone,
      },

      links: {
        facebook,
        twitter,
        instagram,
        youtube,
        linkedin,
        snapchat,
      },
    };

    await updateMyProfile(userData)
      .then((res) => {
        localStorage.removeItem('user');
        localStorage.setItem('user', JSON.stringify(res.data.user));
        refetch();
        navigate('/me');
      })
      .catch((err) => toast.error(ServerErrorMessage(err)));
  };

  useEffect(() => {
    if (isError) return toast.error(ServerErrorMessage(error));
  }, [error, isError, isSuccess, message, navigate, refetch]);

  if (isLoading || updatingLoading || dataLoading || isFetching) {
    return <LoadingPage />;
  }

  return (
    <>
      <PageTitle
        title={`???????????????? | ${
          user && user.name
            ? user.name
            : user && user.user && user.user.name
            ? user.user.name
            : ''
        } `}
      />
      <ProfileOffcanvas />
      <section className='settings-form'>
        <h1 className='page-title'>?????????????????? ????????????</h1>
        <Form onSubmit={handleSubmit}>
          <div className='form-group-title'>
            <h3>??????</h3>
          </div>
          <Row className='form-content'>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel>??????????????</FormLabel>
                <FormControl
                  type='text'
                  name='name'
                  value={name}
                  onChange={handleChange}
                  placeholder='??????????????'
                  required
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel> ????????????</FormLabel>
                <FormControl
                  type='tel'
                  name='phone'
                  value={phone}
                  onChange={handleChange}
                  placeholder='?????? ????????????'
                />
              </FormGroup>
            </Col>
            <Col>
              <FormGroup className='mb-3'>
                <FormLabel>???????? ????????????</FormLabel>
                <FormControl
                  as={'textarea'}
                  rows='3'
                  name='bio'
                  value={bio}
                  onChange={handleChange}
                  placeholder='???????? ????????????'
                />
              </FormGroup>
            </Col>
          </Row>
          <div className='form-group-title'>
            <h3>????????????</h3>
          </div>
          <Row className='form-content'>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel>????????????</FormLabel>
                <FormControl
                  type='text'
                  name='state'
                  value={state}
                  onChange={handleChange}
                  placeholder='????????????'
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel>????????????????</FormLabel>
                <FormControl
                  type='text'
                  name='country'
                  value={country}
                  onChange={handleChange}
                  placeholder='????????????????'
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel>??????????????</FormLabel>
                <FormControl
                  type='text'
                  name='city'
                  value={city}
                  onChange={handleChange}
                  placeholder='??????????????'
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel>?????? ????????????</FormLabel>
                <FormControl
                  type='text'
                  name='blockNo'
                  value={blockNo}
                  onChange={handleChange}
                  placeholder='?????? ????????????'
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel>??????????????</FormLabel>
                <FormControl
                  type='text'
                  name='address'
                  value={address}
                  onChange={handleChange}
                  placeholder='??????????????'
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel>?????????? ??????????????</FormLabel>
                <FormControl
                  type='number'
                  name='zipCode'
                  value={zipCode || 0}
                  onChange={handleChange}
                  placeholder='?????????? ??????????????'
                />
              </FormGroup>
            </Col>
          </Row>
          <div className='form-group-title'>
            <h3>?????????? ?????????????? ??????????????????</h3>
          </div>
          <Row className='form-content'>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel>
                  <i className='fa-brands fa-facebook fs-5'></i> ????????????
                </FormLabel>
                <FormControl
                  type='url'
                  name='facebook'
                  value={facebook}
                  onChange={handleChange}
                  placeholder='????????????'
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel>
                  <i className='fa-brands fa-twitter fs-5'></i> ??????????
                </FormLabel>
                <FormControl
                  type='url'
                  name='twitter'
                  value={twitter}
                  onChange={handleChange}
                  placeholder='??????????'
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel>
                  <i className='fa-brands fa-instagram fs-5'></i> ????????????????
                </FormLabel>
                <FormControl
                  type='url'
                  name='instagram'
                  value={instagram}
                  onChange={handleChange}
                  placeholder='????????????????'
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel>
                  <i className='fa-brands fa-linkedin fs-5'></i> ??????????????
                </FormLabel>
                <FormControl
                  type='url'
                  name='linkedin'
                  value={linkedin}
                  onChange={handleChange}
                  placeholder='??????????????'
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel>
                  <i className='fa-brands fa-youtube fs-5'></i> ????????????
                </FormLabel>
                <FormControl
                  type='url'
                  name='youtube'
                  value={youtube}
                  onChange={handleChange}
                  placeholder='????????????'
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel>
                  <i className='fa-brands fa-snapchat fs-5'></i> ?????????? ??????
                </FormLabel>
                <FormControl
                  type='url'
                  name='snapchat'
                  value={snapchat}
                  onChange={handleChange}
                  placeholder='?????????? ??????'
                />
              </FormGroup>
            </Col>
          </Row>
          <div className='form-group-title'>
            <h3>???????? ????????????</h3>
          </div>
          <Row className='form-content'>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel>???????? ???????????? ??????????????</FormLabel>
                <FormControl
                  type='text'
                  name='oldPassword'
                  value={oldPassword}
                  onChange={handleChange}
                  placeholder='???????? ???????????? ??????????????'
                />
              </FormGroup>
            </Col>
            <Col xs={12} md={4}>
              <FormGroup className='mb-3'>
                <FormLabel>???????? ???????????? ??????????????</FormLabel>
                <FormControl
                  type='text'
                  name='newPassword'
                  value={newPassword}
                  onChange={handleChange}
                  placeholder='???????? ???????????? ??????????????'
                />
              </FormGroup>
            </Col>
          </Row>
          <div className='form-group-title'>
            <h3>???????????? ??????????????</h3>
          </div>
          <Row className='form-content'>
            <Col xs={12}>
              <FormGroup className='mb-3'>
                <FormControl
                  type='file'
                  name='avatar'
                  onChange={uploadAvatar}
                />
              </FormGroup>
            </Col>
            <Col xs={12}>
              <img
                src={avatar}
                alt='Avatar.'
                id='avatarPreview'
                className='avatar'
              />
            </Col>
          </Row>
          <Row>
            <Button className='save-btn' onClick={resetFormData}>
              ?????? ????????????????
            </Button>
            <Button type='submit' className='save-btn'>
              ?????? ??????????????????
            </Button>
          </Row>
        </Form>
      </section>
    </>
  );
};

export default Settings;
