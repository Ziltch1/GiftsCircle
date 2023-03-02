import api from '../axios';

const GetUserEventsApi = id => {
  return api.get(`/event/UserEvents/${id}`);
};

const GetEventGiftsApi = eventId => {
  return api.get(`gift/Get/EventGifts/${eventId}`);
};

const CreateEventApi1 = data => {
  return api.post(`/event/create`, data);
};

export { GetUserEventsApi, GetEventGiftsApi, CreateEventApi1 };
