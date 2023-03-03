import { dispatch } from '../../store';
import { createResponse } from '../../utils/UtilSlice';
import { setGiftItems } from './giftSlice';
import ErrorHandler from '../../axios/Utils/ErrorHandler';
import { GetGiftItemsApi } from '../../axios/apis/gift';

const GetGiftItems = () => async () => {
  try {
    const res = await GetGiftItemsApi();
    dispatch(setGiftItems(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export { GetGiftItems };
