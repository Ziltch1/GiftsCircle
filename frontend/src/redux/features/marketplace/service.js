import { dispatch } from '../../store';
import ErrorHandler from '../../axios/Utils/ErrorHandler';
import {
  BuyItemsApi,
  GetMarkeplaceTransApi,
} from '../../axios/apis/marketPlace';
import { setUserPurchasedItems } from './marketSlice';

const GetUserMarketItems = () => async () => {
  try {
    const res = await GetMarkeplaceTransApi();
    dispatch(setUserPurchasedItems(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const BuyItems = data => async () => {
  try {
    await BuyItemsApi(data);
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

export { GetUserMarketItems, BuyItems };
