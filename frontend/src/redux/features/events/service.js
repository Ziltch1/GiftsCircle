import {
  DeleteEventApi,
  GetEventGiftsApi,
  GetEventGuestsApi,
  GetUserEventsApi,
} from '../../axios/apis/events';
import { dispatch } from '../../store';
import { createResponse } from '../../utils/UtilSlice';
import {
  setAsoebisItems,
  setEventAsoebis,
  setEventGifts,
  setEventGuests,
  setEventMediaFiles,
  setEvents,
  setFundRaising,
  setFundRaisingDonors,
  setGuestSentFiles,
  setHostRecievedFiles,
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
  GetAsoebiItemsApi,
  GetEventAsoebiApi,
} from '../../axios/apis/asoebi';
import {
  GetEventMediaFilesApi,
  GetGuestSentFilesApi,
  GetHostRecievedFilesApi,
} from '../../axios/apis/media';

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

const GetEventMediaFiles = id => async () => {
  try {
    const res = await GetEventMediaFilesApi(id);
    dispatch(setEventMediaFiles(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    // dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetHostRecievedFiles = id => async () => {
  try {
    const res = await GetHostRecievedFilesApi(id);
    dispatch(setHostRecievedFiles(res.data));
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
  GetEventGuests,
  GetEventAsoebis,
  DeleteEvent,
  GetEventFundRaising,
  StopFundRaising,
  GetEventFundRaisingDonors,
  GetEventMediaFiles,
  GetHostRecievedFiles,
  GetGuestSentFiles,
  GetAsoebiItems,
  DeleteAsoebi,
};
