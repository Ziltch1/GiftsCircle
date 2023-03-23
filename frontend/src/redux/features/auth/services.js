import { GoogleSignInApi, SignInApi } from '../../axios/apis/auth';
import ErrorHandler from '../../axios/Utils/ErrorHandler';
import { dispatch } from '../../store';
import { createResponse, setWelcomeModal } from '../../utils/UtilSlice';
import { setUser } from '../user/userSlice';
import { setToken } from './authSlice';

const GoogleSignIn = data => async () => {
  try {
    const res = await GoogleSignInApi(data);
    sessionStorage.setItem('token', res.data.token);
    sessionStorage.setItem('user', JSON.stringify(res.data.user));
    dispatch(setToken(res.data.token));
    dispatch(setUser(res.data.user));
    dispatch(setWelcomeModal(true));
  } catch (error) {
    console.log(error);
    dispatch(createResponse(ErrorHandler(error)));
  }
};

const EmailSignIn = data => async () => {
  sessionStorage.setItem('token', data.token);
  sessionStorage.setItem('user', JSON.stringify(data.user));
  dispatch(setToken(data.token));
  dispatch(setUser(data.user));
  dispatch(setWelcomeModal(true));
};

export { GoogleSignIn, EmailSignIn };
