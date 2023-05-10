import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../../../redux/axios/axios';
import { dispatch } from '../../../../../redux/store';
import { createResponse } from '../../../../../redux/utils/UtilSlice';
import ErrorHandler from '../../../../../redux/axios/Utils/ErrorHandler';
import { UploadVideoApi } from '../../../../../redux/axios/apis/media';
import {
  GetEventMediaFiles,
  GetGuestSentFiles,
} from '../../../../../redux/features/events/service';

const useUpload = (data, setShowModal, setImage) => {
  const { newEvent, guestSentFiles } = useSelector(state => state.event);
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
    if (guestSentFiles) {
      if (guestSentFiles.length > 0) {
        setData(guestSentFiles);
      }
    }
  }, [guestSentFiles]);

  return Data;
};
const UploadVideoReq = async (data, setShowModal) => {
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
        uploadedBy: 'GUEST',
        files: res,
      };

      const response = await UploadVideoApi(formBody);
      if (response) {
        setTimeout(() => {
          dispatch(GetGuestSentFiles(eventId, userId));
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
        dispatch(GetGuestSentFiles(eventId, userId));
      }, 1000);
      setShowModal(false);
      setImage(null);
    }
  } catch (err) {
    console.log(err);
  }
};

export { useUpload };
