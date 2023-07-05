import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../../../../redux/axios/axios';
import { dispatch } from '../../../../../redux/store';
import { createResponse } from '../../../../../redux/utils/UtilSlice';
import ErrorHandler from '../../../../../redux/axios/Utils/ErrorHandler';
import { UploadVideoApi } from '../../../../../redux/axios/apis/media';
import { GetUserUploadedFiles } from '../../../../../redux/features/events/service';

const useUpload = (data, setShowModal, setImage, recorded = false) => {
  const { newEvent, userUploadedFiles } = useSelector(state => state.event);
  const { user } = useSelector(state => state.user);
  const [Data, setData] = useState([]);

  useEffect(() => {
    if (data) {
      setShowModal(true);
      if (recorded) {
        UploadVideo(
          data,
          newEvent.id,
          user.id,
          setShowModal,
          setImage,
          recorded
        );
      } else {
        if (
          data.length === 1 &&
          (data[0].type.includes('video') || data[0].type.includes('audio'))
        ) {
          UploadVideo(
            data,
            newEvent.id,
            user.id,
            setShowModal,
            setImage,
            recorded
          );
        } else {
          UploadImages(data, newEvent.id, user.id, setShowModal, setImage);
        }
      }
    }
  }, [data]);

  useEffect(() => {
    if (userUploadedFiles) {
      if (userUploadedFiles.length > 0) {
        setData(userUploadedFiles);
      }
    }
  }, [userUploadedFiles]);

  return Data;
};

const UploadVideoReq = async (data, setShowModal, setImage) => {
  if (data.size > 104857600) {
    setShowModal(false);
    dispatch(
      createResponse({
        type: 'Error',
        message: 'File should be less than 100MB',
        title: 'Error',
      })
    );
    setImage(null);
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
      setImage(null);
      dispatch(createResponse(ErrorHandler(error)));
    }
  }
};

export const UploadVideo = async (
  data,
  eventId,
  userId,
  setShowModal,
  setImage,
  recorded
) => {
  try {
    let res = recorded
      ? await UploadVideoReq(data, setShowModal, setImage)
      : await UploadVideoReq(data[0], setShowModal, setImage);
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
        setImage(null);
        setTimeout(() => {
          dispatch(GetUserUploadedFiles(eventId, userId));
        }, 1000);
      }
    }
  } catch (err) {
    setImage(null);
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
  formData.append('uploadedBy', 'GUEST');

  const result = await axiosInstance.post('/media/UploadImages', formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  return result.data;
};

const UploadImages = async (data, eventId, userId, setShowModal, setImage) => {
  try {
    const response = await UploadImagesReq(data, eventId, userId);
    if (response) {
      setImage(null);
      setShowModal(false);
      setTimeout(() => {
        dispatch(GetUserUploadedFiles(eventId, userId));
      }, 1000);
    }
  } catch (err) {
    setImage(null);
    console.log(err);
  }
};

export { useUpload };
