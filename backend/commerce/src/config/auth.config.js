import authConfig from 'ok-backend-common/config/auth.config.js';

const configs = {
  ...authConfig,
  jwt_expires_in: process.env.JWT_EXPIRES_IN,
  auth_token_expires_in: process.env.AUTH_TOKEN_EXPIRES_IN,
  reset_password_token_expires_in: process.env.RESET_PASSWORD_TOKEN_EXPIRES_IN,
};

export default configs;
