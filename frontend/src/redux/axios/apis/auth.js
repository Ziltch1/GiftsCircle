import api from '../axios';

const GoogleSignInApi = data => {
  return api.post('/googleSignin', data);
};

const SignInApi = data => {
  return api.post('/login', data);
};

const VerifyEmailApi = data => {
  return api.post('/verifyEmail', data);
};

const SetPasswordApi = data => {
  return api.post('/setPassword', data);
};

const ResetPasswordApi = data => {
  return api.post('/resetPassword', data);
};

const SendResetPasswordLink = data => {
  return api.post('/sendResetEmail', data);
};

const SendOtpLink = data => {
  return api.post('/sendVerifyEmail', data);
};

export {
  GoogleSignInApi,
  SignInApi,
  VerifyEmailApi,
  SetPasswordApi,
  SendResetPasswordLink,
  SendOtpLink,
  ResetPasswordApi,
};
