import React, {useState, useEffect} from 'react';
import { Flex, Text } from '@chakra-ui/react';
import LoadingImg from '../assets/Loader.svg';
import '../index.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'

const Loading = () => {

  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  if(user){
    // useEffect(() => {
      // setTimeout(() => {
        navigate('/dashboard')
      // }, 3000);
    // }, []);
  }


  return (
    <Flex
      bgColor="#fff"
      color="#000000"
      h="600px"
      w="600px"
      direction="column"
      justifyContent="center"
      alignItems="center"
    >
      <Flex
        h="201px"
        w="404px"
        direction="column"
        justifyContent="center"
        alignItems="center"
        gap="20px"
      >
        <img src={LoadingImg} alt="" className="spinner" />

        <Text
          fontSize="24px"
          color="#000000"
          lineHeight="32px"
          fontWeight="500"
          textAlign="center"
        >
          Hold on a minute, we are creating <br /> your account
        </Text>
      </Flex>
    </Flex>
  );
};

export default Loading;
