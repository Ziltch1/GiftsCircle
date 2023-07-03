import { Button, Box, Text, Stack } from '@chakra-ui/react';
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
  const [timer, setTimer] = useState(0);
  const [startTime, setStartTime] = useState(null);

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

  useEffect(() => {
    let intervalId = null;

    if (recording) {
      intervalId = setInterval(() => {
        setTimer((prevTimer) => prevTimer + 1);
      }, 1000);
    } else {
      setTimer(0);
    }

    return () => {
      clearInterval(intervalId);
    };
  }, [recording]);

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
      <>
      <Box my='4'>
          {recording && <Text>Recording: {timer} seconds</Text>}
      </Box>
      <Box mt="3" display='flex' alignItems='center' gap={5} justifyContent='center'>
        {!playingVideo && !recording && (
          <Stack direction='column'>
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
          <Text textAlign='center' color='black'>Start</Text>
          </Stack>
        )}
        {recording && (
          <Stack direction='row'>
            <Box>
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
                mb='1.5'
              >
                {paused ? <BiPlay /> : <FaPause />}
              </Button>
              <Text>Pause/Resume</Text>
            </Box>
          
            <Box>
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
                mb='1.5'
              >
                <FaStop />
              </Button>
              <Text>Stop</Text>
            </Box>
          </Stack>
        )}
        {videoBlob && !playingVideo && (
          <Stack direction='row' spacing={5}>
            <Box>
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
              <Text>Delete</Text>
            </Box>

            <Box>
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
              <Text>Send</Text>
            </Box>
          </Stack>
        )}
      </Box>
      </>
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
