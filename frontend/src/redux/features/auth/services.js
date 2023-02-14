import { GoogleSignInApi, SignInApi } from '../../axios/apis/auth';
import ErrorHandler from '../../axios/Utils/ErrorHandler';
import { dispatch } from '../../store';
import { createResponse, setWelcomeModal } from '../../utils/UtilSlice';
import { setToken, setUser } from './authSlice';

const GoogleSignIn = data => async () => {
  try {
    const res = await GoogleSignInApi(data);
    sessionStorage.setItem('token', res.data.token);
    sessionStorage.setItem('user', JSON.stringify(res.data.user));
    dispatch(setToken(res.data.token));
    dispatch(setUser(res.data.user));
    dispatch(setWelcomeModal(true))
  } catch (error) {
    console.log(error);
    dispatch(createResponse(ErrorHandler(error)));
  }
};

const EmailSignIn = data => async () => {
  try {
    const res = await SignInApi(data);
    sessionStorage.setItem('token', res.data.token);
    sessionStorage.setItem('user', JSON.stringify(res.data.user));
    dispatch(setToken(res.data.token));
    dispatch(setUser(res.data.user));
    dispatch(setWelcomeModal(true))
  } catch (error) {
    console.log(ErrorHandler(error));
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export { GoogleSignIn, EmailSignIn };
