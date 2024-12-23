import authConfig from "../config/auth.config.js";

const isOtpEnabled = () => {
  return authConfig.otp_status === "enabled";
};

const generateOTP = () => {
  const otp = Math.floor(1000 + Math.random() * 9000);
  return otp.toString();
};

export { isOtpEnabled, generateOTP };
