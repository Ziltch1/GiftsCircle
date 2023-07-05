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

const GetUserNotificationApi = id => {
  return api.get(`/user/notifications/${id}`);
};

export { CreateUserApi, GetUserApi, GetUserNotificationApi, UpdateUserApi };
