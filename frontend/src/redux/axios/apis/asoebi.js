import api from '../axios';

const AddEventAsoebiApi = data => {
  return api.post('/asoebi/create', data);
};

const AddManyEventAsoebiApi = data => {
  return api.post('/asoebi/createMany', data);
};

const BuyEventAsoebiApi = data => {
  return api.post('/asoebi/Buy', data);
};

const GetAsoebiItemsApi = () => {
  return api.get('/asoebiItem/Get/All');
};

const GetEventAsoebiApi = id => {
  return api.get(`/asoebi/Get/EventAsoebi/${id}`);
};

const GetEventAsoebiBuyersApi = id => {
  return api.get(`/asoebi/Get/AsoebiBuyers/${id}`);
};

const DeleteAsoebiApi = id => {
  return api.delete(`/asoebi/${id}`);
};


export {
  GetAsoebiItemsApi,
  AddEventAsoebiApi,
  BuyEventAsoebiApi,
  AddManyEventAsoebiApi,
  DeleteAsoebiApi,
  GetEventAsoebiApi,
  GetEventAsoebiBuyersApi,
};
