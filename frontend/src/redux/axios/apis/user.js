import api from '../axios';

const CreateUserApi = data => {
  return api.post('/register', data);
};

const UpdateUserApi = (data, id) => {
  return api.put(`/user/${id}`, data);
};

const GetUserApi = id => {
  return api.get(`/user/${id}`);
};

const DeliveryDetailsApi = data => {
  return api.post(`/delivery/create`, data);
};

const GetDeliveryDetailsApi = id => {
  return api.get(`/delivery/${id}`);
};

const UpdateDeliveryDetailsApi = (data, id) => {
  return api.put(`/delivery/${id}`, data);
};

export {
  CreateUserApi,
  GetUserApi,
  UpdateUserApi,
  DeliveryDetailsApi,
  GetDeliveryDetailsApi,
  UpdateDeliveryDetailsApi,
};
