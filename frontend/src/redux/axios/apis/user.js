import api from '../axios';

const CreateUserApi = data => {
  return api.post('/register', data);
};

export { CreateUserApi };
