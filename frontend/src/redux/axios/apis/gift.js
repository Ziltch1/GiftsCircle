import api from '../axios';

const GetGiftItemsApi = () => {
  return api.get('/giftItem/Get/All');
};

const GetComplimentaryGiftItemsApi = () => {
  return api.get('/complimentaryGift/Get/All');
};

const GetUserPurchasedGiftsApi = id => {
  return api.get(`/gift/Get/PurchasedBy/${id}`);
};

const CreateManyGiftsApi = data => {
  return api.post('/gift/createMany', data);
};

const BuyGiftsApi = data => {
  return api.post('/gift/Buy', data);
};

const BuyComplimentaryGiftsApi = data => {
  return api.post('/complimentaryGift/Buy', data);
};

const DeleteEventGiftApi = id => {
  return api.delete(`/gift/${id}`);
};

const AddGiftApi = data => {
  return api.post('/gift/BuyMarketGift', data);
};

const GetUserGiftApi = id => {
  return api.get(`/gift/Get/MarketUserGifts/${id}`);
};

const GetEventGiftsApi = eventId => {
  return api.get(`gift/Get/EventGifts/${eventId}`);
};

const GetUserEventGiftsApi = (id, userId) => {
  return api.get(`/gift/Get/EventGifts/${id}/${userId}`);
};

const GetEventGiftsTransApi = id => {
  return api.get(`/gift/Get/EventGiftsTrans/${id}`);
};

const GetUserEventGiftsTransApi = (id, userId) => {
  return api.get(`/gift/Get/UserEventGiftsTrans/${id}/${userId}`);
};

const GetCoHostAddedGiftsApi = (eventId, userId) => {
  return api.get(`/gift/Get/EventGifts/${eventId}/${userId}`);
};

export {
  GetGiftItemsApi,
  GetComplimentaryGiftItemsApi,
  GetEventGiftsApi,
  GetUserEventGiftsApi,
  GetEventGiftsTransApi,
  GetUserEventGiftsTransApi,
  CreateManyGiftsApi,
  BuyGiftsApi,
  BuyComplimentaryGiftsApi,
  DeleteEventGiftApi,
  GetUserPurchasedGiftsApi,
  AddGiftApi,
  GetUserGiftApi,
  GetCoHostAddedGiftsApi,
};
