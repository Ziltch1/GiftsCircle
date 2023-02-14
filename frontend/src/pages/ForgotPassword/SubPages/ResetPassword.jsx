import {
  Box,
  Flex,
  Text,
  FormControl,
  Input,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import Logo from '../../../assets/Logo.png';
import checkbox from '../assets/checkbox.svg';
import checkedbox from '../assets/checkedbox.svg';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ErrorHandler from '../../../redux/axios/Utils/ErrorHandler';
import { createResponse } from '../../../redux/utils/UtilSlice';
import { dispatch } from '../../../redux/store';
import { ResetPasswordApi } from '../../../redux/axios/apis/auth';

const ResetPassword = () => {
  const [tokenParams] = useSearchParams();
  const token = tokenParams.get('token');
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordCount, setPasswordCount] = useState(false);
  const [passwordUpper, setPasswordUpper] = useState(false);
  const [passwordSpecial, setPasswordSpecial] = useState(false);
  const [btnDisabled, setButtonDisabled] = useState(true);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (password.length < 8) {
      setPasswordCount(false);
    } else {
      setPasswordCount(true);
    }
    let UpperCaseRegex = /^(.*[A-Z].*)$/gm;
    if (UpperCaseRegex.test(password)) {
      setPasswordUpper(true);
    } else {
      setPasswordUpper(false);
    }

    let SpecialCaseRegex = /^(.*\W.*)$/;
    if (SpecialCaseRegex.test(password)) {
      setPasswordSpecial(true);
    } else {
      setPasswordSpecial(false);
    }
  }, [password]);

  useEffect(() => {
    if (passwordCount && passwordSpecial && passwordUpper) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [passwordCount, passwordSpecial, passwordUpper]);

  const handleSubmit = async () => {
    const formBody = { auth: token, password: password };
    try {
      await ResetPasswordApi(formBody);
    } catch (e) {
      console.log(e);
      dispatch(createResponse(ErrorHandler(e)));
    }
    navigate('/signin');
  };

  return (
    <Flex
      bgColor="#fff"
      color="#000000"
      h="525px"
      w="599px"
      direction="column"
      gap="30px"
      zIndex="99"
    >
      <Box bgColor="#0F172A" h="104.25px" p="30px 60px">
        <Flex justifyContent="center">
          <Box>
            <img src={Logo} alt="logo" />
          </Box>
        </Flex>
      </Box>

      <Box m="0px 60px">
        <Flex direction="column" gap="20px">
          <Flex direction="column" gap="10px" width="373px">
            <Text
              fontSize="30px"
              color="#000000"
              letterSpacing="-0.02em"
              lineHeight="40px"
              fontWeight="500"
            >
              Reset password
            </Text>

            <Text
              fontSize="14px"
              color="#383838"
              lineHeight="22px"
              fontWeight="500"
            >
              Start adding gifts to your events and let people <br /> purchase
              it for you
            </Text>
          </Flex>
          <Flex direction="column" gap="20px">
            <Flex direction="column" gap="10px">
              <FormControl display="flex" flexDirection="column" gap="6px">
                <FormLabel
                  fontSize="14px"
                  color="#12141D"
                  lineHeight="22px"
                  fontWeight="500"
                >
                  Enter your password
                </FormLabel>
                <InputGroup h="46px" bgColor="#F4F4F4" borderRadius="10px">
                  <Input
                    borderRadius="10px"
                    h="46px"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    fontSize="14px"
                    p="12px"
                    lineHeight="22px"
                    fontWeight="400"
                    placeholder="****************"
                    _placeholder={{
                      color: '#A8A8A8',
                      opacity: 0.4,
                      fontSize: '14px',
                    }}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                  />
                  <InputRightElement
                    cursor="pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {!showPassword ? <FiEyeOff /> : <FiEye />}
                  </InputRightElement>
                </InputGroup>
              </FormControl>

              <Flex gap="5px">
                <Flex gap="10px">
                  {passwordCount ? (
                    <img src={checkedbox} alt="" />
                  ) : (
                    <img src={checkbox} alt="" />
                  )}
                  <Text
                    fontSize="14px"
                    color="#717171"
                    lineHeight="22px"
                    fontWeight="500"
                  >
                    minimum of 8 characters
                  </Text>
                </Flex>

                <Flex gap="10px" alignItems="center">
                  {passwordUpper ? (
                    <img src={checkedbox} alt="" />
                  ) : (
                    <img src={checkbox} alt="" />
                  )}
                  <Text
                    fontSize="14px"
                    color="#717171"
                    lineHeight="22px"
                    fontWeight="500"
                  >
                    One UPPERCASE character
                  </Text>
                </Flex>
              </Flex>

              <Flex gap="10px" alignItems="center">
                {passwordSpecial ? (
                  <img src={checkedbox} alt="" />
                ) : (
                  <img src={checkbox} alt="" />
                )}
                <Text
                  fontSize="14px"
                  color="#717171"
                  lineHeight="22px"
                  fontWeight="500"
                >
                  One unique character (e.g: !@#$%^&*?)
                </Text>
              </Flex>
            </Flex>
          </Flex>

          <Button
            bgColor={btnDisabled ? '#55D4CC' : '#00BFB2'}
            boxShadow={btnDisabled ? '' : '0px 8px 30px rgba(0, 191, 178, 0.1)'}
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
            onClick={handleSubmit}
          >
            Change password <HiOutlineArrowNarrowRight />
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ResetPassword;
