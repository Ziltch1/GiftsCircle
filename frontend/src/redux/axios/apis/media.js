import api from '../axios';

const UploadVideoApi = data => {
  return api.post('/media/uploadVideo', data);
};

const GetEventMediaFilesApi = id => {
  return api.get(`/media/Get/EventMediaFiles/${id}`);
};

const GetHostRecievedFilesApi = id => {
  return api.get(`/media/Get/GuestSentFiles/${id}`);
};

export { UploadVideoApi, GetEventMediaFilesApi, GetHostRecievedFilesApi };
