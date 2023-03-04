import api from '../axios';

const GetGiftItemsApi = () => {
  return api.get('/giftItem/Get/All');
};

const CreateManyGiftsApi = data => {
  return api.post('/gift/createMany', data);
};

const GetEventGiftsApi = id => {
  return api.get(`/gift/Get/EventGifts/${id}`);
};

export { GetGiftItemsApi, CreateManyGiftsApi, GetEventGiftsApi };
