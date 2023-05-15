import { useEffect, useState } from 'react';
import { UploadVideoApi } from '../../../../redux/axios/apis/media';
import { dispatch } from '../../../../redux/store';
import { GetEventMediaFiles } from '../../../../redux/features/events/service';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../../redux/axios/axios';
import { createResponse } from '../../../../redux/utils/UtilSlice';
import ErrorHandler from '../../../../redux/axios/Utils/ErrorHandler';

const useUpload = (data, setShowModal, setImage) => {
  const { newEvent, eventMediaFiles } = useSelector(state => state.event);
  const { user } = useSelector(state => state.user);
  const [Data, setData] = useState([]);

  useEffect(() => {
    if (data) {
      setShowModal(true);
      if (
        data.length === 1 &&
        (data[0].type.includes('video') || data[0].type.includes('audio'))
      ) {
        UploadVideo(data, newEvent.id, user.id, setShowModal, setImage);
      } else {
        UploadImages(data, newEvent.id, user.id, setShowModal, setImage);
      }
    }
  }, [data]);

  useEffect(() => {
    if (eventMediaFiles) {
      if (eventMediaFiles.length > 0) {
        setData(eventMediaFiles);
      }
    }
  }, [eventMediaFiles]);

  return Data;
};
const UploadVideoReq = async (data, setShowModal) => {
  if (data.size > 10000000) {
    setShowModal(false);
    dispatch(
      createResponse({
        type: 'Error',
        message: 'File should be less than 100MB',
        title: 'Error',
      })
    );
  } else {
    const formData = new FormData();
    formData.append('image', data);
    try {
      const result = await axiosInstance.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return result.data;
    } catch (error) {
      setShowModal(false);
      dispatch(createResponse(ErrorHandler(error)));
    }
  }
};

const UploadVideo = async (data, eventId, userId, setShowModal, setImage) => {
  try {
    let res = await UploadVideoReq(data[0], setShowModal);
    if (res) {
      setShowModal(false);
      setImage(null);
      const formBody = {
        userId,
        eventId,
        uploadedBy: 'HOST',
        files: res,
      };

      const response = await UploadVideoApi(formBody);
      if (response) {
        setTimeout(() => {
          dispatch(GetEventMediaFiles(eventId));
        }, 1000);
      }
    }
  } catch (err) {
    console.log(err);
  }
};

const UploadImagesReq = async (data, eventId, userId) => {
  const formData = new FormData();
  [...data].forEach(image => {
    formData.append('images', image);
  });
  formData.append('userId', userId);
  formData.append('eventId', eventId);
  formData.append('uploadedBy', 'HOST');

  const result = await axiosInstance.post('/media/UploadImages', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result.data;
};

const UploadImages = async (data, eventId, userId, setShowModal, setImage) => {
  try {
    const response = await UploadImagesReq(data, eventId, userId);
    if (response) {
      setTimeout(() => {
        dispatch(GetEventMediaFiles(eventId));
      }, 1000);
      setShowModal(false);
      setImage(null);
    }
  } catch (err) {
    console.log(err);
  }
};

export { useUpload };
