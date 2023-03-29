import api from '../axios';

const CreateUserApi = data => {
  return api.post('/register', data);
};

const GetUserApi = id => {
  return api.get(`/user/${id}`);
};

export { CreateUserApi, GetUserApi };
