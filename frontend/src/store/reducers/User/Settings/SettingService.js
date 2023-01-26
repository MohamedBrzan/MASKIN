import axios from 'axios';

const USER_SETTINGS_URL = '/api/v1/user/me';

// Update user
const updateUser = async (userData) => {
  const response = await axios({
    method: 'PUT',
    url: USER_SETTINGS_URL,
    data: userData,
  });

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data));
  }

  return response.data;
};

const SettingsService = {
  updateUser,
};

export default SettingsService;
