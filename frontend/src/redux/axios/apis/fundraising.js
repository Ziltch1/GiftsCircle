import api from '../axios';

const CreateFundraisingApi = data => {
  return api.post(`/fundRaising/create`, data);
};

const DonateFundraisingApi = data => {
  return api.post(`/fundRaising/Donate`, data);
};

const GetFundraisingApi = id => {
  return api.get(`/fundRaising/${id}`);
};

const GetFundraisingDonorsApi = id => {
  return api.get(`/fundRaising/GetFundDonors/${id}`);
};

const UpdateFundraisingStatusApi = data => {
  return api.put(`/fundRaising/UpdateStatus`, data);
};

export {
  CreateFundraisingApi,
  DonateFundraisingApi,
  GetFundraisingApi,
  UpdateFundraisingStatusApi,
  GetFundraisingDonorsApi,
};
