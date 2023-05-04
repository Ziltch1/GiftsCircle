import {
  DeleteEventApi,
  GetEventGiftsApi,
  GetUserEventsApi,
} from '../../axios/apis/events';
import { dispatch } from '../../store';
import { createResponse } from '../../utils/UtilSlice';
import {
  setAsoebisItems,
  setEventAsoebis,
  setEventGifts,
  setEvents,
  setFundRaising,
  setFundRaisingDonors,
  setLoading,
  setNewEvent,
} from './eventSlice';
import ErrorHandler from '../../axios/Utils/ErrorHandler';
import {
  GetFundraisingApi,
  GetFundraisingDonorsApi,
  UpdateFundraisingStatusApi,
} from '../../axios/apis/fundraising';
import {
  DeleteAsoebiApi,
  GetAddedAsoebiItemsApi,
  GetAsoebiItemsApi,
} from '../../axios/apis/asoebi';

const GetUserEvents = id => async () => {
  dispatch(setLoading(false));
  try {
    const res = await GetUserEventsApi(id);

    dispatch(setEvents(res.data));
    dispatch(setLoading(false));
  } catch (error) {
    console.log(ErrorHandler(error));
    dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetEventGifts = id => async () => {
  try {
    const res = await GetEventGiftsApi(id);
    dispatch(setEventGifts(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetAsoebiItems = () => async () => {
  try {
    const res = await GetAsoebiItemsApi();
    dispatch(setAsoebisItems(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetEventAsoebis = id => async () => {
  try {
    const res = await GetAddedAsoebiItemsApi(id);
    dispatch(setEventAsoebis(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetEventFundRaising = id => async () => {
  try {
    const res = await GetFundraisingApi(id);
    dispatch(setFundRaising(res.data));
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

const StopFundRaising = data => async () => {
  try {
    const res = await UpdateFundraisingStatusApi(data);
    dispatch(setFundRaising(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    dispatch(createResponse(ErrorHandler(error)));
  }
};

const DeleteEvent = id => async () => {
  try {
    await DeleteEventApi(id);

    dispatch(setNewEvent(null));
  } catch (error) {
    console.log(ErrorHandler(error));
    dispatch(createResponse(ErrorHandler(error)));
  }
};

const DeleteAsoebi = (id, eventId) => async () => {
  try {
    await DeleteAsoebiApi(id);
    dispatch(GetEventAsoebis(eventId));
  } catch (error) {
    console.log(ErrorHandler(error));
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export {
  GetUserEvents,
  GetEventGifts,
  GetEventAsoebis,
  DeleteEvent,
  GetEventFundRaising,
  StopFundRaising,
  GetEventFundRaisingDonors,
  GetAsoebiItems,
  DeleteAsoebi,
};
