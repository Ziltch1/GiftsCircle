import { dispatch } from '../../store';
import {
  setComplimentaryGifts,
  setEventGiftsTrans,
  setGiftItems,
  setSourvenir,
  setUserEventGiftTrans,
  setUserPurchasedGifts,
} from './giftSlice';
import ErrorHandler from '../../axios/Utils/ErrorHandler';
import {
  BuyComplimentaryGiftsApi,
  BuyGiftsApi,
  DeleteEventGiftApi,
  GetComplimentaryGiftItemsApi,
  GetEventGiftsTransApi,
  GetGiftItemsApi,
  GetUserEventGiftsTransApi,
  GetUserPurchasedGiftsApi,
} from '../../axios/apis/gift';
import { GetEventGifts } from '../events/service';
import { GetSourvenirApi } from '../../axios/apis/sourvenir';

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

const GetSourvenirItems = () => async () => {
  try {
    const res = await GetSourvenirApi();
    dispatch(setSourvenir(res.data));
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
    const res = await GetEventGiftsTransApi(id);
    dispatch(setEventGiftsTrans(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetUserEventGiftsTransactions = (id, eventId) => async () => {
  try {
    const res = await GetUserEventGiftsTransApi(id, eventId);
    dispatch(setUserEventGiftTrans(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const BuyGifts = (data, eventId) => async () => {
  try {
    let Data = await BuyGiftsApi(data);
    if (Data.status) {
      dispatch(GetEventGifts(eventId));
    }
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
  GetUserEventGiftsTransactions,
  BuyGifts,
  BuyComplimentaryGifts,
  GetComplimentaryGiftItems,
  GetSourvenirItems,
};
