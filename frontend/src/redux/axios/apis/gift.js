import api from '../axios';

const GetGiftItemsApi = () => {
  return api.get('/giftItem/Get/All');
};

export { GetGiftItemsApi };
