import { UpdateUserApi } from '../../axios/apis/user';
import { dispatch } from '../../store';
import { createResponse } from '../../utils/UtilSlice';
import { setUser } from './userSlice';

import ErrorHandler from '../../axios/Utils/ErrorHandler';

const UpdateUser = (data, id) => async () => {
  try {
    const res = await UpdateUserApi(data, id);
    console.log(res.data)
    dispatch(setUser(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export { UpdateUser };
