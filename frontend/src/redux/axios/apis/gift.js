import api from '../axios';

const GetGiftItemsApi = () => {
  return api.get('/giftItem/Get/All');
};

const GetUserPurchasedGiftsApi = (id) => {
  return api.get(`/gift/Get/PurchasedBy/${id}`);
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
  GetUserPurchasedGiftsApi
};
