import React, { useEffect, useState } from 'react';
import {
  Box,
  Flex,
  Text,
  Button,
  PinInput,
  PinInputField,
} from '@chakra-ui/react';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/event-circle.svg';
import Warning from '../assets/warning.svg';
import { SendOtpLink, VerifyEmailApi } from '../../../redux/axios/apis/auth';
import { dispatch } from '../../../redux/store';
import { createResponse } from '../../../redux/utils/UtilSlice';
import ErrorHandler from '../../../redux/axios/Utils/ErrorHandler';

const VerifyOtp = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem('newUser');
  const [otp, setOtp] = useState('');
  const [counter, setCounter] = useState(10);
  const [mins, setMins] = useState(1);
  const [btnDisabled, setBtnDisabled] = useState(true);

  useEffect(() => {
    if (mins >= 0) {
      setTimeout(() => {
        if (counter === 0) {
          if (mins !== 0) {
            setMins(prev => (prev -= 1));
            setCounter(60);
          }
        } else {
          setCounter(prev => (prev -= 1));
        }
      }, 1000);
    }
  }, [counter, mins]);

  useEffect(() => {
    if (otp.length !== 5) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [otp]);

  const HandleSubmit = async () => {
    if (!btnDisabled) {
      const formBody = {
        code: otp,
        user: user,
      };
      const res = await VerifyEmailApi(formBody);
      if (res.status) {
        navigate('/signup_set_password');
      }
    }
  };

  console.log(mins, counter);

  const ResendOtp = async () => {
    const formBody = {
      email: user,
    };
    try {
      const res = await SendOtpLink(formBody);
      if (res.status) {
        setCounter(60);
        setOtp('');
      }
    } catch (error) {
      dispatch(createResponse(ErrorHandler(error)));
    }
  };

  return (
    <Flex
      bgColor="#fff"
      color="#000000"
      h="620px"
      w="559px"
      direction="column"
      zIndex="99"
    >
      <Box bgColor="#0F172A" h="104.25px" p="30px 40px">
        <Flex justifyContent="center">
          <Box>
            <img src={Logo} alt="logo" />
          </Box>
        </Flex>
      </Box>

      <Box p="40px" borderRadius="0px 0px 10px 10px">
        <Flex direction="column" gap="20px">
          <Flex direction="column" gap="10px" width="373px">
            <Text
              fontSize="30px"
              color="#000000"
              letterSpacing="-0.02em"
              lineHeight="40px"
              fontWeight="500"
            >
              Confirm your email
            </Text>

            <Text
              fontSize="14px"
              color="#383838"
              lineHeight="22px"
              fontWeight="500"
            >
              To complete your registration, please enter the code <br /> that
              we sent to <Link style={{ color: '#0C4C84' }}>{user}</Link>
            </Text>
          </Flex>
          <Flex direction="column" gap="20px">
            <Flex gap="40px" p="10px" justifyContent="center">
              <PinInput defaultValue={otp} onChange={value => setOtp(value)}>
                <PinInputField
                  bgColor="#EFEFEF"
                  borderRadius="12px"
                  width="56px"
                  h="72px"
                  p="12px"
                  gap="10px"
                  fontSize="48px"
                  color="#1A1D1F"
                  lineHeight="48px"
                  fontWeight="600"
                  letterSpacing="-0.03em"
                />
                <PinInputField
                  bgColor="#EFEFEF"
                  borderRadius="12px"
                  width="56px"
                  h="72px"
                  p="12px"
                  gap="10px"
                  fontSize="48px"
                  color="#1A1D1F"
                  lineHeight="48px"
                  fontWeight="600"
                  letterSpacing="-0.03em"
                />
                <PinInputField
                  bgColor="#EFEFEF"
                  borderRadius="12px"
                  width="56px"
                  h="72px"
                  p="12px"
                  gap="10px"
                  fontSize="48px"
                  color="#1A1D1F"
                  lineHeight="48px"
                  fontWeight="600"
                  letterSpacing="-0.03em"
                />
                <PinInputField
                  bgColor="#EFEFEF"
                  borderRadius="12px"
                  width="56px"
                  h="72px"
                  p="12px"
                  gap="10px"
                  fontSize="48px"
                  color="#1A1D1F"
                  lineHeight="48px"
                  fontWeight="600"
                  letterSpacing="-0.03em"
                />
                <PinInputField
                  bgColor="#EFEFEF"
                  borderRadius="12px"
                  width="56px"
                  h="72px"
                  p="12px"
                  gap="10px"
                  fontSize="48px"
                  color="#1A1D1F"
                  lineHeight="48px"
                  fontWeight="600"
                  letterSpacing="-0.03em"
                />
              </PinInput>
            </Flex>

            <Flex justifyContent="center">
              <Text
                fontSize="15px"
                color="#6F767E"
                lineHeight="24px"
                fontWeight="500"
                letterSpacing="-0.015em"
              >
                0{mins}:{counter}
              </Text>
            </Flex>

            <Flex
              p="10px"
              gap="10px"
              bg="#EEEEEE"
              alignItems="flex-start"
              borderRadius="5px"
            >
              <img src={Warning} alt="warning" />
              <Text
                fontSize="14px"
                color="#000000"
                lineHeight="22px"
                fontWeight="500"
              >
                If you don’t see our email in your inbox, please check your{' '}
                <br /> spam folder
              </Text>
            </Flex>

            <Button
              bgColor={btnDisabled ? '#55D4CC' : '#00BFB2'}
              boxShadow={
                btnDisabled ? '' : '0px 8px 30px rgba(0, 191, 178, 0.1)'
              }
              opacity={!btnDisabled ? '1.0' : '0.5'}
              borderRadius="5px"
              gap="10px"
              h="50px"
              p="14px 28px"
              fontSize="14px"
              color="#FFFFFF"
              lineHeight="22px"
              fontWeight="500"
              _hover={{ bgColor: '55D4CC' }}
              disabled={btnDisabled}
              onClick={() => HandleSubmit()}
            >
              Proceed <HiOutlineArrowNarrowRight />
            </Button>

            <Flex justifyContent="right">
              <Text
                fontSize="14px"
                color="#0C4C84"
                lineHeight="22px"
                fontWeight="600"
                onClick={() => ResendOtp()}
              >
                <Link>Resend Otp?</Link>
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default VerifyOtp;
