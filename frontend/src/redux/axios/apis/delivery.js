import api from '../axios';

const DeliveryDetailsApi = data => {
  return api.post(`/delivery/create`, data);
};

const GetDeliveryDetailsApi = id => {
  return api.get(`/delivery/${id}`);
};

const GetEventDeliveryDetailsApi = id => {
  return api.get(`/delivery/EventDetails/${id}`);
};

const UpdateDeliveryDetailsApi = (data, id) => {
  return api.put(`/delivery/${id}`, data);
};

const DeleteDeliveryDetailsApi = id => {
  return api.delete(`/delivery/${id}`);
};

export {
  DeliveryDetailsApi,
  GetDeliveryDetailsApi,
  UpdateDeliveryDetailsApi,
  DeleteDeliveryDetailsApi,
  GetEventDeliveryDetailsApi,
};
