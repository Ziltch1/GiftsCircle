import { dispatch } from '../../store';
import ErrorHandler from '../../axios/Utils/ErrorHandler';
import {
  GetMarkeplaceTransApi,
} from '../../axios/apis/marketPlace';
import { setUserPurchasedItems } from './marketSlice';

const GetUserMarketItems = id => async () => {
  try {
    const res = await GetMarkeplaceTransApi(id);
    dispatch(setUserPurchasedItems(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

export { GetUserMarketItems };
