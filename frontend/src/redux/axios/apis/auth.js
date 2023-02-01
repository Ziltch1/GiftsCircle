import api from '../axios';

const GoogleSignInApi = data => {
  return api.post('/googleSignin', data);
};

const SignInApi = data => {
  return api.post('/login', data);
};

export { GoogleSignInApi, SignInApi };
