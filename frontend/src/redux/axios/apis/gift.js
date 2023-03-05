import api from '../axios';

const GetGiftItemsApi = () => {
  return api.get('/giftItem/Get/All');
};

const CreateManyGiftsApi = data => {
  return api.post('/gift/createMany', data);
};

const DeleteEventGiftApi = id => {
  return api.delete(`/gift/${id}`);
};

export {
  GetGiftItemsApi,
  CreateManyGiftsApi,
  DeleteEventGiftApi,
};
