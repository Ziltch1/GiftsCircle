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

const GetGuestSentFilesApi = (eventId, userId) => {
  return api.get(`/media/Get/GuestSentMedia/${eventId}/${userId}`);
};

const UploadEventMessageApi = (data) => {
  return api.post('/media/UploadMessage', data)
}

const DeleteMediaApi = (id) => {
  return api.delete(`/media/${id}`)
}

const MediaVisibilityApi = (id, data) => {
  return api.put(`/media/UpdateVisibility/${id}`, data)
}

const GetEventMessagesApi = (id) => {
  return api.get(`/media/Get/ComplimentaryMessages/${id}`)
}

export { UploadVideoApi, GetEventMediaFilesApi, GetHostRecievedFilesApi, GetGuestSentFilesApi, UploadEventMessageApi, DeleteMediaApi, MediaVisibilityApi };
