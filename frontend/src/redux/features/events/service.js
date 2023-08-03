import {
  DeleteEventApi,
  GetEventGuestsApi,
  GetUserEventsApi,
} from '../../axios/apis/events';
import { dispatch } from '../../store';
import {
  setAsoebisItems,
  setEventAsoebiBuyers,
  setEventAsoebis,
  setEventDeliveryDetails,
  setEventGifts,
  setEventGuests,
  setEventMediaFiles,
  setEvents,
  setFundRaising,
  setFundRaisingDonors,
  setGuestSentFiles,
  setLoading,
  setNewEvent,
  setUserUploadedFiles,
} from './eventSlice';
import ErrorHandler from '../../axios/Utils/ErrorHandler';
import {
  DonateFundraisingApi,
  GetFundraisingApi,
  GetFundraisingDonorsApi,
  UpdateFundraisingStatusApi,
} from '../../axios/apis/fundraising';
import {
  BuyEventAsoebiApi,
  DeleteAsoebiApi,
  GetAsoebiItemsApi,
  GetEventAsoebiApi,
  GetEventAsoebiBuyersApi,
} from '../../axios/apis/asoebi';
import {
  GetEventMediaFilesApi,
  GetGuestSentFilesApi,
  GetUserUploadedMediaApi,
} from '../../axios/apis/media';
import { GetEventDeliveryDetailsApi } from '../../axios/apis/delivery';
import { GetEventGiftsApi, GetUserEventGiftsApi } from '../../axios/apis/gift';

const GetUserEvents = id => async () => {
  dispatch(setLoading(false));
  try {
    const res = await GetUserEventsApi(id);

    dispatch(setEvents(res.data));
    dispatch(setLoading(false));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetEventGifts = id => async () => {
  try {
    const res = await GetEventGiftsApi(id);
    dispatch(setEventGifts(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetUserEventGifts = (id, userId) => async () => {
  try {
    const res = await GetUserEventGiftsApi(id, userId);
    dispatch(setEventGifts(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetEventDeliveryDetails = id => async () => {
  try {
    const res = await GetEventDeliveryDetailsApi(id);
    dispatch(setEventDeliveryDetails(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetEventGuests = id => async () => {
  try {
    const res = await GetEventGuestsApi(id);
    dispatch(setEventGuests(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetAsoebiItems = () => async () => {
  try {
    const res = await GetAsoebiItemsApi();
    dispatch(setAsoebisItems(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetEventAsoebis = id => async () => {
  try {
    const res = await GetEventAsoebiApi(id);
    dispatch(setEventAsoebis(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetEventAsoebiBuyers = id => async () => {
  try {
    const res = await GetEventAsoebiBuyersApi(id);
    dispatch(setEventAsoebiBuyers(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetEventFundRaising = id => async () => {
  try {
    const res = await GetFundraisingApi(id);
    dispatch(setFundRaising(res.data[0]));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetEventFundRaisingDonors = id => async () => {
  try {
    const res = await GetFundraisingDonorsApi(id);
    dispatch(setFundRaisingDonors(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetEventMediaFiles = id => async () => {
  try {
    const res = await GetEventMediaFilesApi(id);
    dispatch(setEventMediaFiles(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetUserUploadedFiles = (eventId, userId) => async () => {
  try {
    const res = await GetUserUploadedMediaApi(eventId, userId);
    dispatch(setUserUploadedFiles(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetGuestSentFiles = (eventId, userId) => async () => {
  try {
    const res = await GetGuestSentFilesApi(eventId, userId);
    dispatch(setGuestSentFiles(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const BuyEventAsoebi = data => async () => {
  try {
    await BuyEventAsoebiApi(data);
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const DonateFundRaising = (data, eventId) => async () => {
  try {
    const res = await DonateFundraisingApi(data);
    dispatch(GetEventFundRaisingDonors(res.data.fundId));
    dispatch(GetEventFundRaising(eventId));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const StopFundRaising = data => async () => {
  try {
    const res = await UpdateFundraisingStatusApi(data);
    dispatch(setFundRaising(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const DeleteEvent = id => async () => {
  try {
    await DeleteEventApi(id);

    dispatch(setNewEvent(null));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const DeleteAsoebi = (id, eventId) => async () => {
  try {
    await DeleteAsoebiApi(id);
    dispatch(GetEventAsoebis(eventId));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

export {
  GetUserEvents,
  GetEventGifts,
  GetUserEventGifts,
  GetEventGuests,
  GetEventAsoebis,
  GetEventDeliveryDetails,
  GetEventAsoebiBuyers,
  DeleteEvent,
  GetEventFundRaising,
  BuyEventAsoebi,
  StopFundRaising,
  DonateFundRaising,
  GetEventFundRaisingDonors,
  GetEventMediaFiles,
  GetUserUploadedFiles,
  GetGuestSentFiles,
  GetAsoebiItems,
  DeleteAsoebi,
};
