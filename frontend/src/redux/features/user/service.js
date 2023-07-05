import { GetUserNotificationApi, UpdateUserApi } from '../../axios/apis/user';
import { dispatch } from '../../store';
import { createResponse } from '../../utils/UtilSlice';
import { setDeliveryDetails, setUser, setUserNotifications } from './userSlice';

import ErrorHandler from '../../axios/Utils/ErrorHandler';
import { GetDeliveryDetailsApi } from '../../axios/apis/delivery';

const UpdateUser = (data, id) => async () => {
  try {
    const res = await UpdateUserApi(data, id);
    console.log(res.data);
    dispatch(setUser(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetDeliveryDetails = userId => async () => {
  try {
    const res = await GetDeliveryDetailsApi(userId);
    dispatch(setDeliveryDetails(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetUserNotifications = userId => async () => {
  try {
    const res = await GetUserNotificationApi(userId);
    dispatch(setUserNotifications(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

export { UpdateUser, GetDeliveryDetails, GetUserNotifications };
