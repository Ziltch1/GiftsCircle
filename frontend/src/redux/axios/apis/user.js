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

const UpdateUserNotificationApi = (id, data) => {
  return api.put(`/user/notifications/${id}`, data);
};

export { CreateUserApi, GetUserApi, GetUserNotificationApi, UpdateUserApi, UpdateUserNotificationApi };
