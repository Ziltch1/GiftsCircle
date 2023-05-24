import api from '../axios';

const GetMarkeplaceTransApi = () => {
  return api.get('/marketPlace/Get/All/');
};

const BuyItemsApi = data => {
  return api.post(`/marketPlace/create`, data);
};

export { GetMarkeplaceTransApi, BuyItemsApi };
