import { Button, Box } from '@chakra-ui/react';
import React, { useRef, useState, useEffect } from 'react';
import { FaStop, FaPause, FaTrash } from 'react-icons/fa';
import { BiPlay, BiSend } from 'react-icons/bi';
import { BsCameraVideoFill } from 'react-icons/bs';

const VideoRecorder = ({ setData }) => {
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const [recording, setRecording] = useState(false);
  const [videoBlob, setVideoBlob] = useState(null);
  const [paused, setPaused] = useState(false);
  const [playingVideo, setPlayingVideo] = useState(false);

  const blobToFile = (blob, fileName, fileType) => {
    // Create a new File object from the Blob
    const file = new File([blob], fileName, { type: fileType });
    return file;
  };

  const SendVideo = async () => {
    try {
      if (videoBlob) {
        const convertedFile = blobToFile(videoBlob, 'video.mp4', 'video/mp4');
        setData(convertedFile);
      }
      setVideoBlob(null);
    } catch (error) {
      console.log(error);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      mediaRecorderRef.current = new MediaRecorder(stream);

      const chunks = [];
      mediaRecorderRef.current.ondataavailable = event => {
        chunks.push(event.data);
      };

      mediaRecorderRef.current.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/mp4' });
        setVideoBlob(blob);
        chunks.length = 0;
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorderRef.current.start();
      setRecording(true);
      streamRef.current = stream;
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const togglePauseResume = () => {
    if (mediaRecorderRef.current) {
      if (mediaRecorderRef.current.state === 'recording') {
        mediaRecorderRef.current.pause();
        setPaused(true);
      } else if (mediaRecorderRef.current.state === 'paused') {
        mediaRecorderRef.current.resume();
        setPaused(false);
      }
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      setPaused(false);
    }
  };

  const clearRecording = () => {
    setVideoBlob(null);
  };

  const handleVideoPlay = () => {
    setPlayingVideo(true);
  };

  const handleVideoEnded = () => {
    setPlayingVideo(false);
  };

  return (
    <div>
      {videoBlob ? (
        <VideoPlayer
          videoBlob={videoBlob}
          onPlay={handleVideoPlay}
          onEnded={handleVideoEnded}
        />
      ) : (
        <WebcamView />
      )}
      <Box mt="3">
        {!playingVideo && !recording && (
          <Button
            onClick={startRecording}
            fontWeight="medium"
            fontSize={14}
            color="white"
            bg="#00BFB2"
            borderRadius="50%"
            w="40px"
            h="40px"
            p="0"
            mx="2"
          >
            <BsCameraVideoFill />
          </Button>
        )}
        {recording && (
          <Button
            onClick={togglePauseResume}
            fontWeight="medium"
            fontSize={14}
            color="white"
            bg="#00BFB2"
            borderRadius="50%"
            w="40px"
            h="40px"
            p="0"
            mx="2"
          >
            {paused ? <BiPlay /> : <FaPause />}
          </Button>
        )}
        {recording && (
          <Button
            onClick={stopRecording}
            fontWeight="medium"
            fontSize={14}
            color="white"
            bg="#00BFB2"
            borderRadius="50%"
            w="40px"
            h="40px"
            p="0"
            mx="2"
          >
            <FaStop />
          </Button>
        )}
        {videoBlob && !playingVideo && (
          <>
            <Button
              onClick={clearRecording}
              fontWeight="medium"
              fontSize={15}
              color="white"
              bg="#00BFB2"
              p="0"
              mx="2"
              borderRadius="50%"
              w="40px"
              h="40px"
            >
              <FaTrash />
            </Button>
            <Button
              onClick={SendVideo}
              fontWeight="medium"
              fontSize={15}
              color="white"
              bg="#00BFB2"
              p="0"
              mx="2"
              borderRadius="50%"
              w="40px"
              h="40px"
            >
              <BiSend />
            </Button>
          </>
        )}
      </Box>
    </div>
  );
};

export default VideoRecorder;

const WebcamView = () => {
  const videoRef = useRef(null);

  useEffect(() => {
    let stream;
    const enableWebcam = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });
        videoRef.current.srcObject = stream;
      } catch (error) {
        console.error('Error accessing media devices:', error);
      }
    };

    enableWebcam();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  return <video ref={videoRef} autoPlay playsInline muted />;
};

const VideoPlayer = ({ videoBlob }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    videoRef.current.src = URL.createObjectURL(videoBlob);
  }, [videoBlob]);

  return <video ref={videoRef} controls autoPlay />;
};
