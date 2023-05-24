import api from '../axios';

const GetMarkeplaceTransApi = id => {
  return api.get(`/marketPlace/Get/All/${id}`);
};

const BuyItemsApi = data => {
  return api.post(`/marketPlace/create`, data);
};

export { GetMarkeplaceTransApi, BuyItemsApi };
