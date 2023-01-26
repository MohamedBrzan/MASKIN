import React from 'react';
// import { GoogleLogin } from '@react-oauth/google';
import { GoogleLogin } from 'react-google-login';
import axios from 'axios';
import { toast } from 'react-toastify';
import ServerErrorMessage from '../../error/ServerErrorMessage';

const secret = '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';

const GoogleRegisterAuth = ({ setFormData, buttontext, setAvatar }) => {
  const responseGoogle = async (response) => {
    await axios({
      method: 'POST',
      url: 'api/v1/user/google/auth/register',
      data: {
        token: response.tokenId,
      },
    })
      .then((res) => {
        if (res.data && res.data.name && res.data.email && res.data.picture) {
          const { email, name, picture } = res.data;
          setAvatar(picture);
          setFormData((prevState) => ({
            ...prevState,
            name,
            email,
          }));
        } else {
          const { email, name, imageUrl } = response.profileObj;
          setAvatar(imageUrl);
          setFormData((prevState) => ({
            ...prevState,
            name,
            email,
          }));
        }
      })
      .catch((err) => toast.error(ServerErrorMessage(err)));
  };

  return (
    <GoogleLogin
      clientId='314628851838-6m5435b9iqmgaka795m6tilroc84q9l9.apps.googleusercontent.com'
      buttonText={
        <h6
          className='p-2'
          style={{
            fontWeight: 'Bold',
          }}
        >
          {buttontext}
        </h6>
      }
      onSuccess={responseGoogle}
      onFailure={(err) => toast.error('حدث خطأ ما يرجى إختيار إيميل صحيح')}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleRegisterAuth;
