import { dispatch } from '../../store';
import {
  setComplimentaryGifts,
  setEventGiftsTrans,
  setGiftItems,
  setUserPurchasedGifts,
} from './giftSlice';
import ErrorHandler from '../../axios/Utils/ErrorHandler';
import {
  BuyComplimentaryGiftsApi,
  BuyGiftsApi,
  DeleteEventGiftApi,
  GetComplimentaryGiftItemsApi,
  GetEventGiftTransApi,
  GetGiftItemsApi,
  GetUserPurchasedGiftsApi,
} from '../../axios/apis/gift';
import { GetEventGifts } from '../events/service';

const GetGiftItems = () => async () => {
  try {
    const res = await GetGiftItemsApi();
    dispatch(setGiftItems(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetComplimentaryGiftItems = () => async () => {
  try {
    const res = await GetComplimentaryGiftItemsApi();
    dispatch(setComplimentaryGifts(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetUserPurchasedGifts = id => async () => {
  try {
    const res = await GetUserPurchasedGiftsApi(id);
    dispatch(setUserPurchasedGifts(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetEventGiftsTransactions = id => async () => {
  try {
    const res = await GetEventGiftTransApi(id);
    dispatch(setEventGiftsTrans(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const BuyGifts = data => async () => {
  try {
    await BuyGiftsApi(data);
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const BuyComplimentaryGifts = data => async () => {
  try {
    await BuyComplimentaryGiftsApi(data);
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const DeleteGiftItems = (id, eventId) => async () => {
  try {
    await DeleteEventGiftApi(id);
    dispatch(GetEventGifts(eventId));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

export {
  GetGiftItems,
  DeleteGiftItems,
  GetUserPurchasedGifts,
  GetEventGiftsTransactions,
  BuyGifts,
  BuyComplimentaryGifts,
  GetComplimentaryGiftItems,
};
