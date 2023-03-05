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

const DeliveryDetailsApi = data => {
  return api.post(`/delivery/create`, data)
}

export {
  GetUserEventsApi,
  GetEventGiftsApi,
  CreateEventApi1,
  UpdateEventApi1,
  CreateEventApi2,
  DeleteEventApi,
  AddGiftApi,
  DeliveryDetailsApi,
};
