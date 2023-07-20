import api from '../axios';

const GetUserEventsApi = id => {
  return api.get(`/event/UserEvents/${id}`);
};

const GetEventApi = id => {
  return api.get(`/event/${id}`);
};

const GetEventGiftsApi = eventId => {
  return api.get(`gift/Get/EventGifts/${eventId}`);
};

const GetEventGuestsApi = eventId => {
  return api.get(`/event/${eventId}/guests`);
};

const CreateEventApi1 = data => {
  return api.post(`/event/`, data);
};

const UpdateEventApi1 = data => {
  return api.put(`/event/create`, data);
};

const CreateEventApi2 = data => {
  return api.post(`/event/create2`, data);
};

const DeleteEventApi = id => {
  return api.delete(`/event/${id}`);
};

const AddGiftApi = data => {
  return api.post(`/gift/create`, data);
};

const EventSummaryApi = data => {
  return api.post(`/event/create3`, data);
};

const JoinEventGuestApi = data => {
  return api.post(`/event/addGuest`, data);
};

const JoinEventCoHostApi = data => {
  return api.post(`/event/addCoHost`, data);
};

const GetEventCohostsApi = id => {
  return api.get(`/event/${id}/cohosts`);
};

export {
  GetUserEventsApi,
  GetEventGiftsApi,
  GetEventGuestsApi,
  CreateEventApi1,
  UpdateEventApi1,
  CreateEventApi2,
  DeleteEventApi,
  AddGiftApi,
  EventSummaryApi,
  GetEventApi,
  JoinEventGuestApi,
  GetEventCohostsApi,
  JoinEventCoHostApi,
};
