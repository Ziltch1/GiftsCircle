import { GetUserEventsApi } from '../../axios/apis/events';
import { dispatch } from '../../store';
import { createResponse } from '../../utils/UtilSlice';
import { setEventGifts, setEvents } from './userSlice';
import ErrorHandler from '../../axios/Utils/ErrorHandler';

const GetUserEvents = id => async () => {
  try {
    const res = await GetUserEventsApi(id);

    dispatch(setEvents(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    dispatch(createResponse(ErrorHandler(error)));
  }
};

const GetEventGifts = id => async () => {
  try {
    const res = await GetEventGifts(id);

    dispatch(setEventGifts(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export { GetUserEvents, GetEventGifts };
