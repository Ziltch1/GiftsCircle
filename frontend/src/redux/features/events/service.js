import {
  DeleteEventApi,
  GetEventGiftsApi,
  GetUserEventsApi,
} from '../../axios/apis/events';
import { dispatch } from '../../store';
import { createResponse } from '../../utils/UtilSlice';
import {
  setEventGifts,
  setEvents,
  setLoading,
  setNewEvent,
} from './eventSlice';
import ErrorHandler from '../../axios/Utils/ErrorHandler';

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

const DeleteEvent = id => async () => {
  try {
    await DeleteEventApi(id);

    dispatch(setNewEvent(null));
  } catch (error) {
    console.log(ErrorHandler(error));
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export { GetUserEvents, GetEventGifts, DeleteEvent };
