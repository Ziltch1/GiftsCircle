import { GetUserEventsApi } from '../../axios/apis/events';
import { dispatch } from '../../store';
import { createResponse } from '../../utils/UtilSlice';
import { setEventGifts, setEvents, setLoading } from './eventSlice';
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
    const res = await GetEventGifts(id);

    dispatch(setEventGifts(res.data));
  } catch (error) {
    console.log(ErrorHandler(error));
    dispatch(createResponse(ErrorHandler(error)));
  }
};

export { GetUserEvents, GetEventGifts };
