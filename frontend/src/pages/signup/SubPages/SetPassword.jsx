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
  Checkbox,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { FiEye, FiEyeOff } from 'react-icons/fi';
import { HiOutlineArrowNarrowRight } from 'react-icons/hi';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../../assets/Logo.png';
import { SetPasswordApi } from '../../../redux/axios/apis/auth';
import ErrorHandler from '../../../redux/axios/Utils/ErrorHandler';
import { dispatch } from '../../../redux/store';
import { createResponse } from '../../../redux/utils/UtilSlice';
import checkbox from '../assets/checkbox.svg';
import checkedbox from '../assets/checkedbox.svg';

const SetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [passwordCount, setPasswordCount] = useState(false);
  const [passwordUpper, setPasswordUpper] = useState(false);
  const [passwordSpecial, setPasswordSpecial] = useState(false);
  const [btnDisabled, setButtonDisabled] = useState(true);
  const [agree, setAgree] = useState(false);
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
    if (passwordCount && passwordSpecial && passwordUpper && agree) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [passwordCount, passwordSpecial, passwordUpper, agree]);

  const HandleSubmit = async () => {
    if (!btnDisabled) {
      const formBody = {
        auth: localStorage.getItem('newUser'),
        password,
      };
      try {
        const res = await SetPasswordApi(formBody);
        if (res.status) {
          navigate('/signup_loading');
          localStorage.removeItem('newUser');
        }
      } catch (error) {
        dispatch(createResponse(ErrorHandler(error)))
      }
    }
  };

  return (
    <Flex
      bgColor="#fff"
      color="#000000"
      h="599px"
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
              Choose your password
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
              <Flex gap="10px" alignItems="center">
                <Checkbox
                  border="rgba(0, 0, 81, 0.3)"
                  onChange={e => setAgree(e.target.checked)}
                ></Checkbox>
                <Text
                  fontSize="14px"
                  color="#000000"
                  lineHeight="22px"
                  fontWeight="400"
                >
                  I agree to Gift circle’s Terms and Privacy Policy.
                </Text>
              </Flex>

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
          <Flex justifyContent="right"></Flex>

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
            onClick={() => HandleSubmit()}
          >
            Proceed <HiOutlineArrowNarrowRight />
          </Button>

          <Flex justifyContent="center">
            <Flex justifyContent="center" alignItems="center" gap="10px">
              <Text
                color="#383838"
                fontSize="14px"
                lineHeight="22px"
                fontWeight="500"
              >
                Don’t have an account?{' '}
                <Link to="/signin" style={{ color: '#0C4C84' }}>
                  Login here
                </Link>
              </Text>
              <HiOutlineArrowNarrowRight />
            </Flex>
          </Flex>
        </Flex>
      </Box>
    </Flex>
  );
};

export default SetPassword;
