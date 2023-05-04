import api from '../axios';

const AddEventAsoebiApi = data => {
  return api.post('/asoebi/create', data);
};

const AddManyEventAsoebiApi = data => {
  return api.post('/asoebi/createMany', data);
};

const GetAsoebiItemsApi = () => {
  return api.get('/asoebiItem/Get/All');
};

const GetAddedAsoebiItemsApi = id => {
  return api.get(`/asoebi/Get/EventAsoebi/${id}`);
};

export {
  GetAsoebiItemsApi,
  AddEventAsoebiApi,
  GetAddedAsoebiItemsApi,
  AddManyEventAsoebiApi,
};
