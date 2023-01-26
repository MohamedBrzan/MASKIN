module.exports = (res, user, statusCode) => {
  const token = user.generateToken();

  const options = {
    httpOnly: true,
    expiresIn: '30d',
    algorithm: 'HS256',
  };

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    user,
    token,
  });
};
