import { GoogleSignInApi, SignInApi } from '../../axios/apis/auth';
import { dispatch } from '../../store';
import { setToken } from './authSlice';

const GoogleSignIn = data => async () => {
  try {
    const res = await GoogleSignInApi(data);
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

const EmailSignIn = data => async () => {
  try {
    const res = await SignInApi(data);
    sessionStorage.setItem('token', res.data.token);
    dispatch(setToken(res.data.token));
  } catch (error) {
    console.log(error);
  }
};

export { GoogleSignIn, EmailSignIn };
